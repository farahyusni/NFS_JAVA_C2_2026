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

