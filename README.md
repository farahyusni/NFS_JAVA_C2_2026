# NFS_JAVA_C2_2026 | Full-Stack Development with Java, React & MongoDB



## Programme Description



This 20-day programme is designed to help participants build a complete full-stack web application using Java, Spring Boot, React, and MongoDB.



The programme takes learners from programming and web fundamentals to backend API development, frontend interface design, database modelling, authentication, testing, performance improvement, and final capstone presentation.



Throughout the programme, participants will work on practical exercises and gradually build a small but production-like web application. The final outcome is a working capstone project that demonstrates the use of a React frontend, Spring Boot backend, MongoDB database, secure authentication, API documentation, testing practices, and deployment-readiness basics.



AI tools such as Gemini are used as learning accelerators to help scaffold examples, suggest refactoring ideas, draft tests, generate sample data, and support MongoDB query or aggregation design. However, participants are expected to review, verify, understand, and take ownership of all generated code.



---



## Programme Duration



* Duration: 20 training days

* Daily Duration: 7 hours per day

* Total Training Hours: 140 hours

* Mode: Instructor-led training with guided labs, team build activities, review sessions, quizzes, and capstone development



---



## Programme Objectives



By the end of this programme, participants will be able to:



* Understand web fundamentals, HTTP, REST, and JSON.

* Write basic to intermediate Java and JavaScript code.

* Build REST APIs using Spring Boot.

* Apply validation, authentication, authorisation, and error-handling practices.

* Model data effectively using MongoDB.

* Use MongoDB indexes, queries, pagination, and aggregation pipelines.

* Build accessible React user interfaces with routing, forms, state, and data fetching.

* Apply testing practices for backend and frontend development.

* Use AI coding assistants responsibly for learning, refactoring, testing, and documentation.

* Design, build, document, and present a full-stack capstone project.



---

# Exercise_01_Health_And_About_Endpoint

**Controller:** [InfoController.java](support-desk-api/src/main/java/com/example/supportdesk/controller/InfoController.java)

**GET /api/health**

![Health endpoint response](exercises/day6/screenshots/health-endpoint.png)

**GET /api/about**

![About endpoint response](exercises/day6/screenshots/about-endpoint.png)


# Exercise_02_Ticket_Read_API

1. [TicketResponse.java](support-desk-api/src/main/java/com/example/supportdesk/dto/TicketResponse.java)
2. [TicketService.java](support-desk-api/src/main/java/com/example/supportdesk/service/TicketService.java)
3. [TicketController.java](support-desk-api/src/main/java/com/example/supportdesk/controller/TicketController.java)

**GET /api/tickets**

![Retrieve tickets information](exercises/day6/screenshots/get-tickets.png)

# Exercise_03_Ticket_By_ID_And_404

1. [TicketService.java](support-desk-api/src/main/java/com/example/supportdesk/service/TicketService.java)
2. [TicketController.java](support-desk-api/src/main/java/com/example/supportdesk/controller/TicketController.java)
3. [ResourceNotFoundException.java](support-desk-api/src/main/java/com/example/supportdesk/exception/ResourceNotFoundException.java)
4. [GlobalExceptionHandler.java](support-desk-api/src/main/java/com/example/supportdesk/exception/GlobalExceptionHandler.java)
5. [ErrorResponse.java](support-desk-api/src/main/java/com/example/supportdesk/dto/ErrorResponse.java)

**GET /api/tickets/T001 (successful request)**

![Get ticket by ID success](exercises/day6/screenshots/get-ticket-by-id.png)

**GET /api/tickets/T999 (missing ticket request)**

![Get ticket by ID not found](exercises/day6/screenshots/get-ticket-not-found.png)

# Exercise_04_Create_Ticket_With_Validation

1. [CreateTicketRequest.java](support-desk-api/src/main/java/com/example/supportdesk/dto/CreateTicketRequest.java)
2. [TicketService.java](support-desk-api/src/main/java/com/example/supportdesk/service/TicketService.java)
3. [TicketController.java](support-desk-api/src/main/java/com/example/supportdesk/controller/TicketController.java)
4. [GlobalExceptionHandler.java](support-desk-api/src/main/java/com/example/supportdesk/exception/GlobalExceptionHandler.java)
5. [ErrorResponse.java](support-desk-api/src/main/java/com/example/supportdesk/dto/ErrorResponse.java)
6. [FieldErrorDetail.java](support-desk-api/src/main/java/com/example/supportdesk/dto/FieldErrorDetail.java)

**POST /api/tickets (valid request)**

![Create ticket success](exercises/day6/screenshots/create-ticket-valid.png)

**POST /api/tickets (invalid request - blank fields)**

