# Day 17 Ticket Performance and Index Tuning Notes

## Query fields used by the app

| Field | Used for filtering? | Used for sorting? | Used in reports? | Should be unique? |
|---|---|---|---|---|
| `status` | Yes — `GET /api/tickets?status=` (`TicketService.getTickets`), `TicketFilterPanel.jsx` | Yes — `TicketsPage.jsx` sort option | Yes — `TicketReportService.countTicketsByStatus` | No |
| `priority` | Yes — `GET /api/tickets?priority=` | Yes — `TicketsPage.jsx` sort option | Yes — `TicketReportService.countTicketsByPriority` | No |
| `category` | Yes — `GET /api/tickets?category=`, `TicketFilterPanel.jsx` search | No | No | No |
| `createdBy` | No (not exposed as a filter param today) | No | No | No |
| `createdAt` | No | Yes — default sort field (`sortBy=createdAt`) in `getPagedTickets` | No | No |
| ticket number | — | — | — | See note below |

**Note on "ticket number":** the exercise's think-about list includes this, but `Ticket.java` has no separate human-readable ticket number field — the only identifier is the MongoDB-generated `_id` (mapped to `id`). `_id` is already unique and indexed by default, so there's nothing extra to add here unless the project later introduces a separate display-facing ticket number.

**Note on uniqueness:** unlike the asset-tracker reference (`assetTag`/`serialNumber` are natural unique business keys), no `Ticket` field needs a uniqueness constraint — `status`/`priority`/`category`/`createdBy` are all expected to repeat across many tickets. The only uniqueness rule in this project is `AppUser.email` (a different collection, enforced via `existsByEmailIgnoreCase` in `UserDataSeeder`/`AuthService`), which is out of scope for the Ticket collection.

## Evidence collected — `db.tickets.getIndexes()`

Ran directly against the live `support_desk_db` database via `mongosh`:

```text
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { category: 1 }, name: 'category' },
  { v: 2, key: { priority: 1 }, name: 'priority' },
  { v: 2, key: { status: 1 }, name: 'status' },
  { v: 2, key: { createdBy: 1 }, name: 'createdBy' },
  { v: 2, key: { createdAt: 1 }, name: 'createdAt' }
]
```

This confirms every field marked `@Indexed` in `Ticket.java` (`category`, `priority`, `status`, `createdBy`, `createdAt`) already has a real single-field index in MongoDB, created automatically via `spring.data.mongodb.auto-index-creation=true`. All 5 index the exact fields used for filtering, sorting, or reporting above — nothing indexed that isn't actually queried, and nothing queried that isn't indexed.

## Timing examples

Captured live from the running backend (`curl -w "%{time_total}"`, in ms):

| Endpoint | Status | Duration | Interpretation |
|---|---:|---:|---|
| `/api/v1/tickets/paged?page=0&size=5` | 200 | ~85 ms | Normal — indexed `createdAt` sort on a small collection |
| `/api/auth/login` (correct password) | 200 | ~128 ms | Normal — BCrypt password verification dominates this, not the DB query |
| `/api/auth/login` (wrong password) | 401 | ~126 ms | Normal — same BCrypt cost applies even on failure, by design (prevents timing attacks distinguishing "wrong password" from "unknown email") |
| `/api/readiness` | 200 | ~10 ms | Normal — single `ticketRepository.count()` call |

## One thing worth considering later

`createdBy` is indexed but never actually used as a filter today (`TicketController`/`TicketV1Controller` only expose `status`/`priority`/`category` as query params). It's harmless to keep — MongoDB write overhead from 5 single-field indexes on a small ticket collection is negligible — but if the app never adds a "my tickets" filter by `createdBy`, it's an index with no current read benefit.