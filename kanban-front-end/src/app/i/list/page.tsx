import type { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { ListTasks } from "./ListTasks";
export const metadata: Metadata = {
  title: "Tasks",
  ...NO_INDEX_PAGE,
};

export default function List() {
  return (
    <>
      <ListTasks />
    </>
  );
}
