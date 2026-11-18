import test from 'node:test';
import assert from 'node:assert/strict';
import { isReleasePullRequest, publishMergedReleases, releaseFromFiles } from './publish-release.mjs';

const repository = 'example/plugin';
const branch = 'main';
const sha = 'a'.repeat(40);
const version = '0.2.0';
const notes = '## [0.2.0](https://example.test/compare) (2026-11-18)\n\n### Features\n\n* accepted change';
const changelog = `# Changelog\n\n${notes}\n\n## [0.1.0](https://example.test/old) (2026-01-01)\n\n* old\n`;

function fixture({ merged = true, packageVersion = version, manifestVersion = version, fileNotes = changelog } = {}) {
  const pr = {
    number: 42,
    merged_at: merged ? '2026-11-18T00:00:00Z' : null,
    merge_commit_sha: sha,
    base: { ref: branch },
    head: { ref: 'release-please--branches--main', repo: { full_name: repository } },
    labels: [{ name: 'autorelease: pending' }],
    title: 'chore: release 9.9.9',
    body: 'outdated PR description',
  };
  const files = {
    'package.json': JSON.stringify({ version: packageVersion }),
    '.release-please-manifest.json': JSON.stringify({ '.': manifestVersion }),
    'CHANGELOG.md': fileNotes,
  };
  const state = { pr, files, tag: null, release: null, writes: [] };
  const api = async (method, path, data) => {
    if (method !== 'GET') state.writes.push({ method, path, data });
    if (method === 'GET' && path.startsWith('/pulls?')) return [pr];
    if (method === 'GET' && path.startsWith('/contents/')) {
      const [name, query] = path.slice('/contents/'.length).split('?');
      assert.equal(query, `ref=${sha}`);
      return { encoding: 'base64', content: Buffer.from(files[name]).toString('base64') };
    }
    if (method === 'GET' && path.startsWith('/git/ref/tags/')) return state.tag ? { object: { type: 'commit', sha: state.tag } } : null;
    if (method === 'GET' && path.startsWith('/releases/tags/')) return state.release;
    if (method === 'POST' && path === '/git/refs') { state.tag = data.sha; return {}; }
    if (method === 'POST' && path === '/releases') { state.release = data; return data; }
    if (method === 'POST' && path === '/issues/42/labels') return {};
    if (method === 'DELETE' && path.startsWith('/issues/42/labels/')) return null;
    throw new Error(`Unexpected request: ${method} ${path}`);
  };
  return { state, api };
}

test('uses the merge commit files rather than stale PR title and body', async () => {
  const { state, api } = fixture();
  await publishMergedReleases(api, repository, branch);
  assert.equal(state.tag, sha);
  assert.deepEqual(state.release, {
    tag_name: 'v0.2.0', target_commitish: sha, name: 'v0.2.0', body: notes, draft: false, prerelease: false,
  });
  assert.deepEqual(state.writes.map((item) => item.path), [
    '/git/refs', '/releases', '/issues/42/labels', '/issues/42/labels/autorelease%3A%20pending',
  ]);
});

test('unmerged and unrelated pull requests never publish', async () => {
  const { state, api } = fixture({ merged: false });
  await publishMergedReleases(api, repository, branch);
  assert.deepEqual(state.writes, []);
  state.pr.merged_at = '2026-11-18';
  state.pr.head.ref = 'feature';
  assert.equal(isReleasePullRequest(state.pr, repository, branch), false);
  state.pr.head.ref = 'release-please--branches--main';
  state.pr.head.repo.full_name = 'fork/plugin';
  assert.equal(isReleasePullRequest(state.pr, repository, branch), false);
});

test('version or changelog discrepancy fails before creating a tag or release', async () => {
  for (const input of [
    { packageVersion: '1.0.0' },
    { fileNotes: '# Changelog\n\n## [1.0.0](https://example.test)\n\n* other\n' },
    { fileNotes: `${changelog}\n${notes}\n` },
    { fileNotes: '# Changelog\n\n## [0.2.0](https://example.test)\n\n## [0.1.0](https://example.test)\n\n* old\n' },
  ]) {
    const { state, api } = fixture(input);
    await assert.rejects(publishMergedReleases(api, repository, branch));
    assert.deepEqual(state.writes, []);
  }
});

test('an existing mismatched tag or release is never overwritten', async () => {
  for (const type of ['tag', 'notes']) {
    const { state, api } = fixture();
    state.tag = type === 'tag' ? 'b'.repeat(40) : sha;
    if (type === 'notes') state.release = { body: 'wrong notes', draft: false, prerelease: false };
    await assert.rejects(publishMergedReleases(api, repository, branch));
    assert.deepEqual(state.writes, []);
  }
});

test('retry after release publication only completes label bookkeeping', async () => {
  const { state, api } = fixture();
  state.tag = sha;
  state.release = { body: notes, draft: false, prerelease: false };
  await publishMergedReleases(api, repository, branch);
  assert.deepEqual(state.writes.map((item) => item.path), [
    '/issues/42/labels', '/issues/42/labels/autorelease%3A%20pending',
  ]);
});

test('retry after tag creation completes the same release', async () => {
  const { state, api } = fixture();
  let interrupted = false;
  const flaky = async (method, path, data) => {
    if (!interrupted && method === 'POST' && path === '/releases') {
      interrupted = true;
      throw new Error('simulated interruption');
    }
    return api(method, path, data);
  };
  await assert.rejects(publishMergedReleases(flaky, repository, branch));
  assert.equal(state.tag, sha);
  assert.equal(state.release, null);
  await publishMergedReleases(flaky, repository, branch);
  assert.equal(state.release.body, notes);
  assert.equal(state.writes.filter((item) => item.path === '/git/refs').length, 1);
});

test('finds a merged release PR beyond the first page', async () => {
  const { state, api } = fixture();
  const paginated = async (method, path, data) => {
    if (method === 'GET' && path.includes('/pulls?') && path.endsWith('page=1')) {
      return Array.from({ length: 100 }, () => ({ merged_at: null }));
    }
    if (method === 'GET' && path.includes('/pulls?') && path.endsWith('page=2')) return [state.pr];
    return api(method, path, data);
  };
  await publishMergedReleases(paginated, repository, branch);
  assert.equal(state.release.tag_name, 'v0.2.0');
});

test('extracts both major and minor changelog headings without older notes', () => {
  for (const version of ['0.1.1', '0.2.0', '1.0.0']) {
    const heading = `${version === '1.0.0' ? '#' : '##'} [${version}](https://example.test) (2026-11-18)`;
    const result = releaseFromFiles(JSON.stringify({ version }), JSON.stringify({ '.': version }),
      `# Changelog\n\n${heading}\n\n* change\n\n## [0.0.1](https://example.test)\n\n* old\n`);
    assert.equal(result.tag, `v${version}`);
    assert.equal(result.notes, `${heading}\n\n* change`);
  }
});
