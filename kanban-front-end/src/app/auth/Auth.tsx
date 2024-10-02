"use client";

import styles from "./Auth.module.sass";
import { ISingUpForm } from "../../types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../components/ui/buttons/Button";
import { Field } from "../components/ui/fields/Field";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { authService } from "@/services/auth.service";
import { OneSelect } from "../components/ui/SelectOne";
import Link from "next/link";

export function Auth() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ISingUpForm>({
    mode: "onChange",
  });

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["auth"],
    mutationFn: (data: ISingUpForm) =>
      authService.main(isLoginForm ? "login" : "register", data),

    onSuccess() {
      isLoginForm
        ? toast.success("Успешный вход!")
        : toast.success("Успешная регистрация!");
      push(DASHBOARD_PAGES.HOME);
    },
    onError() {
      isLoginForm
        ? toast.error("Неверный логин или пароль")
        : toast.error("Не удалось зарегистрироваться");
      reset();
    },
  });

  const onSubmit: SubmitHandler<ISingUpForm> = (data) => {
    mutate(data);

    reset();
    setIsSubmitted(true);
  };

  return (
    <>
      <ul className={styles.menu}>
        <Link className="py-1 mt-1 px-2 rounded-xl bg-slate-100" href="/">
          <span>Главная</span>
        </Link>
      </ul>
      <div className="flex min-h-screen">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.h1}>
            {isLoginForm ? "Войти" : "Зарегистрироваться"}
          </h1>
          {!isLoginForm && (
            <>
              <Field
                id="name"
                label="Name:"
                placeholder="name:"
                type="name"
                extra="mb-4 mx-4"
                err={errors.name?.message}
                {...register("name", {
                  required: "Name is required!",
                })}
              />
              <Controller
                control={control}
                name="department"
                rules={{
                  required: "Отдел обязателен!",
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div className="m-4">
                    <OneSelect
                      onChange={onChange}
                      value={value}
                      error={error}
                      isSubmitted={isSubmitted}
                    />
                  </div>
                )}
              />
            </>
          )}
          <Field
            id="email"
            label="Email:"
            placeholder="email:"
            type="email"
            extra="mb-4 mx-4"
            err={errors.email?.message}
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter valid email!",
              },
            })}
          />
          <Field
            id="password"
            label="Password: "
            placeholder="password: "
            type="password"
            err={errors.password?.message}
            {...register("password", {
              required: "Password is required!",
            })}
            extra="mb-4 mx-4"
          />

          <div className="flex items-center gap-5 justify-center">
            <Button>{isLoginForm ? "Войти" : "Зарегистрироваться"}</Button>
          </div>
          {isLoginForm ? (
            <p className={styles.message}>
              Нет аккаунта?
              <button type="button" onClick={() => setIsLoginForm(false)}>
                Зарегистрироваться
              </button>
            </p>
          ) : (
            <p className={styles.message}>
              Есть аккаунт?
              <button type="button" onClick={() => setIsLoginForm(true)}>
                Войти
              </button>
            </p>
          )}
        </form>
      </div>
    </>
  );
}
