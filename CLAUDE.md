# project context

Personal website for Cami. React + TypeScript + Vite. Beginner/intermediate dev —
explain before generating.

## hard constraints
- NO CSS frameworks. No Tailwind, no styled-components, no UI libraries.
- Only dependencies: react, react-dom, react-router-dom. Ask before adding any other.
- Global styles in src/styles/ (reset.css, tokens.css, global.css).
  Component styles in *.module.css next to the component.
- All colors, type sizes, and spacing come from CSS variables in tokens.css.
  Never hardcode a hex value or px size in a component.
- Content lives in src/content/ as typed TS data. Components never hardcode
  project or essay content.
- No top nav bar. The homepage is one continuous scrolling page; section
  headings are the navigation.

## aesthetic
Monochrome, monospace, generous whitespace, thin hairline rules, lowercase
headings, understated blue links. Editorial/zine, not corporate portfolio,
not SaaS landing page.

## how to work with me
- One file or one component per request. Do not scaffold multiple features at once.
- Explain what a file does and why before writing it.
- If a request is ambiguous, ask instead of guessing.