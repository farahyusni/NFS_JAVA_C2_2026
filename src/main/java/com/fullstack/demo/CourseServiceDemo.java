package com.fullstack.demo;

import com.fullstack.demo.exception.CourseNotFoundException;
import com.fullstack.demo.exception.InvalidCourseException;
import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.Instructor;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;

import java.util.List;

public class CourseServiceDemo {

    public static void main(String[] args) {

        CourseRepository courseRepository = new InMemoryCourseRepository();
        CourseService courseService = new CourseService(courseRepository);

        // === 1. Create Courses ===
        System.out.println("=== 1. Create Courses ===");
        try {
            Course javaCourse = new Course("C001", "Java Fundamentals", 14, "Beginner");
            Course reactCourse = new Course("C002", "React Frontend Development", 21, "Intermediate");
            Course mongoCourse = new Course("C003", "MongoDB Basics", 10, "Beginner");

            courseService.createCourse(javaCourse);
            courseService.createCourse(reactCourse);
            courseService.createCourse(mongoCourse);

            printCourses(courseService.getAllCourses());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }

        // === 2. Find Course by ID ===
        System.out.println("\n=== 2. Find Course by ID ===");
        try {
            Course foundCourse = courseService.getCourseById("C001");
            foundCourse.printSummary();
        } catch (Exception e) {
            System.out.println("Course not found error: " + e.getMessage());
        }

        // === Validation Tests (D2-03.3) ===
        System.out.println("\n=== Validation Tests ===");

        System.out.println("\n--- Invalid: null course ---");
        try {
            courseService.createCourse(null);
        } catch (Exception e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        System.out.println("\n--- Invalid: empty course ID ---");
        try {
            courseService.createCourse(new Course("", "Some Title", 10, "Beginner"));
        } catch (Exception e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        System.out.println("\n--- Invalid: empty title ---");
        try {
            courseService.createCourse(new Course("C005", "", 10, "Beginner"));
        } catch (Exception e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        System.out.println("\n--- Invalid: duration 0 ---");
        try {
            courseService.createCourse(new Course("C005", "Valid Title", 0, "Beginner"));
        } catch (Exception e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        // === 3. Search by Title ===
        System.out.println("\n=== 3. Search by Title ===");
        List<Course> javaResults = courseService.searchByTitle("java");
        printCourses(javaResults);

        // === 4. Filter by Level ===
        System.out.println("\n=== 4. Filter by Level ===");
        List<Course> beginnerCourses = courseService.filterByLevel("Beginner");
        printCourses(beginnerCourses);

        // === 5. Assign Instructor ===
        System.out.println("\n=== 5. Assign Instructor ===");
        try {
            Instructor instructor = new Instructor("I001", "Aina Rahman", "Backend Development");
            Course updatedCourse = courseService.assignInstructor("C001", instructor);
            updatedCourse.printSummary();
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }

        // === 6. Search by Instructor Name ===
        System.out.println("\n=== 6. Search by Instructor Name ===");
        List<Course> instructorResults = courseService.searchByInstructorName("Aina");
        printCourses(instructorResults);

        // === 7. Update Duration ===
        System.out.println("\n=== 7. Update Duration ===");
        try {
            Course durationUpdated = courseService.updateDuration("C001", 20);
            durationUpdated.printSummary();
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }

        // === 8. Delete Course ===
        System.out.println("\n=== 8. Delete Course ===");
        try {
            courseService.deleteCourse("C003");
            System.out.println("C003 deleted successfully");
            printCourses(courseService.getAllCourses());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }

        // === 9. Try to Find Deleted Course ===
        System.out.println("\n=== 9. Try to Find Deleted Course ===");
        try {
            courseService.getCourseById("C003");
        } catch (Exception e) {
            System.out.println("Course not found error: " + e.getMessage());
        }

        // === 10. Invalid Duration Test ===
        System.out.println("\n=== 10. Invalid Duration Test ===");
        try {
            courseService.updateDuration("C001", 0);
        } catch (Exception e) {
            System.out.println("Validation error: " + e.getMessage());
        }
    }

    private static void printCourses(List<Course> courses) {
        if (courses.isEmpty()) {
            System.out.println("No courses found.");
            return;
        }

        for (Course course : courses) {
            course.printSummary();
            System.out.println("----------------------------");
        }
    }
}