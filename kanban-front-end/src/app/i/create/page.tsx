import { Create } from "./Create";
import type { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
  title: "Create",
  ...NO_INDEX_PAGE,
};

export default function CreatePage() {
  return (
    <>
      <Create />
    </>
  );
}
