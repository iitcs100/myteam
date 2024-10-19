import { useCourses } from "../data/fetchers";

function CourseList() {
  const courses = useCourses();

  return (
    <ul>
      {courses.map((course) => (
        <li key={course.id}>{course.name}</li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <>
      <div>Home</div>
      <CourseList />
    </>
  );
}
