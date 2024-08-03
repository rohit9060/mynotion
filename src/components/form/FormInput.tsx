"use client";
import React, { useState, forwardRef } from "react";
import { Control, useController } from "react-hook-form";
import { Description, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface FormInputProps {
  name: string;
  control: Control<any>;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, control, label, type = "text", placeholder, icon }, ref) => {
    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="w-full px-4 my-3">
        <Field>
          <Label className="text-sm/6 font-medium text-white" htmlFor={name}>
            {label}
          </Label>
          <Description className="text-sm/6 text-red-500">
            {error && error.message}
          </Description>
          <div className="relative">
            <Input
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-white/5 py-2 pl-10 pr-4 text-sm/6 text-white ",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 "
              )}
              {...field}
              id={name}
              type={inputType}
              placeholder={placeholder}
              ref={ref}
            />
            {icon && (
              <div className="absolute start-2 top-2 m-auto w-5 h-5 text-black">
                {icon}
              </div>
            )}

            {type === "password" && (
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-black"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </div>
            )}
          </div>
        </Field>
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
