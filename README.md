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

## Day3_Exercise_01_Add_One_Course_And_Trace_Flow
When getCourseById("C004") is called, which file does the request go to first, second, and third?
Ans : 
1. CourseService.java which call getCourseById
2. CourseRepository.java which call findById
3. InMemoryCourseRepository.java which refering to LinkedHashMap

## Day3_Exercise_02_Interface_And_Repository_Storage
1. Why is InMemoryCourseRepository temporary storage?
- Because it stores data inside a LinkedHashMap which lives in RAM (memory). When the program stops running, everything in memory is wiped. Nothing is saved to a file or database.

private final Map<String, Course> courses = new LinkedHashMap<>();

This map only exists while the program is running.

2. What would replace it later when we use MongoDB?
- A new class. For example MongoCourseRepository — that implements the same CourseRepository interface, but saves data into MongoDB instead of a LinkedHashMap.

CourseRepository (interface)
    ├── InMemoryCourseRepository   ← temporary, uses LinkedHashMap (now)
    └── MongoCourseRepository      ← permanent, uses MongoDB (later)
Because both classes implement the same interface, only need to change one line in the code:

// now
CourseRepository courseRepository = new InMemoryCourseRepository();

// later
CourseRepository courseRepository = new MongoCourseRepository();
Everything else stays the same. That is the whole point of using an interface.

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

