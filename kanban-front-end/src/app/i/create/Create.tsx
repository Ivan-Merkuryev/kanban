"use client";

import styles from './Create.module.sass'
import { DatePicker } from "@/app/components/DatePicker";
import { Field } from "@/app/components/ui/fields/Field";
import { SubmitHandler, useForm, Resolver, Controller } from "react-hook-form";
import { Button } from "@/app/components/ui/buttons/Button";
import type { TypeTaskFormState } from "@/types/task.types";
import { taskService } from "@/services/task.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { MySelect } from "@/app/components/ui/Select";
import { useState } from "react";

export function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<TypeTaskFormState>({
    mode: "onChange",
  });

  const { mutate } = useMutation({
    mutationKey: ["create task"],
    mutationFn: (data: TypeTaskFormState) => taskService.createTask(data),
    onSuccess() {
      toast.success("Успешное создание задачи!");
    },
    onError() {
      toast.success("Ошибка");
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const onSubmit: SubmitHandler<TypeTaskFormState> = (data) => {
    mutate(data);
    reset();
    setIsSubmitted(true);
  };

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field
          id="title"
          label="Title:"
          placeholder="Название задачи:"
          type="text"
          extra="mb-4 mx-4"
          err={errors.title?.message}
          {...register("title", {
            required: "Title is required!",
          })}
        />
        <Field
          id="description"
          label="Description:"
          placeholder="Описание:"
          type="text"
          extra="mb-4 mx-4"
          err={errors.description?.message}
          {...register("description", {
            required: "Description is required!",
          })}
        />
        <Controller
          control={control}
          name="department"
          rules={{
            required: "Отдел обязателен!",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="m-4">
              <MySelect onChange={onChange} value={value} error={error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="deadline"
          rules={{
            required: "Дедлайн обязателен!",
          }}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <div>
              <DatePicker
                onChange={onChange}
                error={error}
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
              />
            </div>
          )}
        />
        <div className="flex items-center gap-5 justify-center">
          <Button>Отправить задачу</Button>
        </div>
      </form>
    </>
  );
}
