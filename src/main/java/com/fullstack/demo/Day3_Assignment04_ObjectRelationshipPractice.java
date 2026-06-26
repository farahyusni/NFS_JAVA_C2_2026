package com.fullstack.demo;
import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.CourseOffering;
import com.fullstack.demo.model.Instructor;

public class Day3_Assignment04_ObjectRelationshipPractice {
    public static void main(String[] args) {
        //Task A - Create two instructors
        Instructor instructor1 = new Instructor ("I001", "Aina Rahman", "Java and Spring Boot");
        Instructor instructor2 = new Instructor ("I002", "Marcus Lee", "React and Frontend Development");

        //Task B - Create two courses
        Course course1 = new Course ("C001", "Java Fundamentals", 14, "Beginner");
        Course course2 = new Course ("C002", "React Frontend Development", 21, "Intermediate");

        //Task C - Assign instructors to courses
        course1.setInstructor(instructor1);
        course2.setInstructor(instructor2);

        System.out.println("=== Courses ===");
        course1.printSummary();
        System.out.println();
        course2.printSummary();

        //Task D - Create two course offerings
        //CourseOffering uses composition because it HAS a Course and HAS an Instructor
        //instead of storing just text fields like courseTitle or instructorName
        CourseOffering offering1 = new CourseOffering("OFF001", "Java Fundamentals June Intake", course1, instructor1, "2026-06-29", "2026-06-30", 25, "Physical");
        CourseOffering offering2 = new CourseOffering("OFF002", "React Frontend July Intake", course2, instructor2, "2026-07-01", "2026-07-03", 20, "Hybrid");

        //Task E - Print the course offerings
        System.out.println("\n=== Course Offerings ===");
        offering1.printSummary();
        System.out.println();
        offering2.printSummary();

        //Extension task - Reuse same course with different date
        CourseOffering offering3 = new CourseOffering("OFF003", "Java Fundamentals Weekend Intake", course1, instructor1, "2026-07-05", "2026-07-06", 20, "Physical");

        System.out.println();
        offering3.printSummary();

    }
}
