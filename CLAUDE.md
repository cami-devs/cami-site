# project context

Personal website using React + TypeScript + Vite. Beginner/intermediate dev.

## hard constraints
- NO CSS frameworks. No Tailwind, no styled-components, no UI libraries.
- Only dependencies: react, react-dom, react-router-dom. Ask before adding any other.
- Global styles in src/styles/ (reset.css, tokens.css, global.css).
  Component styles in *.module.css next to the component.
- All colors, type sizes, and spacing come from CSS variables in tokens.css.
  Never hardcode a hex value or px size in a component.
- Content lives in src/content/ as typed TS data. Components never hardcode
  project or essay content.
