import { useState } from "react";
import styles from "./Task.module.sass";
import { ITaskResponse } from "@/types/task.types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import {
  formatDistanceToNowStrict,
} from "date-fns";
import { getDate } from "./getDate";
import { translateToRussian } from "@/hooks/translateDepartment";
import Link from "next/link";
import clsx from "clsx";
const Task = ({
  id,
  title,
  author,
  description,
  department,
  createdAt,
  deadline,
  newTask
}: ITaskResponse) => {
  return (
    <div key={id} className= {clsx(styles.task, {[styles.borderRed]: !newTask})} >
      <Link href={`/i/task?id=${id}`}>
        <div className={styles.headerTask}>
          <div className={styles.header}>
            <p>{author.name}</p>
            <p className={styles.date}>
              {formatDistanceToNowStrict(createdAt, {
                locale: ru,
              })}{" "}
              назад
            </p>
          </div>
        </div>
        <h3>{title}</h3>
        <p className={styles.description}>{description}</p>
        <p>Срок выполнения: {format(deadline, "d MMMM", { locale: ru })}</p>
        <div className={styles.department}>
          {translateToRussian(department)}
        </div>
        {getDate(deadline)}
      </Link>
    </div>
  );
};

export default Task;
