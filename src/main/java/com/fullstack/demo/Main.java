package com.fullstack.demo;

public class Main {
    public static void main(String[] args) {

        //syntax to create object of a class
        //ClassName objectName = new ClassName();
        //ClassName and ConstructorName should be same

        Instructor instructor1 = new Instructor("I001", "Aina Rahman", "Java and Spring Boot");
        Instructor instructor2 = new Instructor("I002", "Jane Smith", "Data Structures");

        //create course
        Course course1 = new Course("C001", "Java Fundamentals", 2, "Beginner", 3, "Programming", true);
        Course course2 = new Course("C002", "Data Structures", 3, "Intermediate", 4, "Computer Science", false);

        Student student1 = new Student("S101", "Alice Johnson", "alice@example.com");
        Student student2 = new Student("S102", "Bob Smith", "bob@example.com");

        CourseOffering offering1 = new CourseOffering("OFF001", "Java Fundamentals - June 2026 Intake", course1, instructor1, "2026-06-19", "2026-06-20", 25, "Online");
        CourseOffering offering2 = new CourseOffering("OFF002", "Data Structures - September 2027 Intake", course2, instructor2, "2027-09-01", "2027-12-01", 30, "Physical");

        course1.setInstructor(instructor1);
        course2.setInstructor(instructor2);

        System.out.println("\nCourse Profiles:");
        course1.printSummary();
        course2.printSummary();

        System.out.println("\nStudent Profiles:");
        student1.printProfile();
        student2.printProfile();

        System.out.println("\nCourse Offering Summaries:");
        offering1.printOfferingSummary();
        offering2.printOfferingSummary();
    }
}