![Create ticket validation error](exercises/day6/screenshots/create-ticket-invalid.png)

# Day 6 Exercise 5: Create an HTTP Test File

**Test file:** [day06-tickets.http](support-desk-api/requests/day06-tickets.http)

**Endpoints tested — all working correctly:**

- `GET /api/health` → 200
- `GET /api/about` → 200
- `GET /api/tickets` → 200 (returns full ticket list)
- `GET /api/tickets/T001` → 200 (existing ticket)
- `GET /api/tickets/T999` → 404 (missing ticket)
- `POST /api/tickets` (valid body) → 201 (ticket created with new ID, `OPEN` status)
- `POST /api/tickets` (blank fields) → 400 (validation errors for all 5 required fields)

**Example successful response** (`POST /api/tickets`, 201):

```json
{
  "id": "T006",
  "title": "VPN connection not working",
  "description": "User cannot connect to company VPN from home.",
  "category": "Network",
  "priority": "MEDIUM",
  "status": "OPEN",
  "createdBy": "siti@example.com",
  "createdAt": "2026-07-04"
}
```

**Example error response** (`GET /api/tickets/T999`, 404):

```json
{
  "errors": [],
  "message": "Ticket T999 was not found"
}

```
# Day 7 Exercise 5: Persistence Checkpoint
1. What is the role of the repository?
- The repository acts as the data access layer. It communicates with MongoDB and provides methods such as save(), findAll(), and findById() so the service can perform database operations without writing database queries directly.

2. What is the difference between `Ticket` and `TicketResponse`?
- Ticket is the MongoDB document (model/entity) that represents how data is stored in the database.
- TicketResponse is a Data Transfer Object (DTO) used to send ticket information back to the client. Using a DTO keeps the database model separate from the API response.

3. What does MongoDB store as the document ID?
- MongoDB automatically generates a unique _id field for each document. In your application, it is mapped to the id field in the Ticket model.

4. Why should the controller not talk directly to MongoDB?
- The controller should only handle HTTP requests and responses. Business logic belongs in the service layer, and database operations belong in the repository layer. This separation makes the application easier to maintain, test, and extend.

# Day 8 Exercise 3: Add Ticket Indexes and Logging

![Ticket Logging](exercises/day8/screenshots/image.png)

# Day 8 Exercise 4: Query Test File and Notes
1. Which query parameters did you implement?
- Filtering: status, priority, category on GET /api/tickets. Pagination/sorting: page, size, sortBy, direction on GET /api/tickets/paged.

2. Which fields did you index?
- category, priority, status, createdBy, createdAt — all annotated with @Indexed in Ticket.java, created automatically via spring.data.mongodb.auto-index-creation=true.

3. Why should an API use pagination?
- Returning the entire collection on every request doesn't scale — as ticket volume grows, response size, memory use, and network transfer time grow with it. Pagination caps each response to a fixed page size, keeping response times predictable regardless of how many total tickets exist.

4. What log messages appear when you call the filtering endpoint?
- Fetching tickets with filters - status: OPEN, priority: null, category: null (values reflect whatever query params were actually passed; unset ones log as null).

5. What endpoint proves your sorting works?
- GET /api/tickets/paged?page=0&size=5&sortBy=createdAt&direction=desc — comparing the createdAt timestamps in the response's content array shows them in strictly descending order (confirmed earlier: Laptop 18:39:45 → ... → Unable to login Jul 10). Switching direction=asc reverses that order, proving the sort parameter is actually driving the query rather than being ignored.

# Day 9 Exercise 2 - Register and Login

1. [RegisterRequest.java](support-desk-api/src/main/java/com/example/supportdesk/dto/RegisterRequest.java)
2. [LoginRequest.java](support-desk-api/src/main/java/com/example/supportdesk/dto/LoginRequest.java)
3. [AuthResponse.java](support-desk-api/src/main/java/com/example/supportdesk/dto/AuthResponse.java)
4. [AuthService.java](support-desk-api/src/main/java/com/example/supportdesk/service/AuthService.java)
5. [JwtService.java](support-desk-api/src/main/java/com/example/supportdesk/service/JwtService.java)
6. [AuthController.java](support-desk-api/src/main/java/com/example/supportdesk/controller/AuthController.java)
7. [SecurityConfig.java](support-desk-api/src/main/java/com/example/supportdesk/security/SecurityConfig.java)
8. [AppUserDetailsService.java](support-desk-api/src/main/java/com/example/supportdesk/security/AppUserDetailsService.java)
9. [DuplicateResourceException.java](support-desk-api/src/main/java/com/example/supportdesk/exception/DuplicateResourceException.java)
10. [GlobalExceptionHandler.java](support-desk-api/src/main/java/com/example/supportdesk/exception/GlobalExceptionHandler.java)

