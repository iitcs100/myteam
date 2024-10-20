import { Skeleton } from "@radix-ui/themes";
import { useQuery } from "../utils/queries";
import { supabase } from "../utils/supabase";
import { Database } from "../supabase.d";

async function getCoursesWithUnits() {
  // Fetch all courses, with all fields, with all fields of
  // all units for with each course.
  // There is a 1:many relationship between courses and units,
  // so each course will have an array for its `unit` property.
  const { data, error } = await supabase
    .from("course")
    .select("*, unit(*)")
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }

  return data ?? [];
}

type Unit = Database["public"]["Tables"]["unit"]["Row"];

function UnitList({ units }: { units: Unit[] }) {
  if (units.length === 0) {
    return (
      <ul>
        <li>No Units</li>
      </ul>
    );
  }

  return (
    <ul>
      {units.map((unit) => (
        <li key={unit.id}>{unit.name}</li>
      ))}
    </ul>
  );
}

export function UnitListByCourse() {
  const coursesQuery = useQuery(getCoursesWithUnits);
  const courses = coursesQuery.data ?? [];

  return (
    <div>
      <h2>Courses with Units</h2>
      <Skeleton loading={coursesQuery.isLoading} minHeight="48px">
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              {course.name}:
              <UnitList units={course.unit} />
            </li>
          ))}
        </ul>
      </Skeleton>
    </div>
  );
}
