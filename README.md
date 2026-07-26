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