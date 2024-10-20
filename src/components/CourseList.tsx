import { Skeleton } from "@radix-ui/themes";
import { useQuery } from "../utils/queries";
import { supabase } from "../utils/supabase";

async function getCourses() {
  // Fetch all courses, with all fields, with the most
  // recently-created courses first.
  const { data, error } = await supabase
    .from("course")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }

  return data ?? [];
}

export function CourseList() {
  const coursesQuery = useQuery(getCourses);
  const courses = coursesQuery.data ?? [];

  return (
    <div>
      <h2>Courses</h2>
      <Skeleton loading={coursesQuery.isLoading} minHeight="48px">
        <ul>
          {courses.map((course) => (
            <li key={course.id}>{course.name}</li>
          ))}
        </ul>
      </Skeleton>
    </div>
  );
}
