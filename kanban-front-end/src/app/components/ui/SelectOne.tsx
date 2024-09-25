import React from "react";
import chroma from "chroma-js";

import { IOption, options } from "./Select";
import Select, { StylesConfig } from "react-select";

export const getValue = (value: string | undefined) =>
  value ? options.find((option) => option.value === value) : "";

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

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
  input: (styles) => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

export function OneSelect({ value, onChange, error }: any) {
  return (
    <Select
      // defaultValue={colourOptions[2]}
      placeholder="Категория:"
      options={options}
      styles={colourStyles}
      value={getValue(value)}
      onChange={(newValue) => onChange((newValue as IOption).value)}
      hasError={!!error}
    />
  );
}
