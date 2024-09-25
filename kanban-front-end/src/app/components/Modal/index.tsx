"use client";

import styles from "./Modal.module.sass";
import { IModal } from "@/types/modal.types";
import { Button } from "../ui/buttons/Button";
import clsx from "clsx";
import { useState } from "react";
export function Modal({
  message,
  err,
  btn_message,
  action,
  active,
  setActive,
}: IModal) {
  const showAllTasks = () => {
    if (action) {
      action();
    }
  };

  const [mActive, setMActive] = useState(true);
  // console.log(active);
  return (
    <div
      className={
        mActive ? `${styles.bgModal} ${styles.activeModal}` : styles.bgModal
      }
      onClick={showAllTasks}
    >
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <Button onClick={showAllTasks}>{btn_message}</Button>
      </div>
    </div>
  );
}