**Test file:** [day09-auth.http](support-desk-api/requests/day09-auth.http)

**POST /api/auth/register (Register success)**

```json
HTTP/1.1 201 Created

{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXJhaEBleGFtcGxlLmNvbSIsInJvbGUiOiJVU0VSIiwiaXNzIjoic3VwcG9ydC1kZXNrLWFwaSIsIm5hbWUiOiJGYXJhaCBZdXNuaSIsImV4cCI6MTc4NDk0ODIxMiwiaWF0IjoxNzg0OTQ0NjEyLCJ1c2VySWQiOiI2YTY0MTdlNGE5OTFlNTRiYmQ5MjY1OGUifQ.4v5YJHJkyXvBvuSkhFDvQFXgOpWPhLuyEHuAJl305es",
  "tokenType": "Bearer",
  "expiresInMinutes": 60,
  "userId": "6a6417e4a991e54bbd92658e",
  "name": "Farah Yusni",
  "email": "farah@example.com",
  "role": "USER"
}
```

**POST /api/auth/register (Duplicate email error)**
```json
HTTP/1.1 409 Conflict

{
  "errors": [],
  "message": "Email already exists: farah@example.com"
}
```

**POST /api/auth/login (Login success)**
```json
HTTP/1.1 200 OK

{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXJhaEBleGFtcGxlLmNvbSIsInJvbGUiOiJVU0VSIiwiaXNzIjoic3VwcG9ydC1kZXNrLWFwaSIsIm5hbWUiOiJGYXJhaCBZdXNuaSIsImV4cCI6MTc4NDk0ODI1OSwiaWF0IjoxNzg0OTQ0NjU5LCJ1c2VySWQiOiI2YTY0MTdlNGE5OTFlNTRiYmQ5MjY1OGUifQ.hwEgoJTAyySJyMzDEdohG6cEgoTYtwY8VwRP2Xqim84",
  "tokenType": "Bearer",
  "expiresInMinutes": 60,
  "userId": "6a6417e4a991e54bbd92658e",
  "name": "Farah Yusni",
  "email": "farah@example.com",
  "role": "USER"
}
```

**POST /api/auth/login (Wrong password error)**
```json
HTTP/1.1 401 Unauthorized

{
  "errors": [],
  "message": "Invalid email or password"
}
```
# Day 9 Exercise 3 - Protect Ticket Endpoints

**File:** [SecurityConfig.java](support-desk-api/src/main/java/com/example/supportdesk/security/SecurityConfig.java)

**Test file:** [day09-protected-tickets.http](support-desk-api/requests/day09-protected-tickets.http)

**GET /api/tickets (no token)**

```json
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="http://localhost:8080/.well-known/oauth-protected-resource"
```

**GET /api/tickets (USER token)**

```json
HTTP/1.1 200 OK

[
  {
    "id": "6a6340f13d181d1ac0533acd",
    "title": "Laptop won't power on",
    "category": "Hardware",
    "priority": "HIGH",
    "status": "OPEN",
    "createdBy": "farah@example.com",
    "createdAt": "2026-07-24T18:39:45.721"
  }
  // ...full ticket list returned successfully
]
```

**POST /api/tickets (USER token)**

```json
HTTP/1.1 403 Forbidden
WWW-Authenticate: Bearer error="insufficient_scope", error_description="The request requires higher privileges than provided by the access token."
```

**POST /api/tickets (ADMIN token)**

```json
HTTP/1.1 201 Created

{
  "id": "6a64ba73f6f3666add73ce23",
  "title": "Should be allowed",
  "description": "ADMIN role can create tickets",
  "category": "Network",
  "priority": "HIGH",
  "status": "OPEN",
  "createdBy": "admin@example.com",
  "createdAt": "2026-07-25T21:30:27.509683600"
}
```

# Day 9 Exercise 4 - Seed an Admin User
**File:** [UserDataSeeder.java](support-desk-api/src/main/java/com/example/supportdesk/config/UserDataSeeder.java)
![successful admin login](exercises/day9/screenshots/admin-login.png)

# Day 10 Exercise 1: Add Versioned Ticket API Endpoints

1. [TicketV1Controller.java](support-desk-api/src/main/java/com/example/supportdesk/controller/TicketV1Controller.java)
2. [SecurityConfig.java](support-desk-api/src/main/java/com/example/supportdesk/security/SecurityConfig.java)

**Test file:** [day10-tickets-v1.http](support-desk-api/requests/day10-tickets-v1.http)

![Protected v1 endpoint with token](exercises/day10/screenshots/protected-endpoints.png)

