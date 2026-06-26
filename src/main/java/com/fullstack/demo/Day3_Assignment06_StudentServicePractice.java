package com.fullstack.demo;

import java.util.List;

import com.fullstack.demo.exception.DuplicateStudentException;
import com.fullstack.demo.exception.StudentNotFoundException;
import com.fullstack.demo.model.Student;
import com.fullstack.demo.repository.InMemoryStudentRepository;
import com.fullstack.demo.repository.StudentRepository;
import com.fullstack.demo.service.StudentService;

public class Day3_Assignment06_StudentServicePractice {
    public static void main(String[] args) {
        
        //1. Create `StudentRepository` and `StudentService`.
        StudentRepository studentRepository = new InMemoryStudentRepository();
        StudentService studentService = new StudentService(studentRepository);

        //2. Register at least 3 students.
        System.out.println("=== Register Students ===");
        studentService.registerStudent(new Student("S001", "Roberto Chan", "roberto@example.com"));
        studentService.registerStudent(new Student("S002", "Priya Nair", "priya@example.com"));
        studentService.registerStudent(new Student("S003", "Lee Salazae", "lee@example.com"));

        //3. Print all students.
        System.out.println("=== All Students ===");
        for (Student student : studentService.getAllStudents()) {
            student.printProfile();
        }

        //4. Find one student by ID.
        System.out.println("=== Find Student by ID ===");
        Student foundStudent = studentService.getStudentById("S002");
        foundStudent.printProfile();

        //5. Search students by name.
        System.out.println("=== Search Students by Name ===");
        List<Student> searchResults = studentService.searchByNameUsingLoop("Lee");
        for (Student student : searchResults) {
            student.printProfile();
        }

        //6. Try to find a missing student ID.
        System.out.println("=== Find Missing Student Test ===");
        try {
            studentService.getStudentById("S999");
        } 
        //7. Catch `StudentNotFoundException` and print a friendly message.
        catch (StudentNotFoundException e) {
            System.out.println(e.getMessage());
        }

        //Test DuplicateStudentException
        System.out.println("=== Duplicate Student Test ===");
        try {
            studentService.registerStudent(new Student("S001", "Roberto Chan", "roberto@example.com"));
        } catch (DuplicateStudentException e) {
            System.out.println(e.getMessage());
        }

        //Stream search test
        System.out.println("=== Search Students by Name Using Stream ===");
        List<Student> streamResults = studentService.searchByNameUsingStream("priya");
        for (Student student : streamResults) {
            student.printProfile();
        }
    }
}
