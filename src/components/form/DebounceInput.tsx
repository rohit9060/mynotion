"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import debounce from "lodash.debounce";

interface DebouncedInputProps {
  value: string;
  onChange: (value: string) => void;
  delay?: number;
  placeholder?: string;
}

export const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value,
  onChange,
  delay = 300,
  placeholder = "Search...",
}) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedOnChange = useRef(
    debounce((value: string) => onChange(value), delay)
  ).current;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncedOnChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholder}
      className="mt-3 block w-full rounded-lg border-none bg-white/5 py-2 px-2 text-sm/6 text-white "
    />
  );
};
