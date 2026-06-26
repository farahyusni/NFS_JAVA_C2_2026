import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;

public class CodeFlowPractice {

    public static void main(String[] args) {

        // Task A — Why do we create the repository first?
        // InMemoryCourseRepository holds the actual data storage (LinkedHashMap).
        // CourseService needs a repository to save and find courses, so it must exist first.
        CourseRepository courseRepository = new InMemoryCourseRepository();
        CourseService courseService = new CourseService(courseRepository);

        System.out.println("=== Add and Find Course ===");

        // Task B — Create course C004 through the service (not directly via repository)
        // Flow: CodeFlowPractice -> CourseService.createCourse() -> validates -> CourseRepository.save() -> LinkedHashMap
        Course springCourse = new Course("C004", "Spring Boot API Development", 18, "Intermediate");
        courseService.createCourse(springCourse);

        // Task C — Retrieve course C004 through the service
        // Flow: CodeFlowPractice -> CourseService.getCourseById() -> CourseRepository.findById() -> LinkedHashMap -> returns Course
        Course found = courseService.getCourseById("C004");
        found.printSummary();
    }
}
