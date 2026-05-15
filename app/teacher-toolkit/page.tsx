import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Teacher Toolkit"
};

export default function TeacherToolkitPage() {
  return <CategoryPage slug="teacher-toolkit" />;
}
