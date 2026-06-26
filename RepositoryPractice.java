//package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;

import java.util.List;
import java.util.Optional;

public class RepositoryPractice {

    public static void main(String[] args) {

        //Task A - Create the repository using the interface type
        // The variable type is CourseRepository (interface), but the actual object is InMemoryCourseRepository (implementation)
        // This means we can later swap InMemoryCourseRepository with MongoDBCourseRepository without changing this line
        CourseRepository courseRepository = new InMemoryCourseRepository();

        //Task B - Save three courses directly through the repository
        Course course1 = new Course("C001", "Java Fundamentals", 14, "Beginner");
        courseRepository.save(course1);

        Course course2 = new Course("C002", "Python Programming", 20, "Intermediate");
        courseRepository.save(course2);

        Course course3 = new Course("C003", "Web Development", 25, "Advanced");
        courseRepository.save(course3);

        //Task C - Print all courses
        System.out.println("=== All Courses ===");
        List<Course> courses = courseRepository.findAll();
        for (Course course : courses) {
            course.printSummary();
        }

        //Task D - Find one course using Optional
        System.out.println("\n=== Find C002 ===");
        Optional<Course> optionalCourse = courseRepository.findById("C002");
        if (optionalCourse.isPresent()) {
            Course foundCourse = optionalCourse.get();
            foundCourse.printSummary();
        } else {
            System.out.println("Course not found.");
        }

        //Task E - Check if a course exists
        System.out.println("\n=== Exists Check ===");
        boolean courseExists = courseRepository.existsById("C001");
        System.out.println("Course C001 exists: " + courseExists);
    }
}
