import { useCourses } from "../data/fetchers";

export function CourseList() {
  const courses = useCourses();

  return (
    <div>
      <h2>Course List</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>
    </div>
  );
}
