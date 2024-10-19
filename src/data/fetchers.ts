import { useEffect, useState } from "react";
import { Database } from "./database-types";
import { supabase } from "../utils/supabase";

type DBCourse = Database["api"]["Tables"]["course"]["Row"];

export function useCourses(): DBCourse[] {
  const [courses, setCourses] = useState<DBCourse[]>([]);

  async function getCourses() {
    const { data } = await supabase
      .from("course")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setCourses(data);
    }
  }

  useEffect(() => {
    getCourses();
  }, []);

  return courses;
}
