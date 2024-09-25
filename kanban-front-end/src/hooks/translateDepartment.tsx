import { IOption } from "@/app/components/ui/Select";

const departmentTranslations: IOption[] = [
  { value: "DEVELOPMENT", label: "разработка", color: "#00B8D9" },
  { value: "TESTING", label: "тестировка", color: "#0052CC" },
  { value: "MANAGEMENT", label: "менеджмент", color: "#5243AA" },
  { value: "INFRASTRUCTURE", label: "инфраструктура", color: "#FF5630" },
  { value: "SECURITY", label: "безопасность", color: "#FF8B00" },
  { value: "ANALYTICS", label: "аналитика", color: "#FFC400" },
  { value: "SUPPORT", label: "поддержка", color: "#a7f542" },
  { value: "DESIGN", label: "дизайн", color: "#36B37E" },
  { value: "MARKETING", label: "маркетинг", color: "#666666" },
];

export function translateToRussian(departments: string[]) {
  return departments.map((department) => {
    const translation = departmentTranslations.find(
      (option) => option.value === department
    );
    return translation ? (
      <p style={{ color: translation.color }}>{translation.label}</p>
    ) : null;
  });
}

export function translateOneToRussian(department: string) {
  const translation = departmentTranslations.find(
    (option) => option.value === department
  );
  return translation ? (
    <p style={{ color: translation.color }}>{translation.label}</p>
  ) : null;
}