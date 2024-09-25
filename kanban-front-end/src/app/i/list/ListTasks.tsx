"use client";

import Task from "../../components/Task";
import { useTasks } from "./useTasks";
import { useEffect, useState } from "react";

export function ListTasks() {
  const { data } = useTasks();
  const [isLoading, setIsLoading] = useState(true);

  // console.log(data)
  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);
  return (
    <div>
      <h1>Все задачи</h1>
      {isLoading && <p>Загрузка</p>}
      <div className="grid grid-cols-3">
        <div className="flex col-span-2 flex-wrap gap-2">
          {data?.data.map((task) => (
            <Task
              id={task.id}
              description={task.description}
              title={task.title}
              author={task.author}
              key={task.id}
              department={task.department}
              createdAt={task.createdAt}
              deadline={task.deadline}
              reserve={task.reserve}
              whoReserved={task.whoReserved}
              done={task.done}
              whoDone={task.whoDone}
            />
          ))}
        </div>
        <div className="col-span-1">{/* <FilterCart /> */}</div>
      </div>
    </div>
  );
}
// {id, title, author, description}
