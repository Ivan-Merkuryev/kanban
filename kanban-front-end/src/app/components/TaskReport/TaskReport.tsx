"use client";

import styles from "./TaskReport.module.sass";
import { taskService } from "@/services/task.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Field } from "../ui/fields/Field";
import { Button } from "../ui/buttons/Button";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { ITaskReport } from "@/types/task.types";
import { toast } from "sonner";

export function TaskReport({ taskId, onFormSubmit, onPageChange }: { taskId: string, onFormSubmit: () => void, onPageChange: () => void }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ITaskReport>({
    mode: "onChange",
  });

  const { mutate } = useMutation({
    mutationKey: ["task_report"],
    mutationFn: ({ id, data }: { id: string; data: ITaskReport }) => {
      return taskService.writeAReport(id, data);
    },
    onSuccess() {
      toast.success("Отчёт отправлен!");
      onFormSubmit()
      onPageChange()
    },
    onError() {
      toast.error("Ошибка!");
    },
  });

  const onSubmit: SubmitHandler<ITaskReport> = (data) => {
    mutate({ id: taskId, data: data });
    reset()
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Field
        id="text"
        label="text "
        placeholder="Отчёт: "
        type="text"
        err={errors.text?.message}
        {...register("text", { required: "Text is required!" })} 
        extra="my-5"
      />
      <Button>Отправить отчёт</Button>
    </form>
  );
}
