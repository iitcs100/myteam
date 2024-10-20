import { CourseList } from "../components/CourseList";
import { UnitList } from "../components/UnitList";
import { UnitListByCourse } from "../components/UnitListByCourse";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <CourseList />
      <UnitList />
      <UnitListByCourse />
    </div>
  );
}
