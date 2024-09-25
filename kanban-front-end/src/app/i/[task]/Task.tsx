"use client";

import { getDate } from "@/app/components/Task/getDate";
import { translateToRussian } from "@/hooks/translateDepartment";
import { taskService } from "@/services/task.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import styles from "./Task.module.sass";
import { formatDistanceToNowStrict } from "date-fns";
import { useEffect, useState } from "react";
import { TaskReport } from "@/app/components/TaskReport/TaskReport";
import { Button } from "@/app/components/ui/buttons/Button";
import { useProfile } from "@/hooks/useProfile";
import { Report } from "@/app/components/Report";
import { Rating } from "@mui/material";
import { isAdmin } from "@/hooks/isAdmin";

export function Task() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  const [openForm, setOpenForm] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [reservedId, setReservedId] = useState("");
  const [taskReportSuccess, setTaskReportSuccess] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [iReservedTask, setIReservedTask] = useState(false);
  // const [iDond]

  const handleFormSubmit = () => {
    setIsReport(true);
    setTaskReportSuccess(true);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["task"],
    queryFn: () => taskService.getOne(id),
  });

  const {
    data: reportData,
    isLoading: isReportLoading,
    refetch,
  } = useQuery({
    queryKey: ["task-report"],
    queryFn: () => taskService.getTaskReport(id),
  });

  function handlePageChange() {
    refetch();
  }

  console.log(data?.data);

  const { data: userData, isLoading: userIsLoading } = useProfile();

  const { mutate: reserveMutation } = useMutation({
    mutationKey: ["task-reserve"],
    mutationFn: () => taskService.reserveATask(id),
    onSuccess: (data) => {
      setIsReserved(data.data.reserve);
      setReservedId(data.data.whoReserved);
      setIReservedTask(data.data.whoReserved === userData?.data.id);
    },
  });
  const reserveTask = () => {
    reserveMutation();
    if (isReserved) setOpenForm(false);
  };

  useEffect(() => {
    if (data?.data.id) {
      setIsReserved(data.data.reserve);
      setTaskReportSuccess(data.data.done);
    }
  }, [data]);

  useEffect(() => {
    if (data?.data && userData?.data) {
      setIReservedTask(data.data.whoReserved === userData.data.id);
    }
  }, [data, userData]);

  if (isLoading || !data || !userData) return null;

  if (!data.data) {
    return <p>Страницы не существует</p>;
  }

  const iAuthor = data.data.author.id === userData.data.id;

  const iAdmin = isAdmin(userData.data.role);

  // console.log(isReserved);

  const stateTask = () => {
    if (!isReserved) {
      return <p className="text-red-500">Не зарезервировано</p>;
    }
    if (isReserved && reportData?.data) {
      return <p className="text-lime-500">Выполнено</p>;
    } else return <p className="text-yellow-400">Зарезервировано</p>;
  };

  return (
    <>
      <div className={styles.header}>
        <p>{data.data.author.name}</p>
        <p className={styles.date}>
          {formatDistanceToNowStrict(data.data.createdAt, {
            locale: ru,
          })}{" "}
          назад
        </p>
      </div>
      <h3 className={styles.title}>{data.data.title}</h3>
      <p className={styles.description}>{data.data.description}</p>
      <div className={styles.header}>
        <p className="mt-10">
          Срок выполнения:
          {format(data.data.deadline, "d MMMM", { locale: ru })}
        </p>
        {stateTask()}
      </div>
      <div className={styles.department}>
        {translateToRussian(data.data.department)}
      </div>

      {isReserved && reportData?.data ? null : (
        <div>{getDate(data.data.deadline)}</div>
      )}
      {!iAuthor && !taskReportSuccess && (
        <>
          {iReservedTask || !isReserved ? (
            <>
              <div className="flex justify-center gap-5">
                <Button onClick={reserveTask}>
                  {iReservedTask ? "Отказаться" : "Зарезервировать"}
                </Button>
                {iReservedTask && (
                  <Button onClick={() => setOpenForm(!openForm)}>
                    Отчитаться о выполнении
                  </Button>
                )}
              </div>

              {(openForm && taskReportSuccess) ||
                (openForm && isReserved && (
                  <TaskReport
                    taskId={id}
                    onFormSubmit={handleFormSubmit}
                    onPageChange={handlePageChange}
                  />
                ))}
            </>
          ) : null}
        </>
      )}
      {iReservedTask && taskReportSuccess && (
        <div className="border-solid border border-gray-300 rounded-lg w-1/2 p-2">
          <p>Ваш отчёт:</p>
          <p>{reportData?.data.text}</p>
          {reportData?.data.grade ? (
            <div>
              <p>Оценка заказчика:</p>
              <div className="flex">
                <p>{reportData?.data.grade}</p>
                <Rating name="customized-1" defaultValue={1} readOnly max={1} />
              </div>
            </div>
          ) : (
            <div className="flex">
              <p>Оценки заказчика пока нет</p>
              <Rating
                name="customized-1"
                defaultValue={1}
                value={null}
                readOnly
                max={1}
              />
            </div>
          )}
        </div>
      )}
      {iAuthor && (
        <>
          {reportData?.data ? (
            <Report
              grade={reportData.data.grade}
              rating={reportData?.data.user.rating}
              name={reportData?.data.user.name}
              text={reportData?.data.text}
              taskId={id}
            />
          ) : (
            <p className="text-center">На ваше задание ещё нет ответов</p>
          )}
        </>
      )}
    </>
  );
}
