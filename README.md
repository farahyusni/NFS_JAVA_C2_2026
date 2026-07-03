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

# Day 5 Exercise 5.1: HTTP Investigation

## Investigation Table

| Method | URL | Status Code | Response Type | What Happened? |
|---|---|---:|---|---|
| GET | /api/health | 200 | Single object | Confirmed the server is running and reachable before testing real endpoints. |
| GET | /api/course-offerings | 200 | List | Successfully retrieved all course offerings as a JSON array of two objects. |
| GET | /api/course-offerings/CO001 | 200 | Single object | Requested one existing course offering by ID and got back a single JSON object, not an array. |
| GET | /api/course-offerings/C999 | 404 | Error object | Requested an ID that doesn't exist in the dataset. The server correctly rejected it with a 404 and a descriptive error message instead of returning empty data or crashing. |
| POST | /api/course-offerings | 201 | Single object | Sent a valid course offering payload. The server created the resource, generated a new ID (CO003), and returned the full created object. |
| POST | /api/course-offerings | 400 | Error object | Sent a payload with empty/invalid fields (blank title, blank instructor, blank date, capacity 0). The server validated the input, rejected it, and returned a list of every field that failed, rather than creating a broken record. |

## Questions to Answer

1. Which request returned a successful list response?
GET /api/course-offerings — it returned status 200 with a JSON array containing all course offerings.

2. Which request returned a not-found response?
GET /api/course-offerings/C999 — the ID doesn't exist in the data, so the server returned a 404 status with a message stating the course offering was not found.

3. Which request returned a validation error?
The POST /api/course-offerings request with empty courseTitle, instructorName, startDate, and capacity: 0. It returned a 400 status with a list of field-level errors explaining exactly what was wrong with the submitted data.

4. What is the difference between a successful response and an error response?
A successful response returns the actual resource being requested — either a single object (like one course offering) or a list of objects — and uses a 2xx status code (200 for reads, 201 for creation). An error response, on the other hand, does not return the requested resource at all. Instead it returns a message field (and sometimes an errors array with details), paired with a 4xx status code that signals what went wrong — 404 means the resource doesn't exist, while 400 means the request itself was invalid.

5. Why is the status code important for frontend developers?
The status code tells the frontend how to react before it even needs to parse the response body. Since both successful and failed responses are JSON objects, the body's shape alone isn't a reliable way to detect failure — a frontend developer needs to check the status code first (e.g., if (response.status === 404) show a "not found" message, if (response.status === 400) show validation errors next to the form fields, if (response.status === 201) confirm the item was created). Without checking the status code, the app could easily treat an error message as if it were valid data.

## Reflection
After this exercise, I understand more clearly that REST APIs communicate meaning through more than just the response body — the HTTP status code and the shape of the JSON response work together to tell the full story. A 404 and a 400 look similar (both are JSON objects with a message field), but they mean very different things: one says the resource doesn't exist, the other says the request itself was malformed. This showed me why checking response.status will be a critical first step once I start writing JavaScript to consume this API — the body alone isn't enough to know if a request succeeded or failed.



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

