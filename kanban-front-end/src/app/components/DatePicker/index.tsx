"use client";

import styles from "./DatePicker.module.sass";
import { useEffect, useState } from "react";
import { format, addMonths, setHours, setMinutes } from "date-fns";
import { ru } from "date-fns/locale";

import { DayPicker } from "react-day-picker";
import { useOutside } from "@/hooks/useOutside";
import "react-day-picker/dist/style.css";

const today = new Date();

export function DatePicker({ onChange, error, isSubmitted }: any) {
  const sixMonthsAhead = addMonths(today, 6);
  const [selected, setSelected] = useState<Date>();
  const { isShow, setIsShow, ref } = useOutside(false);
  const handleSelectDate = (date: Date) => {
    setSelected(date);
    const newDate = setHours(setMinutes(date, 59), 23);
    onChange(newDate);
    setIsShow(false);
  };
  let footer;
  if (selected) {
    footer = <p>{format(selected, "d MMM", { locale: ru })}</p>;
  }
  useEffect(() => {
    if (isSubmitted) {
      setSelected(undefined);
    }
  }, [isSubmitted]);

  return (
    <div ref={ref} className="flex gap-1 items-center m-4">
      <p>Срок выполнения:</p>
      <button
        type="button"
        className={`${styles.button} ${error ? `${styles.button} ${styles.buttonErr}` : ""}`}
        // className={styles.button}
        onClick={() => setIsShow(!isShow)}
      >
        {footer}
      </button>
      {isShow && (
        <DayPicker
          mode="single"
          initialFocus={isShow}
          selected={selected}
          disabled={{ before: today, after: sixMonthsAhead }}
          required
          onSelect={handleSelectDate}
          locale={ru}
          fromMonth={today}
          toMonth={sixMonthsAhead}
          className="absolute bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
}
