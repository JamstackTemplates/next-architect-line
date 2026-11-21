# Plumb Line Architects (`next-architect-line`)

A self-contained static Next.js website for **Plumb Line Architects**, an austere, material-led Chicago architecture studio. Every person, project, award and contact detail is fictitious sample content for the Jamstacks template gallery.

## Local development

Requires Node 24 or later and npm.

```sh
npm ci
npm run dev
```

To run the full test suite, typecheck and static export:

```sh
npm run check
npm start
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: Lakeshore House elevation hero, selected work plates, practice statement & computed counts, six-stage process strip, recent awards register, Monadnock studio visit & `ProfessionalService` JSON-LD |
| `/work/` | Full portfolio contact sheet with progressive type filtering (`#residential`, `#civic`, `#cultural`, `#workplace`, `#reuse`) |
| `/work/[id]/` | Static project monograph sheet per project (drawing plate, title block, technical schedule table, narrative, project awards, adjacent plate links) |
| `/process/` | Six-stage commission section diagram with scroll-active floor highlighting, client brief checklist and plain fee explanation |
| `/studio/` | Studio principles, seven-person roster, full awards register (`#awards`), publications bibliography and Monadnock map/hours |
| `/contact/` | Hosted Jamstacks support form when configured, visible email fallback otherwise, studio details and Monadnock map |
| `/404.html` | Static 404 page ("Out of plumb.") with a 3°-off-true architectural drawing |

## Where to edit content

| File | Owns |
| --- | --- |
| `content/projects.ts` | All project records (`id`, `plate`, `title`, `location`, `year`, `status`, `type`, `areaSqFt`, `client`, `structure`, `materials`, `drawing`, `summary`, `narrative`, `featured`) |
| `content/awards.ts` | Awards register entries (`id`, `name`, `body`, `year`, `level`, `projectId`) |
| `content/process.ts` | Six commission stages (`id`, `number`, `name`, `duration`, `summary`, `clientRole`) |
| `content/studio.ts` | Studio `people`, three `principles` and `publications` |
| `content/business.ts` | Studio name, wordmark, email, phone, Monadnock address, seven weekday `hours` records and Contact enquiry copy |
| `app/page.tsx`, `app/work/page.tsx`, `app/process/page.tsx`, `app/studio/page.tsx`, `app/contact/page.tsx`, `app/not-found.tsx` | Page-specific headings, introductions, calls to action, checklists and fee wording as JSX children |
| `site.config.json` | Public site `name`, `description`, `domain`, `timeZone` (`America/Chicago`) and `jamstacks.siteId` / `cdnUrl` |
| `app/tailwind.input.css` | Light ("lime plaster") and dark ("night concrete") colour tokens, textures, typography and print styles |
| `lib/structured-data.ts` | `ProfessionalService` JSON-LD derived from `content/` |

### Common owner edits

- **Mark a project completed**: Open `content/projects.ts`, change the project's `status` (e.g. `'on-site'` → `'completed'`) and `year`, then run `npm run check`. The `"ON SITE"` stamp disappears from `/work/` and `/work/[id]/`, and the Home built-projects count updates automatically.
- **Add a new award**: Add an entry to `content/awards.ts` with a valid `projectId` matching an entry in `content/projects.ts`. It appears automatically on `/studio/#awards`, the project's sheet, the Home recent-awards register (if among the three newest) and JSON-LD.
- **Change featured projects on Home**: Set `featured: true` on exactly four projects in `content/projects.ts`.
- **Update studio hours**: Edit `business.hours` in `content/business.ts` (same-day `HH:MM` intervals only; omit `opens`/`closes` for closed days). `OpenBadge` refreshes in the browser using `site.config.json`'s `timeZone`.

## Typography and licences

All fonts are self-hosted via `@fontsource` (SIL Open Font License 1.1):

- **Big Shoulders Display** (`@fontsource/big-shoulders-display`, weights 300 & 700) — condensed display titles
- **Instrument Sans** (`@fontsource/instrument-sans`, weights 400 & 600) — body text
- **IBM Plex Mono** (`@fontsource/ibm-plex-mono`, weight 400) — plate numbers, dimensions, schedules and labels

## Public configuration and hosted Contact form

`site.config.json` keeps the Jamstacks provisioner contract (`name`, `description`, `domain`, optional `timeZone`, `jamstacks.siteId` / `cdnUrl`, optional `provisioningId`). Never add credentials or business records there.

- When `JAMSTACKS_SITE` (or `site.config.json`'s `jamstacks.siteId`) is set, `/contact/` renders `<jamstacks-support-form>` and loads `{cdnUrl}/sites/{siteId}/embed.js`.
- Without a site ID, `/contact/` renders the direct email fallback with no external script or host element.
- `studio@plumblinearchitects.com` remains visible in every state. Navigation to and from `/contact/` always performs a full document load via `SiteLink`.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Gallery metadata lives exclusively in the removable `jamstacks/` directory; customer builds, tests and GitHub Pages workflows never read it. To validate gallery metadata after capturing screenshots:

```sh
node --test jamstacks/config.test.mjs
```
