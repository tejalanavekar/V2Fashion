# V2Fashion

E-commerce site for an Indian ethnic wear business (Women, Men, Kids, Jewellery). Vendors hold most stock; the owner (admin) confirms each order with the vendor on WhatsApp, then confirms it in the admin portal, which calculates the customer's delivery window. A few best sellers are kept as "home stock" and confirm instantly.

## Working rules
- Before creating or changing anything, explain the plan and why, then wait for approval.
- Work in small steps. After each step, summarise: what was done, files changed, how to run/test, what's next.
- Follow the designs the user shares. If a page has no design yet, build it simply and say so.
- Ask when a business rule is unclear. Never guess.
- Don't add new libraries, services or architecture changes without asking.

## Stack
- pnpm monorepo: `apps/web` (Astro SSR, Node adapter, Tailwind, Preact islands only where needed), `apps/api` (Node + Express 5 + TypeScript), `packages/shared` (zod schemas and types).
- Postgres on Supabase with Drizzle ORM (one Postgres schema per module). Local dev uses the Supabase CLI, which needs Docker Desktop.
- Supabase Auth:
  - Customers: Google or email one-time code.
  - Admin: email + password on the hidden `/admin/login` page, with no sign-up.
  - Roles (`customer`, `admin`, `owner`) are stored in our database. Admins are created only via `pnpm admin:create`.
- pg-boss job queue and an outbox table. Emails via Resend.
- Sentry in api, worker and web.
- Vitest, supertest, Playwright, GitHub Actions.
- Dockerfiles for api (also used by the worker) and web. Deploy to Render or Railway. No Kubernetes.

## Architecture: modular monolith
- Processes: `web`, `api`, `worker` (outbox relay, queue jobs, schedules).
- Modules in `apps/api/src/modules/`: identity, vendors, catalog, inventory, cart, orders, payments, fulfilment, enquiries, notifications, reporting.
- Each module has:
  - `index.ts`: its public API
  - `routes.ts`: the Express Router only
  - `service.ts`: use cases and transactions
  - `repo.ts`: queries on its own tables only
  - `domain/`: pure rules, no I/O
  - `schema.ts` and tests
- Modules import each other only via `index.ts`. No import cycles. Enforced by dependency-cruiser in CI.
- Platform layer `src/platform/`: config (zod-validated env), db and `withTransaction`, logger (pino), errors, http (authenticate, requireRole, validate, error handler), outbox, queue.

## Rules that must never be broken
- Money is integer paise. Timestamps are UTC in the database and shown in IST.
- Only the payment webhook (or the mock provider in V1) may mark an order paid. Webhooks are idempotent, and checkout uses an idempotency key.
- Prices and stock are always recalculated on the server at checkout.
- Order status, stock changes and outbox events for one action happen in a single transaction.
- Never call external services (payments, email, LLM) inside a DB transaction.
- Every admin route checks the role on the server. Every admin change is written to the audit log.
- A customer can only ever read their own orders, addresses and profile.
- No WhatsApp messages to customers. Customer updates go by email and the My Orders page.
- Schema changes go through Drizzle migrations only. Never edit the database by hand.
- Secrets live only in env vars. Commit `.env.example`, never `.env`.
- No overselling: home stock changes only via a single conditional UPDATE (`... WHERE home_qty >= n RETURNING`), never read-then-write; `CHECK (home_qty >= 0)` on the table; checkout creates a 15-minute hold, payment commits it, a job releases expired holds; a concurrency test proves two buyers can't get the last piece.

## Order states
placed → paid → awaiting_vendor or confirmed (if all home stock) → with_mom → shipped → delivered → completed.
Side exits: cancelled, refunded, exchange_requested.

## Commands
Fill these in as the project is set up:
- `pnpm dev`, `pnpm test`, `pnpm db:migrate`, `pnpm db:seed`, `pnpm admin:create`