Why might a company keep both `/api/tickets` and `/api/v1/tickets` temporarily?
-  Existing clients/integrations built against the original unversioned endpoint would break immediately if it were renamed or changed in place. Keeping both allows the new version (with its different behavior, like the loosened POST permission here) to roll out without forcing every consumer to update at the same instant

# Day 10 Exercise 2: Create a Ticket Report by Status

1. [ReportCountResponse.java](support-desk-api/src/main/java/com/example/supportdesk/dto/ReportCountResponse.java)
2. [TicketReportService.java](support-desk-api/src/main/java/com/example/supportdesk/service/TicketReportService.java)
3. [ReportController.java](support-desk-api/src/main/java/com/example/supportdesk/controller/ReportController.java)

**Test file:** [day10-tickets-v1.http](support-desk-api/requests/day10-tickets-v1.http)

![Ticket report by status](exercises/day10/screenshots/ticket-by-status.png)

Why is a grouped report endpoint better than asking the frontend to download all tickets and count them manually?
- It shifts the counting work to the database, which is built to aggregate efficiently even over large datasets, instead of transferring every ticket document over the network just to throw away all fields except status

# Day 10 Exercise 3: Create a Ticket Report by Priority
**File:** [TicketReportService.java](support-desk-api/src/main/java/com/example/supportdesk/service/TicketReportService.java) (added `countTicketsByPriority`)

**Test file:** [day10-tickets-v1.http](support-desk-api/requests/day10-tickets-v1.http)

How could this report help a support manager decide where to assign staff?
- A count of tickets grouped by priority immediately shows workload skew — e.g. if HIGH has a large count relative to LOW/MEDIUM, the manager knows urgent issues are piling up and can reassign staff toward high-priority tickets before SLAs are missed, without having to manually scan or filter the full ticket list to notice the imbalance.

# Day 10 Exercise 4: Create a Simple API Documentation Endpoint

1. [ApiEndpointResponse.java](support-desk-api/src/main/java/com/example/supportdesk/dto/ApiEndpointResponse.java)
2. [ApiDocumentationResponse.java](support-desk-api/src/main/java/com/example/supportdesk/dto/ApiDocumentationResponse.java)
3. [ApiDocsController.java](support-desk-api/src/main/java/com/example/supportdesk/controller/ApiDocsController.java)

**Test file:** [day10-tickets-v1.http](support-desk-api/requests/day10-tickets-v1.http)

![API documentation endpoint](exercises/day10/screenshots/docs-api.png)

Why is API documentation useful before frontend integration?
- It gives frontend developers a single reference for exactly which endpoints exist, what HTTP method and path each uses, and what access level each requires — without them needing to read your Java source or guess by trial and error.

# Day 10 Exercise 5: Backend Milestone Review

**Test file:** [day10-tickets-v1.http](support-desk-api/requests/day10-tickets-v1.http)

**Successful login response:**

![Login response](exercises/day10/screenshots/login.png)

**Protected endpoint working with token:**

![Protected endpoint with token](exercises/day10/screenshots/protected-endpoints.png)

**Report endpoint response:**

![Ticket report by status](exercises/day10/screenshots/ticket-by-status.png)

**/api/docs response:**

![API documentation endpoint](exercises/day10/screenshots/docs-api.png)

What is one thing you would improve before connecting this backend to React?
- Add an update endpoint (e.g. PATCH /api/v1/tickets/{id}/status) so support staff can transition a ticket through OPEN → IN_PROGRESS → CLOSED. Right now the API can create and view tickets but has no way to change a ticket's state after creation, which is a core workflow for any support desk UI.

# D11 Exercise 01 — Create the React Project

![Support Desk UI](exercises/day11/screenshots/exercise01-support-desk-ui.png)

# D11 Exercise 02 — Build Layout Components

```text
App
└── Layout
    ├── AppHeader
    └── p ("Ticket dashboard goes here")
```

# D11 Exercise 03 — Ticket Sample Data, List and Detail

![List And Details Ticket](exercises/day11/screenshots/exercise01-list&detail-tickets-ui.png)

# D11 Exercise 04 — State, Search and Filter

![Search And Filter Ticket](exercises/day11/screenshots/exercise01-search-filter-tickets-ui.png)

# D11 Exercise 05 — useEffect, Loading and Error UI
![backend successful state](exercises/day11/screenshots/exercise05-backend-connection-success.png)
![backend error state](exercises/day11/screenshots/exercise05-backend-connection-fail.png)

# D11 Exercise 06 — Component Tree and Reflection
## Component Tree
```text
App
├── Layout
│   └── AppHeader
├── TicketSummaryCards
├── ApiInfoCard
├── TicketFilterPanel
└── TicketWorkspace
    ├── TicketList
    │   ├── PriorityBadge
    │   └── StatusBadge
    └── TicketDetail
        ├── PriorityBadge
        └── StatusBadge
```

