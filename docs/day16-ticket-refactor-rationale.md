# Day 16 Ticket Refactor Rationale

## Files changed

**Backend**
- `support-desk-api/src/main/java/com/example/supportdesk/service/TicketService.java`

**Frontend**
- `support-desk-ui/src/components/TicketFormWizard.jsx`
- `support-desk-ui/src/utils/ticketFormValidation.js` (new)
- `support-desk-ui/src/utils/ticketFormValidation.test.js` (new)

## What behaviour was preserved

- All public method signatures on `TicketService` are unchanged: `getTickets`, `getTicketById`, `createTicket`, `updateTicket`, `getPagedTickets`.
- `TicketController` and `TicketV1Controller` endpoint URLs, HTTP methods, and status codes are untouched — neither controller was edited.
- `TicketResponse`, `CreateTicketRequest`, and `UpdateTicketRequest` field names and shapes are unchanged.
- `ResourceNotFoundException` is still thrown on a missing ticket id, so the existing 404 handling behaves the same.
- The ticket form's JSX, CSS classes, field ids, and every user-visible validation message are byte-for-byte the same as before the extraction.
- Create-mode vs edit-mode behaviour is identical: `status` is still only validated on step 2 when editing, matching the original closure-based check.

## What logic was extracted

**Backend (`TicketService.java`)**
- `findTicketOrThrow(String id)` — the duplicated `ticketRepository.findById(id).orElseThrow(...)` lookup that previously existed separately in `getTicketById` and `updateTicket`.
- `normalizeRequired(String value)` — trims free-text fields (`title`, `description`, `category`, `createdBy`) before they're saved.
- `normalizeStatus(String status)` / `normalizePriority(String priority)` — trim and uppercase these two fields defensively before persisting, since the app treats `"HIGH"` and `"high"` as different values elsewhere (`TicketFilterPanel.jsx`, `UpdateTicketRequest`'s `@Pattern`).

**Frontend (`ticketFormValidation.js`)**
- `validateTicketFormStep(formValues, stepToValidate, reviewConfirmed, isEditMode)` — the per-step validation rules previously inlined in `TicketFormWizard`'s `validateStep`. Note: `isEditMode` was added as a fourth parameter beyond the exercise's suggested three, because the original logic only validates `status` in edit mode — a pure function needs that flag passed in explicitly instead of closing over component state.
- `normalizeTicketFormPayload(formValues)` — the trimming/payload-shaping logic previously inlined in `handleSubmit`.
- `formatTicketFormLabel(key)` — the camelCase-to-label formatter previously defined as a local function at the bottom of the component file.

## Why the new version is easier to maintain

- Validation rules and payload shaping can now be unit-tested directly, without rendering a component or mounting a router — the `ticketFormValidation.test.js` suite covers them in isolation.
- The "not found" lookup exists in exactly one place on the backend, so a future change to that error message only needs to happen once.
- The create-vs-edit branching for `status` validation is now an explicit, testable parameter (`isEditMode`) instead of an implicit closure over component state, making the behaviour visible from the function signature alone.
- Both extractions reduce the size of the functions that mix "what to validate" with "how to render," making each file easier to reason about independently.

## Tests and HTTP requests run

- `npm run test` in `support-desk-ui` — 20 tests passing across 6 files, including 9 tests in `ticketFormValidation.test.js` covering required-field, whitespace-only, invalid-priority/status, review-checkbox, payload-normalization, and label-formatting cases.
- `support-desk-api/requests/day13-update-ticket.http` — confirmed `PUT /api/v1/tickets/{id}` still returns `200` with the updated fields echoed back correctly after the `TicketService` refactor.
- `support-desk-api/requests/day09-auth.http` and `day09-protected-tickets.http` — confirmed `401` (no token), `200` (USER read), `403` (USER create blocked), `201` (ADMIN create allowed) are all unchanged, proving the refactor didn't touch security behaviour.
- Manual verification: opened `/app/tickets/new` and an existing ticket's edit page in the running app to confirm the form renders and submits identically after the validation extraction.

## Risks that still remain

- `CreateTicketRequest` has no `@Pattern` constraint on `priority` (only `UpdateTicketRequest` does) — `normalizePriority` will uppercase whatever a client sends, but it does not reject an invalid value like `"URGENT"`. This is a pre-existing gap the refactor did not introduce, but it also didn't fix it.
- `normalizeStatus`/`normalizePriority` only run inside `TicketService`, after bean validation has already passed — they protect data consistency in storage, not input validation at the API boundary.
- There is no automated backend test (`TicketServiceTest`) covering `findTicketOrThrow`, `normalizeRequired`, `normalizeStatus`, or `normalizePriority` directly — current confidence relies on manual `.http` requests rather than a JUnit suite, so a future regression there wouldn't be caught by `mvn test`.
