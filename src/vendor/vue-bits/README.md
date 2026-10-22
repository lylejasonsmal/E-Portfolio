# Vue Bits (vendored)

Copied unchanged from Vue Bits, TypeScript + Tailwind variant.

| File | Wrapped by | Needs |
|---|---|---|
| `TechText.vue` | `components/ui/InteractiveWordmark.vue` | Tailwind utilities |
| `Aurora.vue` | `components/ui/AuroraBackground.vue` | ogl |
| `FolderFloat.vue` | `components/ui/ProjectFolder.vue` | matter-js, Tailwind utilities |
| `LogoLoop.vue` | `components/ui/SkillsLoop.vue` | Tailwind utilities |

## Rules

- Only files in `src/components/ui/` import from this folder. Pages and components use the wrappers.
- Do not edit these files. Adapt behaviour or styling in the wrapper. To update one, copy it again from Vue Bits and re-check its wrapper.
- These components were written for Tailwind. `src/assets/tailwind.css` generates utilities for this folder only, with no preflight, so the rest of the app is unaffected.
