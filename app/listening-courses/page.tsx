import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Listening Courses"
};

export default function ListeningCoursesPage() {
  return <CategoryPage slug="listening-courses" />;
}
