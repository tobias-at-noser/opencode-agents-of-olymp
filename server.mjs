import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const directory = new URL("./agents/", import.meta.url);
const skillsDirectory = new URL("./skills/", import.meta.url);

export function loadSkills() {
  return readdirSync(skillsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((entry) => {
      const path = fileURLToPath(new URL(`${entry.name}/SKILL.md`, skillsDirectory));
      const content = readFileSync(path, "utf8");
      const frontmatter = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/.exec(content);
      if (!frontmatter) throw new Error(`Missing JSON frontmatter in ${path}`);
      const { name, description } = JSON.parse(frontmatter[1]);
      return { id: entry.name, name, description, path, content: frontmatter[2].trim() };
    });
}

export function applySkills(editor, skills) {
  for (const skill of skills) {
    if (!editor.get(skill.id)) editor.add(skill);
  }
}

function modelRef(value) {
  if (typeof value === "string") {
    const match = /^([^/]+)\/([^#]+)(?:#([^#]+))?$/.exec(value);
    if (!match) throw new Error(`Invalid agent model reference: ${value}`);
    return { providerID: match[1], id: match[2], ...(match[3] && { variant: match[3] }) };
  }
  if (value && typeof value.providerID === "string" && typeof value.model === "string") {
    return { providerID: value.providerID, id: value.model, ...(value.variant && { variant: value.variant }) };
  }
  throw new Error("Invalid agent model reference");
}

export function loadAgents() {
  const agents = new Map();
  for (const file of readdirSync(directory).sort()) {
    const match = /^([a-z][a-z0-9-]*)\.(json|md)$/.exec(file);
    if (!match) continue;
    const [, id, extension] = match;
    if (agents.has(id)) throw new Error(`Duplicate agent: ${id}`);
    const content = readFileSync(new URL(file, directory), "utf8");
    let definition;
    if (extension === "json") {
      definition = JSON.parse(content);
    } else {
      const frontmatter = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/.exec(content);
      if (!frontmatter) throw new Error(`Missing JSON frontmatter in ${file}`);
      definition = { ...JSON.parse(frontmatter[1]), system: frontmatter[2].trim() };
    }
    agents.set(id, { ...definition, ...(definition.model && { model: modelRef(definition.model) }) });
  }
  return agents;
}

export function applyAgents(editor, definitions, overrides = {}) {
  for (const [id, definition] of definitions) {
    editor.update(id, (agent) => {
      agent.mode = definition.mode;
      agent.description ??= definition.description;
      agent.system ??= definition.system;
      if (definition.model) {
        const override = overrides[id] ?? {};
        const model = override.model ? modelRef(override.model) : definition.model;
        const variant = override.variant ?? model.variant;
        agent.model = { ...model, ...(variant !== undefined && { variant }) };
      }
    });
  }
  editor.default("sphinx");
}

// Native OpenCode agent configuration is applied after agent transforms and a
// model-only override replaces the whole reference, including its variant.
function reasoningDefault(definition, override = {}) {
  const selected = override.model ? modelRef(override.model) : definition.model;
  return override.variant ?? selected.variant ?? definition.model.variant;
}

export async function applyDelegationDefault(event, definitions, overrides, getAgent, listModels) {
  const input = event.input;
  if (event.tool !== "subagent" || !input || typeof input !== "object" || input.sessionID !== undefined) return;
  const definition = definitions.get(input.agent);
  if (!definition?.model) return;
  let selected;
  if (input.model !== undefined) {
    if (typeof input.model !== "string") return;
    try { selected = modelRef(input.model); } catch { return; }
    if (selected.variant) return;
  }
  const agentModel = (await getAgent(input.agent)).data.model;
  selected ??= agentModel;
  if (!selected || selected.variant) return;
  const variant = agentModel?.variant ?? reasoningDefault(definition, overrides?.[input.agent]);
  if (!variant) return;
  const models = await listModels();
  const model = models.data.find((item) => item.providerID === selected.providerID && item.id === selected.id);
  if (model?.variants.some((item) => item.id === variant)) input.model = `${selected.providerID}/${selected.id}#${variant}`;
}

export async function applyReasoningDefault(request, definitions, overrides, listModels) {
  if (request.kind !== "primary" || request.model.variant) return;
  const definition = definitions.get(request.agent);
  if (!definition?.model) return;
  const variant = reasoningDefault(definition, overrides?.[request.agent]);
  if (!variant) return;
  const models = await listModels();
  const model = models.data.find((item) => item.providerID === request.model.providerID && item.id === request.model.id);
  if (model?.variants.some((item) => item.id === variant)) request.model = { ...request.model, variant };
}

export default {
  id: "agents-of-olymp",
  async setup(context) {
    const definitions = loadAgents();
    const skills = loadSkills();
    const overrides = context.options?.agents;
    const registration = await context.agent.transform((editor) => applyAgents(editor, definitions, overrides));
    const skillRegistration = await context.skill.transform((editor) => applySkills(editor, skills));
    const delegation = await context.tool.hook("execute.before", (event) =>
      applyDelegationDefault(event, definitions, overrides, (agentID) => context.agent.get({ agentID }), () => context.model.list()));
    const hook = await context.session.hook("experimental.model.resolve", (request) =>
      applyReasoningDefault(request, definitions, overrides, () => context.model.list()));
    return async () => {
      await hook.dispose();
      await delegation.dispose();
      await skillRegistration.dispose();
      await registration.dispose();
    };
  },
};
