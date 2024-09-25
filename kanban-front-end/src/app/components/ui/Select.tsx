"use client";
import React from "react";
import chroma from "chroma-js";
import Select, { StylesConfig } from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export const options: IOption[] = [
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

export interface IOption {
  value: string;
  label: string;
  color: string;
}

export const getValue = (value: string[] | undefined) =>
  value ? options.find((option) => option.value === value) : "";

const colourStyles: StylesConfig<IOption, true> = {
  control: (styles, { selectProps }) => {
    const borderColor = selectProps?.hasError
      ? "1px solid red"
      : "1px solid #e5e7eb";

    return {
      ...styles,
      backgroundColor: "white",
      borderRadius: "0.5rem",
      border: borderColor,
      height: "41.6px",
      boxShadow: "none",
      "&:hover": {
        border: borderColor,
      },
      "&:focus": {
        border: borderColor,
        outline: "none",
      },
    };
  },
  placeholder: (styles, { selectProps }) => {
    const color = selectProps?.hasError ? "rgb(220 38 38)" : "rgb(0 0 0 / 0.3)";
    return {
      ...styles,
      color,
      fontFamily: "inherit",
      fontSize: "inherit",
      fontWeight: "inherit",
    };
  },
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
      cursor: isDisabled ? "not-allowed" : "default",
      // borderRadius: "8px",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};

export function MySelect({ value, onChange, error }: any) {
  return (
    <Select
      placeholder="Категории:"
      options={options}
      isMulti
      styles={colourStyles}
      components={animatedComponents}
      value={getValue(value)}
      // onChange={(newValue) => onChange((newValue as IOption).value)}
      onChange={(selectedOptions) =>
        onChange(selectedOptions.map((option) => option.value))
      }
      hasError={!!error}
    />
  );
}