Q1: Which component owns the selected ticket state?
- App.jsx — it holds selectedId via useState and passes it down to TicketList (as selectedTicketId) and TicketDetail (as the resolved ticket object), plus the setter down to TicketList via onSelectTicket.

Q2: Which components receive props?
- Layout (children), TicketFilterPanel (searchText, statusFilter, onSearchChange, onStatusChange), TicketList (tickets, selectedTicketId, onSelectTicket), TicketDetail (ticket), PriorityBadge/StatusBadge (priority/status) — AppHeader and App itself take no props.

Q3: What does useEffect do in your app?
- useEffect lets a component run code as a side effect. To fetch data from the backend once when the component mounts

Q4: What loading state did you create?
- A loading state is a boolean (or similar flag) that tracks "is the fetch still in progress?" so i can show a placeholder instead of blank/broken UI while waiting

Q5: What error state did you create?
- For failure: a piece of state (e.g. error, initially null) that gets set if the fetch throws — either a network failure (backend not running) or the throw new Error('Failed to load API info') from a non-OK response in the exercise's fetchApiInfo()

Q6: What would change when you connect this UI to the protected backend API later?
- tickets would come from a fetch/useEffect call to /api/v1/tickets instead of sampleTickets.js, you'd need to attach a JWT token to requests, handle 401/403 responses, and add loading/error states around that fetch (similar to whatever Exercise 5 has you build for the info endpoint).

# Day 12 Exercise 1: Add React Router
1. http://localhost:5173/login 
![login](exercises/day12/screenshots/login.png)

2. http://localhost:5173/app/dashboard 
![dashboard](exercises/day12/screenshots/dashboard.png)

3. http://localhost:5173/app/tickets 
![tickets](exercises/day12/screenshots/tickets.png)

# Day 12 Exercise 2: Create Nested App Layout
![navigation](exercises/day12/screenshots/navigation.png)

# Day 12 Exercise 4: Protect Ticket Pages
![protected tickets](exercises/day12/screenshots/protected-ticket.png)



# Day 13 Exercise 1: Add Backend Update Endpoint

1. [UpdateTicketRequest.java](support-desk-api/src/main/java/com/example/supportdesk/dto/UpdateTicketRequest.java)
2. [TicketService.java](support-desk-api/src/main/java/com/example/supportdesk/service/TicketService.java) (added `updateTicket`)
3. [TicketV1Controller.java](support-desk-api/src/main/java/com/example/supportdesk/controller/TicketV1Controller.java) (added `PUT /api/v1/tickets/{id}`)

**Test file:** [day13-update-ticket.http](support-desk-api/requests/day13-update-ticket.http)

**PUT /api/v1/tickets/{id} (valid request)**

![Update ticket success](exercises/day13/screenshots/update-ticket-success.png)

# Day 13 Exercise 2: Create Ticket Form Page

1. [TicketFormWizard.jsx](support-desk-ui/src/components/TicketFormWizard.jsx)
2. [TicketFormPage.jsx](support-desk-ui/src/pages/TicketFormPage.jsx)
3. [api.js](support-desk-ui/src/services/api.js) (added `createTicketRequest`)
4. [App.jsx](support-desk-ui/src/App.jsx) (added `/app/tickets/new` route)

![New ticket form](exercises/day13/screenshots/new-ticket-form.png)

# Day 13 Exercise 3: Client-Side Validation

**File:** [TicketFormWizard.jsx](support-desk-ui/src/components/TicketFormWizard.jsx) 

![Validation blocks empty title](exercises/day13/screenshots/validation-error.png)

# Day 13 Exercise 4: Submit Ticket To Backend

1. [emptyTicketForm.js](support-desk-ui/src/components/emptyTicketForm.js)
2. [api.js](support-desk-ui/src/services/api.js) (`createTicket`, `updateTicket`, `fetchTicketById`)
3. [TicketFormWizard.jsx](support-desk-ui/src/components/TicketFormWizard.jsx) (added `mode`/`initialValues` props, editable Status in edit mode)
4. [TicketFormPage.jsx](support-desk-ui/src/pages/TicketFormPage.jsx) (handles both create and edit via the optional `:id` route param)
5. [App.jsx](support-desk-ui/src/App.jsx) (added `/app/tickets/:id/edit` route)

**Routes:**
- `/app/tickets/new` — create (`POST /api/v1/tickets`)
- `/app/tickets/:id/edit` — edit (`GET` to load, `PUT /api/v1/tickets/{id}` to save)

![Ticket update success](exercises/day13/screenshots/update-ticket-form.png)

