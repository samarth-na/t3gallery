# t3gallery — AGENTS.md

## Project-local skills

`.agents/` holds OpenCode skill packs (`find-skills`, `frontend-design`, `frontend-skill`, `vercel-react-best-practices`). Use the `skill` tool to load one when relevant — start with `find-skills` to locate the right one.

## Quick start

- `pnpm dev` — dev server with Turbopack (`next dev --turbo`)
- `pnpm build && pnpm start` — production preview
- `pnpm check` — `next lint` then `tsc --noEmit` (run before pushing)
- `pnpm format:write` — Prettier with Tailwind class sort

## Local database

- Production: Neon (URL in `.env` as `DATABASE_URL`).
- Local fallback: `./start-database.sh` (Docker or Podman) parses `DATABASE_URL` and boots a Postgres container.

## Drizzle

- Schema: `src/server/db/schema.ts`. Client: `src/server/db/index.ts` using the **neon-http** driver — no transactions, no prepared statements.
- Tables are prefixed `t3gallery_` in the DB via `pgTableCreator` (e.g. `images` → `t3gallery_image`). `drizzle.config.ts` sets `tablesFilter: ["t3gallery_*"]` — keep in sync if you add schemas in new files.
- Commands: `pnpm db:generate` (writes SQL to `drizzle/`), `pnpm db:push` (dev), `pnpm db:migrate` (prod), `pnpm db:studio`.

## Environment

- Schema: `src/env.js` via `@t3-oss/env-nextjs`. Currently requires `DATABASE_URL` (URL) and `NODE_ENV`.
- `emptyStringAsUndefined: true` — empty values in `.env` fail validation.
- `next.config.js` imports `./src/env.js`, so env is validated on every build/dev. Set `SKIP_ENV_VALIDATION=true` for Docker.
- Path alias: `~/` → `./src/*`.

## Auth (Clerk)

- Middleware at `src/middleware.ts` (uses `clerkMiddleware()`).
- Server: `const { userId } = await auth()` from `@clerk/nextjs/server`.
- Client helpers in use: `<Show>`, `<SignInButton>`, `<UserButton>` from `@clerk/nextjs`.

## Uploads (UploadThing)

- `src/app/api/uploadthing/core.ts` defines a real `imageUploader` route (auth-gated, 4MB / 1 file).
- `src/app/api/uploadthing/route.ts` is a **stub** returning `"Hello World"` — it is not wired to `ourFileRouter`. Wire it via `createRouteHandler` before uploads work.

## Layout

- `src/app/` — App Router. `_component/` for shared client components, `lib/` for non-component helpers.
- `src/server/db/` — Drizzle schema + client.
- `src/styles/globals.css` — Tailwind v4 entry (`@import "tailwindcss"`, theme tokens via `@theme`).
- `drizzle/` — generated migration SQL.

## Tooling & conventions

- pnpm only (`packageManager: pnpm@10.22.0`); `.npmrc` public-hoists `*eslint*` and `*prettier*`.
- `tsconfig`: `verbatimModuleSyntax`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noUnusedLocals/Parameters` all on. Use `import type` for type-only imports; array/record index access returns `T | undefined`.
- ESLint flat config: typescript-eslint strict + stylistic; `eslint-plugin-drizzle` enforces `where` on `delete`/`update` against `db` or `ctx.db`.
- Prettier + `prettier-plugin-tailwindcss` — run `format:write` to sort classes.
- `next.config.js` ignores TS/ESLint errors during `build`, but `pnpm check` still enforces them.
- **No test framework is configured.** Don't add Vitest/Jest/etc. without an explicit ask.
