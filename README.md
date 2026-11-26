# Jàm Nail Spa

Local pnpm workspace for independently deployable apps. Only the landing scaffold exists today; visual design and business content await approval.

## Run

Use Node.js 22 LTS and pnpm 10.11.0 (the version pinned in package.json).

```sh
corepack enable
corepack prepare pnpm@10.11.0 --activate
pnpm install
pnpm dev:landing
pnpm build:landing
pnpm lint:landing
```

Vite prints the local development URL. The production output is `apps/landing/dist`; deploy that directory separately from any future admin app.

If Windows denies `corepack enable` access to the Node installation folder, run that setup command from an Administrator terminal. For this checkout, a local pnpm shim is already installed in `node_modules/.bin`, so `corepack pnpm dev:landing` and `corepack pnpm build:landing` also work without globally enabling pnpm. The shim is ignored and can be recreated with `corepack enable pnpm --install-directory node_modules/.bin` after dependency installation (create that directory first if absent).

## Structure

- `apps/landing`: React + TypeScript + Vite, Tailwind CSS v4, and Lenis.
- `apps/landing/eslint.config.js`: ESLint flat config with recommended JavaScript, TypeScript, React Hooks, and React Refresh rules. Run `pnpm lint:landing` (or `corepack pnpm lint:landing`); warnings fail the check. Use `pnpm --filter landing lint --fix` to apply available automatic fixes.
- `apps/landing/src/data/landing.ts`: central public content boundary; replace data loading here when Supabase is introduced.
- `apps/landing/src/styles.css`: future approved brand tokens belong in Tailwind's `@theme` block.
- `apps/landing/src/assets/fonts/`: place local font files here; its README explains registration and Tailwind font tokens. The font stylesheet at `src/styles/fonts.css` is already imported.
- `pnpm-workspace.yaml`: already discovers `apps/*` and `packages/*`.

No backend or environment variables are needed today. Online booking is out of scope for the current landing page. Brand colors will be decided later. The business name uses the local Ngetic Modern Regular font through the Tailwind `font-brand` token; other typography remains undecided. The initial page shows only the business name while language and business content are pending. Metadata uses only the supplied business name and disables indexing until the real page is ready. Before launch, set the document language, approved description, canonical URL, Open Graph URL/image, and allow indexing.

## Extend later

Create `apps/admin` with its own package name, Vite entry, and deployment. Add root scripts using `pnpm --filter admin`. Create shared packages only when needed, give them names such as `@jamnailspa/ui` and `@jamnailspa/supabase`, and consume them with `workspace:*` dependencies. Move the approved theme and genuinely shared components into `packages/ui` at that point.

Introduce Supabase with the admin phase: shared browser client and generated database types in `packages/supabase`; services, customers, staff, bookings, and designs tables; RLS on every table; public read policies for published services/designs; staff-only customer/booking access. Configure design photo storage policies separately. Use email/password staff authentication with public signup disabled. Never expose service-role keys in browser code, and enforce staff authorization with database policies as well as route guards.

## Decisions before admin

- Confirm staff roles, staff provisioning, access removal, and who can edit each resource.
- Confirm booking workflow, online booking scope, time zone, durations, availability, cancellations, and double-booking prevention.
- Confirm service prices/currency, customer fields, consent and retention, and photo visibility.
- Choose Supabase environments/region, backup strategy, and migration workflow.
- Choose separate landing/admin domains, hosting, authentication redirect URLs, and production environment variables.
- Decide whether the public site needs prerendered service/design content for search engines when its data becomes dynamic.
