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
Day 8 Exercise 3: Add Ticket Indexes and Logging
# Day 8 Exercise 3: Add Ticket Indexes and Logging
![Ticket Logging](exercises/day8/screenshots/image.png)
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