# Day 13 Exercise 5: Add Edit Ticket Flow

1. [api.js](support-desk-ui/src/services/api.js) (added `fetchTickets`)
2. [TicketsPage.jsx](support-desk-ui/src/pages/TicketsPage.jsx) (now fetches real tickets from the backend instead of `sampleTickets.js`, with loading/error states)
3. [TicketDetail.jsx](support-desk-ui/src/components/TicketDetail.jsx) (added an "Edit Ticket" link to the selected ticket)
4. [App.jsx](support-desk-ui/src/App.jsx) (route param renamed `:id` → `:ticketId`)
5. [TicketFormPage.jsx](support-desk-ui/src/pages/TicketFormPage.jsx) (reads `:ticketId` from the route)

**Route:** `/app/tickets/:ticketId/edit`

# Day 14 Exercise 1: Create API Client Layer

1. [httpClient.js](support-desk-ui/src/services/httpClient.js) (new — `apiRequest(path, options)`)
2. [api.js](support-desk-ui/src/services/api.js) (refactored every function to call `apiRequest` instead of `fetch` directly)

# Day 14 Exercise 2: Ticket Data Context And Reducer

1. [TicketDataContext.jsx](support-desk-ui/src/context/TicketDataContext.jsx) (new — `useReducer` with `LOAD_START`/`LOAD_SUCCESS`/`LOAD_ERROR`/`SET_SEARCH_TEXT`/`SET_STATUS_FILTER`/`SELECT_TICKET`)
2. [TicketsPage.jsx](support-desk-ui/src/pages/TicketsPage.jsx) (now reads tickets, filters, and selection from `useTicketData()` instead of local `useState`/`useEffect`)
3. [App.jsx](support-desk-ui/src/App.jsx) (wrapped the `tickets` route in `TicketDataProvider`)

# Day 14 Exercise 3: Add Pagination And Filters

1. [TicketV1Controller.java](support-desk-api/src/main/java/com/example/supportdesk/controller/TicketV1Controller.java) (added `GET /api/v1/tickets/paged`)
2. [api.js](support-desk-ui/src/services/api.js) (added `fetchPagedTickets`)
3. [TicketDataContext.jsx](support-desk-ui/src/context/TicketDataContext.jsx) (pagination/sort state + `SET_PAGE`/`SET_PAGE_SIZE`/`SET_SORT_BY`/`SET_SORT_DIRECTION` actions, fetches paged data on change)
4. [TicketsPage.jsx](support-desk-ui/src/pages/TicketsPage.jsx) (added page/size/sort controls; search and status filter still apply client-side to the loaded page)

# Day 14 Exercise 4: Add Simple Page Cache

1. [TicketDataContext.jsx](support-desk-ui/src/context/TicketDataContext.jsx) (added `cache`, `reloadToken`, `source` to state; `LOAD_FROM_CACHE`/`FORCE_RELOAD` actions; cache keyed on `page|size|sortBy|direction`)
2. [TicketsPage.jsx](support-desk-ui/src/pages/TicketsPage.jsx) (added Refresh button and "Loaded from cache" / "Fetched from backend" status message)

# Day 14 Exercise 5: Ticket Status Update

1. [TicketDataContext.jsx](support-desk-ui/src/context/TicketDataContext.jsx) (added `updateTicketStatus`, `UPDATE_TICKET_OPTIMISTIC`/`SET_TICKET`/`SET_STATUS_ERROR` actions)
2. [TicketDetail.jsx](support-desk-ui/src/components/TicketDetail.jsx) (added OPEN/IN_PROGRESS/CLOSED quick-status buttons)
3. [TicketsPage.jsx](support-desk-ui/src/pages/TicketsPage.jsx) (wires `updateTicketStatus`/`statusError` into `TicketDetail`)

# Day 16 Exercise 0 - Prompt Engineering Warm-Up
1. A poor prompt that is too vague.
- Can you improve my TicketService class? Make it cleaner and better.

2. A better developer prompt using the given structure.
Context:
I am working on the Support Desk Ticket API (Spring Boot). The file is
support-desk-api/src/main/java/com/example/supportdesk/service/TicketService.java.
It has getTickets, getTicketById, createTicket, updateTicket, and a private
convertToResponse helper. getTickets currently uses an if/else if/else chain
to pick a repository method based on which filter (status/priority/category)
was passed in.

Task:
Refactor TicketService to reduce duplication and improve readability,
specifically the filter-selection logic in getTickets and any other
repeated patterns you notice.

Constraints:
- Do not change public method names or signatures (getTickets, getTicketById,
  createTicket, updateTicket, getPagedTickets).
