"use client";

import styles from "@/app/auth/Auth.module.sass";
import { useEffect, useState } from "react";
import cn from "clsx";

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

interface IOption {
  value: string;
  label: string;
  color: string;
}

export function OneSelect({ onChange, error, isSubmitted }: any) {
  const [isShow, setIsShow] = useState(false);

  const [myOption, setMyOption] = useState<IOption | undefined>(undefined);
  const availableOptions = options.filter((el) => el !== myOption);
  const [allOptions, setAllOptions] = useState(availableOptions);

  const optionClick = (value: string) => {
    const obj = options.find((el) => el.value === value);
    if (obj) {
      setMyOption(obj);
      setIsShow(!isShow);
    }
  };
  const deleteOpt = (value: string) => {
    setMyOption(undefined);
  };
  useEffect(() => {
    let newAvailableOptions;
    if (myOption) {
      newAvailableOptions = options.filter((el) => myOption !== el);
    }
    if (newAvailableOptions) {
      setAllOptions(newAvailableOptions);
    }
  }, [myOption]);

  useEffect(() => {
    if (myOption) {
      const value = myOption.value;
      onChange(value);
    }
  }, [allOptions]);

  useEffect(() => {
    if (isSubmitted) {
      setMyOption(undefined);
    }
  }, [isSubmitted]);

  return (
    <div>
      <div
        onClick={() => setIsShow(!isShow)}
        className={cn(styles.select, error && styles.err)}
      >
        {myOption ? (
          <button
            value={myOption.value}
            onClick={() => deleteOpt(myOption.value)}
            type="button"
            style={{ color: `${myOption.color}` }}
            className={styles.btn}
          >
            {myOption.label}
          </button>
        ) : (
          <p className={styles.placeholder}>departament:</p>
        )}
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