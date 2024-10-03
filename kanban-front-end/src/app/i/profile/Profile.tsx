"use client";

import Task from "@/app/components/Task";
import { useProfile } from "@/hooks/useProfile";
import { useState, useEffect } from "react";
import { useTasksForMe } from "../list/useTasks";
import Link from "next/link";
import { translateOneToRussian } from "@/hooks/translateDepartment";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import Loader from "@/app/components/ui/Loader";
import styles from "./Profile.module.sass";
import clsx from "clsx";
import { isAdmin } from "@/hooks/isAdmin";
import { Button } from "@/app/components/ui/buttons/Button";
import { Modal } from "@/app/components/Modal";
import { TasksList } from "@/app/components/TasksList";
import { Rating } from "@mui/material";

export function Profile() {
  const { data: tasksData, isLoading: tasksIsLoading } = useTasksForMe();
  const { data: userData, isLoading: userIsLoading } = useProfile();

  const [allTasks, setAllTasks] = useState(true);
  const [myTasks, setMyTasks] = useState(false);
  const [myReservedTasks, setMyReservedTasks] = useState(false);
  const [completed, setCompleted] = useState(false);

  const ThereAreNoTasks =
    tasksData?.data.newTasks.length === 0 &&
    tasksData?.data.oldTasks.length === 0;

  const showAllTasks = () => {
    setAllTasks(true);
    setMyTasks(false);
    setMyReservedTasks(false);
    setCompleted(false);
  };
  const showMyTasks = () => {
    setAllTasks(false);
    setMyTasks(true);
    setMyReservedTasks(false);
    setCompleted(false);
  };
  const showMyReservedTasks = () => {
    setAllTasks(false);
    setMyTasks(false);
    setMyReservedTasks(true);
    setCompleted(false);
  };
  const showCompletedTasks = () => {
    setAllTasks(false);
    setMyTasks(false);
    setMyReservedTasks(false);
    setCompleted(true);
  };

  if (userIsLoading || tasksIsLoading) return <Loader />;

  if (!userData || !tasksData) {
    return <p>Нет данных</p>;
  }

  // console.log(userData.data.rating);
  // console.log(tasksData.data.youCompletedTasks);
  const author = {
    id: userData.data.id,
    name: userData.data.name,
  };
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center mb-2">
          <p>{userData.data.name}</p>
          {userData.data.rating !== 0}{" "}
          {
            <div className="flex gap-1">
              <p>{userData.data.rating}</p>
              <Rating
                name="customized-1"
                defaultValue={1}
                value={1}
                readOnly
                max={1}
              />
            </div>
          }
        </div>
        {translateOneToRussian(userData.data.department)}
      </div>

      {isAdmin(userData.data.role) && (
        <div className="mb-5">
          <Link
            className="float-right linear rounded-lg border border-primary py-2 px-4 mb-4 cursor-pointer font-medium"
            href={DASHBOARD_PAGES.CREATE}
          >
            Создать задачу
          </Link>
          <div className={styles.btns}>
            <button
              className={clsx(
                styles.btnsLeft,
                allTasks && !myTasks && styles.activeButton
              )}
              onClick={showAllTasks}
            >
              Для Вас
            </button>
            <button
              className={clsx(styles.btnsRight, myTasks && styles.activeButton)}
              onClick={showMyTasks}
            >
              Ваши
            </button>
          </div>
        </div>
      )}
      {!isAdmin(userData.data.role) && (
        <Button
          className={clsx(allTasks && !myTasks && styles.activeButton)}
          onClick={showAllTasks}
        >
          Все задачи
        </Button>
      )}
      <div className={styles.btns}>
        <button
          className={clsx(
            styles.btnsLeft,
            myReservedTasks && styles.activeButton
          )}
          onClick={showMyReservedTasks}
        >
          Выполняете
        </button>
        <button
          className={clsx(styles.btnsRight, completed && styles.activeButton)}
          onClick={showCompletedTasks}
        >
          Выполнили
        </button>
      </div>
      <div className="flex">
        {myReservedTasks && (
          <div className="w-full gap-4">
            {tasksData.data.youReservedTasks.length !== 0 ? (
              <>
                <p>Вы зарезервировали:</p>
                {tasksData.data.youReservedTasks.map((task, index) => (
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
            ) : (
              <Modal
                message="Вы не резервировали задачи"
                err={false}
                btn_message="К задачам"
                action={showAllTasks}
                active={true}
              />
            )}
          </div>
        )}
      </div>
      <div className="flex">
        {completed && (
          <div className="w-full gap-4">
            {tasksData.data.youCompletedTasks.length !== 0 ? (
              <>
                <p>Вы выполнили:</p>
                {tasksData.data.youCompletedTasks.map((task, index) => (
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
            ) : (
              <Modal
                message="Вы не выполняли задачи"
                err={false}
                btn_message="К задачам"
                action={showAllTasks}
                active={true}
              />
            )}
          </div>
        )}
      </div>
      <div className="flex">
        {allTasks && !ThereAreNoTasks && (
          <TasksList
            newTasks={tasksData.data.newTasks}
            oldTasks={tasksData.data.oldTasks}
          />
        )}
        {allTasks && ThereAreNoTasks && <p>Нет задач</p>}
        {myTasks && (
          <div className="w-full gap-4">
            {userData.data.tasks.map((task) => (
              <Task
                newTask={true}
                id={task.id}
                key={task.id}
                description={task.description}
                title={task.title}
                author={author}
                deadline={task.deadline}
                department={task.department}
                createdAt={task.createdAt}
                reserve={task.reserve}
                whoReserved={task.whoReserved}
                done={task.done}
                whoDone={task.whoDone}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
