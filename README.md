# Agents of Olymp

An OpenCode V2 plugin with Sphinx as a shared entry point and Greek-mythology-inspired specialists.

## Install

Install from the upstream Git repository:

```sh
opencode plugin add git+https://github.com/tobias-at-noser/opencode-agents-of-olymp.git
```

OpenCode loads Sphinx as the default entry agent. Describe the work normally; Sphinx can involve suitable specialists. The plugin supplies model and reasoning defaults for each specialist. To override either independently, configure the plugin in `opencode.json`, for example:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [{
    "package": "git+https://github.com/tobias-at-noser/opencode-agents-of-olymp.git",
    "options": {
      "agents": {
        "ariadne": { "variant": "high" },
        "metis": { "model": "provider/model", "variant": "medium" }
      }
    }
  }]
}
```

Use a model and variant available in your own OpenCode environment. Models also accept OpenCode's expanded model-reference form. Native OpenCode `agents` configuration takes precedence over plugin defaults. GitHub is only the distribution source; project work does not depend on a particular host or stack.

For example, a substantive result might end: “The trade-off is lower coupling at the cost of another network hop. Like Ariadne's thread, the interface keeps the path through that complexity visible.”
