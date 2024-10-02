"use client";

import styles from "./Create.module.sass";
import { useEffect, useState } from "react";
import cn from "clsx";

import Switch from "@mui/material/Switch";

const options = [
  { value: "DEVELOPMENT", label: "разработка", color: "#00B8D9" },
  { value: "TESTING", label: "тестировка", color: "#0052CC" },
  { value: "MANAGEMENT", label: "менеджмент", color: "#5243AA" },
  { value: "INFRASTRUCTURE", label: "инфраструктура", color: "#FF5630" },
  { value: "SECURITY", label: "безопасность", color: "#FF8B00" },
  { value: "ANALYTICS", label: "аналитика", color: "#FFC400" },
  { value: "SUPPORT", label: "поддержка", color: "#a7f542" },
  { value: "DESIGN", label: "дизайн", color: "#36B37E" },
  { value: "MARKETING", label: "маркетинг", color: "#666666" },
];

export function MySelect({ onChange, error, isSubmitted }: any) {
  const [isShow, setIsShow] = useState(false);

  const defaultOpt = options[0];
  const [myOptions, setMyOptions] = useState([defaultOpt]);
  const availableOptions = options.filter((el) => el !== defaultOpt);
  const [allOptions, setAllOptions] = useState(availableOptions);

  const optionClick = (value: string) => {
    const obj = options.find((el) => el.value === value);
    if (obj) {
      const updatedOptions = [...myOptions, obj];
      setMyOptions(updatedOptions);
    }
  };

  const deleteOpt = (value: string) => {
    const updatedOptions = myOptions.filter((option) => option.value !== value);
    setMyOptions(updatedOptions);
  };

  useEffect(() => {
    if (isSubmitted) {
      setMyOptions([defaultOpt]);
    }
  }, [isSubmitted]);

  useEffect(() => {
    const newAvailableOptions = options.filter((el) => !myOptions.includes(el));
    setAllOptions(newAvailableOptions);
  }, [myOptions]);

  useEffect(() => {
    const arr: string[] = [];
    const arrData = myOptions.map((el) => {
      arr.push(el.value);
      return el.value;
    });
    onChange(arrData);
  }, [allOptions]);
  return (
    <div>
      <div className={cn(styles.select, error && styles.err)}>
        <div className={styles.options}>
          {myOptions.map((el, index) => (
            <button
              key={index}
              value={el.value}
              onClick={() => deleteOpt(el.value)}
              type="button"
              style={{ color: `${el.color}` }}
              className={styles.btn}
            >
              {el.label}
            </button>
          ))}
        </div>

        <div className={styles.switch}>
          <Switch checked={isShow} onChange={() => setIsShow(!isShow)} />
        </div>
      </div>
      {isShow && (
        <div className={styles.options}>
          {allOptions.map((el, index) => (
            <button
              key={index}
              value={el.value}
              type="button"
              onClick={() => optionClick(el.value)}
              className={styles.btn}
              style={{ color: `${el.color}` }}
            >
              {el.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
