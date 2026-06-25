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

## Day 2 - Java OOP & Service Layer

### D2-01 — Clean Up Model Classes
- Added `private` fields, constructor, getters/setters, and validation using `requireText()` to `Course.java`, `Instructor.java`, and `Student.java`
- Added `printSummary()` for `Course` and `printProfile()` for `Instructor` and `Student`

**Screenshot:** !(images/1.png)

---

### D2-02 — Use ArrayList and Loops
- Created `ArrayList` for courses, instructors, students, and course offerings in `Main.java`
- Printed all records using enhanced `for` loops

**Screenshot:** !(images/1.png)

---

### D2-03.1 — Create CourseService Structure
- Created `CourseService.java` under `service/` package with constructor injection of `CourseRepository`

---

### D2-03.2 — Create and List Courses
- Added `createCourse()` and `getAllCourses()` to `CourseService`
- Tested in `CourseServiceDemo.java` — sections 1 and 2

**Screenshot:** !(images/CourseServiceDemo_S1,S2.png)

---

### D2-03.3 — Add Course Validation
- Added `validateCourse()` and `isBlank()` private methods to `CourseService`
- Tested null course, empty ID, empty title, and zero duration

**Screenshot:** !(images/validation_test.png)

---

### D2-03.4 — Search and Filter Courses
- Added `searchByTitle()` using stream + filter with case-insensitive matching
- Added `filterByLevel()` using stream + filter with `equalsIgnoreCase`

**Screenshot:** !(images/S3S4.png)

---

### D2-03.5 — Assign Instructor and Search by Instructor
- Added `assignInstructor()` to link an `Instructor` to a `Course`
- Added `searchByInstructorName()` with null-safe filtering

**Screenshot:** !(images/S5S6.png)

---

### D2-03.6 — Update and Delete Courses
- Added `updateDuration()` with duration validation before saving
- Added `deleteCourse()` with existence check before deleting

**Screenshot:** !(images/end.png)

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

