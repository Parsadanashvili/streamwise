"use client";

import useStyles from "@/hooks/useStyles";
import { FC, useEffect, useRef, useState } from "react";

const styles = {
  input: {
    base: [
      "w-full",
      "h-14",
      "outline-none",
      "appearance-none",
      "backdrop-blur-[6px]",
      "border",
      "border-solid",
      "rounded-2xl",
      "text-white-400",
      "text-base",
      "font-normal",
      "leading-5",
      "px-4",
      "pt-[26px]",
      "pb-[10px]",
      "transition-all",
      "duration-200",
      "in-out-input",
      "peer",
    ],

    color: {
      default: [
        "border-[rgba(255,255,255,0.1)]",
        "bg-[rgba(255,255,255,0.05)]",
        "focus:border-[rgba(92,100,255,0.5)]",
        "focus:shadow-[0px_3px_40px_rgba(92,100,255,0.1)]",
      ],

      success: [
        "shadow-none",
        "bg-input-success",
        "border-[rgba(41,255,110,0.6)]",
        "focus:border-[rgba(41,255,110,0.6)]",
      ],

      error: [
        "shadow-none",
        "bg-input-error",
        "border-[rgba(255,77,73,0.6)]",
        "focus:border-[rgba(255,77,73,0.6)]",
      ],
    },
  },

  placeholder: {
    base: [
      "absolute",
      "top-[18px]",
      "left-4",
      "text-base",
      "leading-5",
      "font-light",
      "peer-focus:top-[10px]",
      "peer-focus:text-xs",
      "peer-focus:leading-[14px]",
      "peer-[.entered]:top-[10px]",
      "peer-[.entered]:text-xs",
      "peer-[.entered]:leading-[14px]",
      "transition-all",
      "duration-200",
      "in-out-input",
      "pointer-events-none",
    ],

    color: {
      default: ["text-white-100"],

      success: ["text-success"],

      error: ["text-error"],
    },
  },
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: "success" | "error";
}

const Input: FC<InputProps> = ({
  placeholder,
  className,
  value,
  color,
  onChange,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEntered, setIsEntered] = useState(false);

  const { input: inputStyles, placeholder: placeholderStyles } = useStyles({
    props: {
      color,
    },
    styles: styles as any,
  });

  useEffect(() => {
    if (inputRef.current?.value.length || value) {
      setIsEntered(true);
    } else {
      setIsEntered(false);
    }
  }, [value]);

  useEffect(() => {
    if (isEntered || value) {
      inputRef.current?.classList.add("entered");
    } else {
      inputRef.current?.classList.remove("entered");
    }
  }, [value, isEntered]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      setIsEntered(true);
    } else {
      setIsEntered(false);
    }

    onChange?.(event);
  };

  return (
    <div className="relative m-0 border-none w-full h-14">
      <input
        ref={inputRef}
        className={`${inputStyles.join(" ")} ${className ?? ""}`}
        type="text"
        onChange={handleInputChange}
        value={value}
        {...props}
      />
      {placeholder && (
        <span className={placeholderStyles.join(" ")}>{placeholder}</span>
      )}
    </div>
  );
};

export default Input;
