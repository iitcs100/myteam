import { Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";

async function getUnits() {
  // Fetch all units, with all fields for the unit and its
  // course, in descending order of course ID.
  // Supabase can automatically join tables based on their
  // foreign key relationships. Requesting `course(*)` will
  // fetch all columns of the `course` record for each unit.
  // There is a 1:1 relationship between units and courses,
  // so each unit will have one object in its `course` property.
  const { data, error } = await supabase
    .from("unit")
    .select("*, course(*)")
    .order("course_id", { ascending: false });
  if (error) {
    throw error;
  }

  return data ?? [];
}

export function UnitList() {
  const { data, isPending } = useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  });
  const units = data ?? [];

  return (
    <div>
      <h2>Units</h2>
      <Skeleton loading={isPending} minHeight="48px">
        <ul>
          {units.map((unit) => (
            <li key={unit.id}>
              {unit.name} ({unit.course?.name ?? "No Course"})
            </li>
          ))}
        </ul>
      </Skeleton>
    </div>
  );
}
