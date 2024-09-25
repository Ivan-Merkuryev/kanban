import { taskService } from "@/services/task.service";
import { useQuery } from "@tanstack/react-query";

export function useTasks() {
  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => taskService.getTasks(),
  });
  return { data };
}

export function useTasksForMe() {
  const { data, isLoading } = useQuery({
    queryKey: ["tasks-for-me"],
    queryFn: () => taskService.getTasksForMe(),
  });
  return { data, isLoading };
}
