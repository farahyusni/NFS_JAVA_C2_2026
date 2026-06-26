package com.fullstack.demo.repository;

import java.util.List;
import java.util.Optional;

import com.fullstack.demo.model.Course;

public interface CourseRepository { 
    Course save(Course course);
    Optional<Course> findById(String courseId);
    List<Course> findAll();
    void deleteById(String courseId);
    boolean existsById(String courseId);
}
//dont have constructor because it is an interface, we only define the methods that the implementing class must provide
//cannot create object of interface, we can only create object of the implementing class
//need to add default methods in interface if we want to provide some default implementation, but here we only define the methods that the implementing class must provide