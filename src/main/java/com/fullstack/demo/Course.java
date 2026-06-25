package com.fullstack.demo;

public class Course {
    private String courseId;    //private - within the class can access, outside the class cannot access
    private String title;
    private int durationHours;
    private String level;
    private int creditHours;

    //Exercise 2
    private String category;  //new variable for course category
    private boolean active;  //new variable to indicate if the course is active or not

    private Instructor instructor;  //calling other class

    //constructor - special method to create object of a class
    public Course(String courseId, String title, int durationHours, String level, int creditHours, String category, boolean active) {
        this.courseId = courseId;
        this.title = title;
        this.durationHours = durationHours;
        this.level = level;
        this.creditHours = creditHours;
        this.category = category;
        this.active = active;
    }

    //getter and setter - to access private variables
    public String getCourseId() {
        return courseId;
    }

    public String getTitle() {
        return title;
    }

    public String getCategory() {
        return category;
    }

    public boolean isActive() {
        return active;
    }

    public int getCreditHours() {
        return creditHours;
    }

    public int getDurationHours() {
        return durationHours;
    }

    public String getLevel() {
        return level;
    }

    public Instructor getInstructor() {
        return instructor;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDurationHours(int durationHours) {
        this.durationHours = durationHours;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public void setInstructor(Instructor instructor) {
        this.instructor = instructor;
    }

    public void printSummary() {
        System.out.println("Course ID: " + courseId);
        System.out.println("Title: " + title);
        System.out.println("Duration: " + durationHours + " hours");
        System.out.println("Level: " + level);
        System.out.println("Credit Hours: " + creditHours);
        System.out.println("Category: " + category);
        System.out.println("Status: " + (active ? "Active" : "Inactive"));

        if (instructor != null) {
            System.out.println("Instructor: " + instructor.getInstructorName());
        } else {
            System.out.println("Instructor: Not assigned");
        }
    }
}