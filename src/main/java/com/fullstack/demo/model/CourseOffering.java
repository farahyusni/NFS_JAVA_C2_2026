package com.fullstack.demo.model;

public class CourseOffering {
    private String offeringId;
    private String offeringName;
    private Course course;          //composition relationship with Course class
    private Instructor instructor;  //composition relationship with Instructor class
    private String startDate;
    private String endDate;
    private int capacity;
    private String deliveryMode; // e.g., "Online", "In-Person"

    //composition relationship with Course and Instructor classes
    //Course and Instructor objects are created and managed within the CourseOffering class
    //composition means one object uses another object as part of its state and the lifecycle of the contained object is tied to the lifecycle of the containing object.
    //difference between composition and inheritance: Inheritance is a "is-a" relationship, while composition is a "has-a" relationship. 
    //Inheritance allows a class to inherit properties and behaviors from a parent class, while composition allows a class to contain instances of other classes as part of its state.

    public CourseOffering(String offeringId, String offeringName, Course course, Instructor instructor, String startDate, String endDate, int capacity, String deliveryMode) {
        this.offeringId = offeringId;
        this.offeringName = offeringName;
        this.course = course;
        this.instructor = instructor;
        this.startDate = startDate;
        this.endDate = endDate;
        this.capacity = capacity;
        this.deliveryMode = deliveryMode;
    }

    public String getOfferingId() {
        return offeringId;
    }

    public String getOfferingName() {
        return offeringName;
    }
    public Course getCourse() {             //composition relationship with Course class
        return course;
    }
    public Instructor getInstructor() {     //composition relationship with Instructor class
        return instructor;
    }
    public String getStartDate() {
        return startDate;
    }
    public String getEndDate() {
        return endDate;
    }
    public int getCapacity() {
        return capacity;
    }
    public String getDeliveryMode() {
        return deliveryMode;
    }

    public String getSummary() {
        return "Offering ID: " + offeringId 
        + ", Name: " + offeringName 
        + ", Course: " + course.getTitle() 
        + ", Instructor: " + instructor.getInstructorName() 
        + ", Start Date: " + startDate 
        + ", End Date: " + endDate 
        + ", Capacity: " + capacity 
        + ", Delivery Mode: " + deliveryMode;
    }

    public void printSummary() {
        System.out.println("Offering ID: " + offeringId);
        System.out.println("Name: " + offeringName);
        System.out.println("Course: " + course.getTitle());
        System.out.println("Instructor: " + instructor.getInstructorName());
        System.out.println("Start Date: " + startDate);
        System.out.println("End Date: " + endDate);
        System.out.println("Capacity: " + capacity);
        System.out.println("Delivery Mode: " + deliveryMode);
    }

}
