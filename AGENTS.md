# Repository Guidelines

## Project Structure & Module Organization
TypeScript sources live in `src/`. `src/redactor.ts` implements the recursive redaction engine, while `src/index.ts` exposes the public API. Default filter definitions sit in `src/filters/`, and shared types in `src/types/`. Jest specs (`.spec.ts`) reside alongside the code, with the main suite in `src/redactor.spec.ts`. Use `demo.js` as a quick Node example when smoke-testing builds.

## Build, Test, and Development Commands
Run `npm install` once before local work. Use `npm run build` to produce the compiled output and `npm run build:watch` during iterative development. `npm run type-check` surfaces compiler issues without emitting files. Execute `npm test` for the Jest suite, `npm run test:watch` while iterating, and `npm run test:coverage` to populate `coverage/` for CI parity.

## Coding Style & Naming Conventions
The project targets Node 16+ with TypeScript strictness. Follow two-space indentation and prefer pure functions, mirroring existing modules. Interface and type names use `PascalCase`, runtime identifiers use `camelCase`, and exported constants describing filters stay `SCREAMING_SNAKE` only when truly static. Format code via `npm run format` before committing; `npm run format:check` guards CI expectations.

## Testing Guidelines
Tests rely on Jest with `ts-jest` preset. Name files `*.spec.ts` beside the unit they exercise and write behavior-driven `describe`/`it` blocks. When adding filters or traversal logic, cover both deep and shallow paths plus circular reference cases. Maintain >90% coverage and verify TypeScript definitions by importing the new API in a test or fixture.

## Commit & Pull Request Guidelines
Use Conventional Commit prefixes (`feat`, `fix`, `chore`, etc.) so release automation can infer intent. Append `[major]` or `[minor]` when introducing breaking changes or new features, and `[skip-publish]` for internal-only work. Before opening a PR, ensure `npm test`, `npm run type-check`, and `npm run format` pass, update README examples if behavior shifts, and include concise context plus linked issues or screenshots when useful.
