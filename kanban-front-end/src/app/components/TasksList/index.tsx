import { ITaskResponse } from "@/types/task.types";
import Task from "../Task";

export function TasksList({
  newTasks,
  oldTasks,
}: {
  newTasks: ITaskResponse[];
  oldTasks: ITaskResponse[];
}) {
  return (
    <div className="w-full gap-4">
      {newTasks.length !== 0 && (
        <>
          <p>Новые задачи:</p>
          {newTasks.map((task, index) => (
            <Task
              newTask={true}
              id={task.id}
              key={task.id}
              description={task.description}
              title={task.title}
              author={task.author}
              deadline={task.deadline}
              department={task.department}
              createdAt={task.createdAt}
              reserve={task.reserve}
              whoReserved={task.whoReserved}
              done={task.done}
              whoDone={task.whoDone}
            />
          ))}
        </>
      )}
      {oldTasks.length !== 0 && (
        <>
          <p>Старые задачи:</p>
          {oldTasks.map((task, index) => (
            <Task
              newTask={false}
              id={task.id}
              key={task.id}
              description={task.description}
              title={task.title}
              author={task.author}
              deadline={task.deadline}
              department={task.department}
              createdAt={task.createdAt}
              reserve={task.reserve}
              whoReserved={task.whoReserved}
              done={task.done}
              whoDone={task.whoDone}
            />
          ))}
        </>
      )}
    </div>
  );
}
