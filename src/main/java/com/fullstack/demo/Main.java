package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.CourseOffering;
import com.fullstack.demo.model.Instructor;
import com.fullstack.demo.model.Student;

import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {

        // --- Instructors ---
        ArrayList<Instructor> instructors = new ArrayList<>();
        instructors.add(new Instructor("I001", "Alice Johnson", "Java Development"));
        instructors.add(new Instructor("I002", "Bob Smith", "React Development"));

        // --- Courses ---
        ArrayList<Course> courses = new ArrayList<>();
        courses.add(new Course("C001", "Java Fundamentals", 14, "Beginner"));
        courses.add(new Course("C002", "React Frontend Development", 21, "Intermediate"));
        courses.add(new Course("C003", "MongoDB Basics", 10, "Beginner"));

        // Assign instructors to courses
        courses.get(0).setInstructor(instructors.get(0));
        courses.get(1).setInstructor(instructors.get(1));

        // --- Students ---
        ArrayList<Student> students = new ArrayList<>();
        students.add(new Student("S001", "Charlie Brown", "charlie@example.com"));
        students.add(new Student("S002", "Daisy Duck", "daisy@example.com"));
        students.add(new Student("S003", "Edward Lim", "edward@example.com"));

        // --- Course Offerings ---
        ArrayList<CourseOffering> offerings = new ArrayList<>();
        offerings.add(new CourseOffering(
                "OFF001", "Java Fundamentals - June 2026 Intake",
                courses.get(0), instructors.get(0),
                "2026-06-19", "2026-07-03", 25, "Physical"));
        offerings.add(new CourseOffering(
                "OFF002", "React Frontend - July 2026 Intake",
                courses.get(1), instructors.get(1),
                "2026-07-01", "2026-07-21", 20, "Online"));

        // --- Print all using for-each loops ---
        System.out.println("=== Instructor Profiles ===");
        for (Instructor instructor : instructors) {
            instructor.printProfile();
        }

        System.out.println("=== Course Summaries ===");
        for (Course course : courses) {
            course.printSummary();
            System.out.println("----------------------------");
        }

        System.out.println("=== Student Profiles ===");
        for (Student student : students) {
            student.printProfile();
        }

        System.out.println("=== Course Offerings ===");
        for (CourseOffering offering : offerings) {
            offering.printSummary();
            System.out.println("----------------------------");
        }
    }
}