- Do not change the TicketController endpoint URLs or HTTP methods.
- Do not change TicketResponse, CreateTicketRequest, or UpdateTicketRequest fields.
- Do not change ResourceNotFoundException usage or its resulting HTTP status.
- Do not add new dependencies or libraries.
- Keep the code readable for a beginner Java developer.

Expected output:
1. The refactored TicketService.java
2. A short explanation of each helper method you introduced and why

Tests:
- List the existing .http requests in support-desk-api/requests/ I should
  rerun to confirm behaviour is unchanged (e.g. day13-update-ticket.http)
- Tell me if any new unit test would be worth adding for the extracted logic

Review:
- Confirm you did not rename any public method used by TicketController
- Confirm you did not change what getTickets returns for a given filter combination
- List any risk you introduced, even minor ones

3. Why the second prompt is safer
- The poor prompt gives the AI no boundaries, so it's free to rename methods, change what fields the API returns, add a library, or restructure things in ways that look "cleaner" but silently break TicketController or the frontend that calls it

The better prompt fixes this by naming the exact file and methods, listing explicit constraints on what must not change, specifying expected output so you get code plus reasoning rather than just a diff, and closing with tests and review sections

# Day 16 Exercise 1 - AI Refactor Safety Checklist
1. Safe to share: service/controller/repository/DTO classes (e.g. TicketService.java, TicketController.java), React components and utils (TicketFormWizard.jsx, tickets.js), test files, and exercise markdown — none of these contain credentials.
2. Never share as-is: application.properties — it hardcodes spring.mongodb.password=abc123 and app.jwt.secret=...day9-support-desk-demo-secret-key... (application.properties:16,30). Redact both values (replace with ***) before pasting into any AI prompt.
3. Never share: anything under .env, IDE-local settings, or your machine's ~/.m2/settings.xml if it has real credentials — none currently exist in this repo, but keep this rule for when they do.
4. Secrets to strip before sharing any config file: DB username/password, JWT signing secret, any real (non-seeded-demo) API tokens, and personal emails beyond the known seeded test accounts (admin@example.com, day9demo@example.com).
5. Behaviour that must not change during any AI refactor: TicketController endpoint URLs/HTTP methods, TicketResponse/CreateTicketRequest/UpdateTicketRequest field names, HTTP status codes returned on success/404/403, and SecurityConfig's role rules (which endpoints need ADMIN vs authenticated USER).
5. Public contracts that must not change on the frontend: route paths in App.jsx (/app/tickets, /app/tickets/new, etc.), AuthContext's supportDeskAuth storage key, and the shape of the onSubmit payload from TicketFormWizard.
6. Tests that must still pass after any AI-suggested change: mvn test (backend), npm run test (Vitest unit/component suite), and npm run test:e2e (Playwright smoke test) in support-desk-ui.
7. HTTP requests to manually rerun to prove nothing broke: the files in support-desk-api/requests/, especially day09-auth.http (401/403/200 role checks) and day13-update-ticket.http (edit flow).
8. Before accepting AI output: confirm it didn't invent a repository/service method that doesn't exist, and confirm no secret value from a shared file was echoed back in the AI's response.

