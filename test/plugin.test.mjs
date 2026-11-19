import test from "node:test";
import assert from "node:assert/strict";
import plugin, { applyAgents, applyDelegationDefault, applyReasoningDefault, loadAgents } from "../server.mjs";

function editorWith(entries = {}) {
  const entriesById = new Map(Object.entries(entries));
  return {
    entriesById,
    update(id, update) {
      const agent = entriesById.get(id) ?? { id };
      update(agent);
      entriesById.set(id, agent);
    },
    default(id) { this.defaultID = id; },
  };
}

test("package loads both role formats and creates the entry and specialists", () => {
  const definitions = loadAgents();
  const editor = editorWith();
  applyAgents(editor, definitions);
  assert.equal(editor.defaultID, "sphinx");
  for (const id of ["sphinx", "ariadne", "athene", "daidalos", "hermes", "metis", "themis"]) {
    const agent = editor.entriesById.get(id);
    assert.ok(agent?.description && agent?.system, id);
    assert.equal(agent.mode, id === "sphinx" ? "primary" : "subagent");
    assert.ok(agent.model?.providerID && agent.model?.id && agent.model?.variant, id);
  }
  assert.deepEqual(editor.entriesById.get("sphinx").model, {
    providerID: "personal", id: "gpt-6.1-terra", variant: "medium",
  });
});

test("Sphinx reasoning default preserves the primary session's selected model", async () => {
  const definitions = loadAgents();
  const request = { agent: "sphinx", kind: "primary", model: { providerID: "user", id: "selected" } };
  const models = async () => ({ data: [{ providerID: "user", id: "selected", variants: [{ id: "medium" }] }] });
  await applyReasoningDefault(request, definitions, {}, models);
  assert.deepEqual(request.model, { providerID: "user", id: "selected", variant: "medium" });
});

test("plugin options independently override model and variant", () => {
  const definitions = new Map([["role", {
    mode: "subagent", description: "role", system: "prompt",
    model: { providerID: "default", id: "model", variant: "medium" },
  }]]);
  for (const [override, expected] of [
    [undefined, { providerID: "default", id: "model", variant: "medium" }],
    [{ model: "user/other" }, { providerID: "user", id: "other" }],
    [{ model: "user/other#high" }, { providerID: "user", id: "other", variant: "high" }],
    [{ variant: "high" }, { providerID: "default", id: "model", variant: "high" }],
    [{ model: "user/other", variant: "low" }, { providerID: "user", id: "other", variant: "low" }],
  ]) {
    const editor = editorWith();
    applyAgents(editor, definitions, { role: override });
    assert.deepEqual(editor.entriesById.get("role").model, expected);
  }
});

test("reasoning default is used only when supported and not explicitly selected", async () => {
  const definitions = new Map([["role", { model: { providerID: "default", id: "model", variant: "medium" } }]]);
  const models = async () => ({ data: [{ providerID: "user", id: "other", variants: [{ id: "medium" }] }] });
  const request = (variant) => ({ agent: "role", kind: "primary", model: Object.freeze({ providerID: "user", id: "other", ...(variant && { variant }) }) });
  const missing = request();
  await applyReasoningDefault(missing, definitions, {}, models);
  assert.equal(missing.model.variant, "medium");
  const explicit = request("high");
  await applyReasoningDefault(explicit, definitions, {}, models);
  assert.equal(explicit.model.variant, "high");
  const unsupported = request();
  await applyReasoningDefault(unsupported, definitions, {}, async () => ({ data: [] }));
  assert.equal(unsupported.model.variant, undefined);
  const unsupportedVariant = request();
  await applyReasoningDefault(unsupportedVariant, definitions, { role: { model: "user/other" } }, async () => ({ data: [{ providerID: "user", id: "other", variants: [{ id: "high" }] }] }));
  assert.equal(unsupportedVariant.model.variant, undefined);
  const variantOverride = request();
  await applyReasoningDefault(variantOverride, definitions, { role: { variant: "medium" } }, models);
  assert.equal(variantOverride.model.variant, "medium");
});

test("delegation adds an available reasoning default without changing explicit choices", async () => {
  const definitions = new Map([["role", { model: { providerID: "default", id: "model", variant: "medium" } }]]);
  const agent = async () => ({ data: { model: { providerID: "user", id: "other" } } });
  const models = async () => ({ data: [{ providerID: "user", id: "other", variants: [{ id: "default" }, { id: "medium" }] }] });
  const event = (input) => ({ tool: "subagent", input: { agent: "role", ...input } });
  const implicit = event({});
  await applyDelegationDefault(implicit, definitions, {}, agent, models);
  assert.equal(implicit.input.model, "user/other#medium");
  const explicit = event({ model: "user/other#default" });
  await applyDelegationDefault(explicit, definitions, {}, agent, models);
  assert.equal(explicit.input.model, "user/other#default");
  const explicitModel = event({ model: "user/other" });
  await applyDelegationDefault(explicitModel, definitions, {}, agent, models);
  assert.equal(explicitModel.input.model, "user/other#medium");
  const nativeVariant = event({ model: "user/other" });
  await applyDelegationDefault(nativeVariant, definitions, {}, async () => ({ data: { model: { providerID: "default", id: "model", variant: "default" } } }), models);
  assert.equal(nativeVariant.input.model, "user/other#default");
  const configured = event({});
  await applyDelegationDefault(configured, definitions, {}, async () => ({ data: { model: { providerID: "user", id: "other", variant: "default" } } }), models);
  assert.equal(configured.input.model, undefined);
  const resumed = event({ sessionID: "existing" });
  await applyDelegationDefault(resumed, definitions, {}, agent, models);
  assert.equal(resumed.input.model, undefined);
  const unsupported = event({});
  await applyDelegationDefault(unsupported, definitions, {}, agent, async () => ({ data: [] }));
  assert.equal(unsupported.input.model, undefined);
  const unsupportedVariant = event({});
  await applyDelegationDefault(unsupportedVariant, definitions, { role: { model: "user/other" } }, agent, async () => ({ data: [{ providerID: "user", id: "other", variants: [{ id: "high" }] }] }));
  assert.equal(unsupportedVariant.input.model, undefined);
});

test("setup registers and disposes transform and hooks", async () => {
  let callback;
  const disposed = [];
  const cleanup = await plugin.setup({ agent: { async transform(fn) {
    callback = fn;
    return { async dispose() { disposed.push("transform"); } };
  } }, tool: { async hook(name) {
    assert.equal(name, "execute.before");
    return { async dispose() { disposed.push("delegation"); } };
  } }, session: { async hook(name) {
    assert.equal(name, "experimental.model.resolve");
    return { async dispose() { disposed.push("hook"); } };
  } } });
  const editor = editorWith();
  callback(editor);
  assert.equal(editor.defaultID, "sphinx");
  await cleanup();
  assert.deepEqual(disposed, ["hook", "delegation", "transform"]);
});
