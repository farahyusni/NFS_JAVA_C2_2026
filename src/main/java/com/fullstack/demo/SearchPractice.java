package com.fullstack.demo;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.service.CourseService;
import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.InMemoryCourseRepository;

import java.util.List;

public class SearchPractice {
    public static void main(String[] args) {
        
        //1. Create `CourseRepository` and `CourseService`.
        CourseRepository courseRepository = new InMemoryCourseRepository();
        CourseService courseService = new CourseService(courseRepository);

        //2. Add at least four courses
        courseService.createCourse(new Course("C001", "Java Fundamentals", 14, "Beginner"));
        courseService.createCourse(new Course("C002", "React Frontend Development", 21, "Intermediate"));
        courseService.createCourse(new Course("C003", "MongoDB Basics", 28, "Beginner"));
        courseService.createCourse(new Course("C004", "Spring Boot API Development", 35, "Intermediate"));

        //3. Call
        System.out.println("=== Beginner Courses (Loop) ===");
        List<Course> beginnerCourses = courseService.searchByLevelUsingLoop("Beginner");
        for (Course course : beginnerCourses) {
            course.printSummary();
        }

        //Optional Task D - Write the stream version
        System.out.println("\n=== Intermediate Courses (Stream) ===");
        List<Course> intermediateCourses = courseService.searchByLevelUsingStream("Intermediate");
        for (Course course : intermediateCourses) {
            course.printSummary();
        }
    }
}