# Day 16 Exercise 2 - Backend Ticket Service Refactor
- Before: getTicketById and updateTicket each independently called ticketRepository.findById(id).orElseThrow(...) with the identical error message — the same "not found" logic duplicated in two places. After: both call the new findTicketOrThrow(id) helper, so there's one place that defines what "ticket not found" means.
- Before: createTicket and updateTicket wrote field values straight from the request DTO into the Ticket model with no defensive trimming, and status/priority casing was never normalized before hitting the database — a client sending " Printer jam " or "low" would store it exactly like that. 
- After: normalizeRequired trims whitespace on free-text fields, and normalizeStatus/normalizePriority trim and uppercase those two fields specifically, since your data model treats "HIGH" and "high" as different values (TicketFilterPanel.jsx and UpdateTicketRequest's @Pattern both hardcode the uppercase enum strings).
- Nothing about the public contract changed: method names, parameter types, return types, TicketResponse fields, and exception type (ResourceNotFoundException → still 404) are all identical. For any request that already sends clean, correctly-cased data (which is everything in your requests/*.http files), the output is byte-for-byte the same as before — trimming an already-trimmed string and uppercasing an already-uppercase string is a no-op.

# Day 16 Exercise 4 - Generate Then Harden Tests
## what I improved from the AI draft
1. Problem: The draft used toBeGreaterThan(0), toBeTruthy(), and toBeDefined() everywhere, these pass even if the actual error text is wrong or missing. Improved: Every assertion now checks the literal message string or the exact returned object

2. Problem: The draft's step-2 test never proved that status validation is skipped in create mode. Improved: Now there are two separate tests: one confirming errors.status is undefined in create mode, one confirming it fires in edit mode.

3. Problem: title: '' alone doesn't prove .trim() is actually being called. Improved: Added title: ' ' (spaces only) as a separate case to actually exercise the trim logic.

4. Problem: The draft's step-3 test checked both the failure and success path in one it() block. Improved: renamed to blocks step 3 when unchecked / passes step 3 when checked so a failure immediately tells you which behavior broke.

5. Problem: The draft never confirmed already-clean input passes through unchanged. Improved: added a test with pre-trimmed values to guard against accidental mutation

# Day 16 Exercise 6 - AI-Assisted Coding Reflection

1. What did the AI assistant help you do faster?
- Mostly boilerplate and cross-referencing — setting up Vitest/RTL config, writing the Playwright smoke test, and spotting things like the `react-router-dom` vs `react-router` mismatch without me having to dig through package.json myself.

2. What AI suggestion did you reject or change?
- The suggested `validateTicketFormStep(formValues, stepToValidate, reviewConfirmed)` signature from the exercise sheet was kept as-is at first, but it couldn't actually replicate the create-vs-edit status check, so an extra `isEditMode` parameter got added instead of just going with the "suggested" version blindly.

3. Why should developers not accept generated code blindly?
- Because it can look right and still be broken — the TicketService refactor left a duplicate `updateTicket` method that wouldn't even compile until I caught it, and the login page had a stale seeded password that would've failed silently if I hadn't checked it against UserDataSeeder.

4. What private information should never be pasted into AI tools?
- DB passwords, JWT secrets, real tokens — found exactly this in application.properties (mongo password + JWT secret sitting in plain text) during the safety checklist exercise.

5. What tests proved that your refactor preserved behaviour?
- `npm run test` (20 passing) for the frontend validation extraction, plus rerunning day13-update-ticket.http and day09-auth.http/day09-protected-tickets.http to confirm the backend refactor didn't change status codes or role checks.

6. What part of AI-assisted refactoring still feels unclear?
- Knowing when a deviation from what was asked (like the extra isEditMode param) is a genuinely necessary fix versus overengineering — right now I mostly just test it and see, which works but isn't a real rule I could explain to someone else yet.

# Day 16 Exercise 7 - AI Regression Check

**Regression checklist**

1. Login — untouched (LoginPage.jsx, AuthContext.jsx not part of either refactor) — still returns a JWT and redirects to /app/dashboard.
2. Protected ticket list — ProtectedRoute.jsx/TicketDataContext.jsx untouched — GET /api/v1/tickets still requires a token and renders the list.
3. Create ticket form — TicketFormWizard.jsx changed (validation extracted) — step 1→2→3 flow and the POST payload shape (title/description/category/priority/status) must match exactly.
4. Edit ticket form — same component, mode="edit" — status field must still be enabled/validated, existing ticket must still prefill via initialValues.
5. API request headers — httpClient.js untouched by either refactor — Authorization: Bearer <token> still attached to every request.
6. Validation rules — moved to ticketFormValidation.js — every inline error message text must match what it said before.
7. 401 handling — SecurityConfig untouched — request with no token still returns 401.
8. 403 handling — SecurityConfig untouched — USER token posting a ticket still returns 403.
9. Unit tests — npm run test → 20 passing. mvn test only has the placeholder contextLoads() — no JUnit test exists yet for TicketService's new helpers, so backend confidence still relies on manual .http checks.
10. E2E/manual smoke test — day15-smoke.spec.js (login → dashboard → tickets → create ticket → success message) covers the exact flow both refactors touch — rerun npm run test:e2e.

**One risk AI identified**
- While reviewing the TicketService refactor, the pasted file ended up with two `updateTicket` methods — the new refactored one and the original, un-deleted one still sitting further down the file. That's a duplicate method name that wouldn't even compile. Caught it before it reached `mvn spring-boot:run`.

**One check used to confirm behaviour still works**
- After removing the duplicate method, reran support-desk-api/requests/day13-update-ticket.http (login → get a real ticket id → PUT /api/v1/tickets/{id}) and confirmed it still returned 200 with the updated fields echoed back exactly as before the refactor.

---

## AI-Assisted Learning Guidelines



Participants may use AI tools to:



* Generate README drafts and documentation sections.

* Create API call examples and JSON payload samples.

* Suggest method signatures and edge cases.

* Propose refactoring options.

* Draft test scenarios for backend and frontend features.

* Suggest MongoDB document structures, queries, indexes, and aggregation pipelines.

* Improve demo scripts and presentation notes.



Participants must always review, verify, test, and understand any AI-generated output. No passwords, API keys, tokens, private keys, or confidential data should be placed into AI prompts.