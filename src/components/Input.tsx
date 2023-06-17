"use client";

import { FC, useEffect, useMemo, useRef, useState } from "react";

const baseStyles = [
  "w-full",
  "h-14",
  "outline-none",
  "appearance-none",
  "bg-[rgba(255,255,255,0.05)]",
  "border",
  "border-solid",
  "border-[rgba(255,255,255,0.1)]",
  "focus:border-[rgba(92,100,255,0.5)]",
  "focus:shadow-[0px_3px_40px_rgba(92,100,255,0.1)]",
  "backdrop-blur-[6px]",
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
];

const placeholderStyles = [
  "absolute",
  "top-[18px]",
  "left-4",
  "text-white-100",
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
].join(" ");

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({
  placeholder,
  className,
  value,
  onChange,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    if (inputRef.current?.value.length || value) {
      setIsEntered(true);
    } else {
      setIsEntered(false);
    }
  }, [value]);

  const styles = useMemo(() => {
    const enteredStyles = isEntered ? ["entered"] : [];
    return [...baseStyles, ...enteredStyles];
  }, [isEntered]);

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
        className={`${styles.join(" ")} ${className ?? ""}`}
        type="text"
        onChange={handleInputChange}
        value={value}
        {...props}
      />
      {placeholder && <span className={placeholderStyles}>{placeholder}</span>}
    </div>
  );
};

export default Input;
