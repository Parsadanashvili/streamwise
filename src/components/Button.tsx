import { ButtonHTMLAttributes, FC, ReactNode } from "react";

const defaultStyles = [
  "box-border",
  "flex",
  "items-center",
  "justify-center",
  "py-3",
  "px-6",
  "gap-3",
  "text-base",
  "font-normal",
  "leading-[18px]",
  "case-on",
  "rounded-full",
  "duration-[120ms]",
];

const buttonStyles = {
  fill: [
    ...defaultStyles,
    "bg-primary",
    "hover:shadow-[0px_1px_40px_rgba(92,100,255,0.3)]",
    "transition-shadow",
  ].join(" "),
  outline: [
    ...defaultStyles,
    "py-[11px]",
    "bg-[rgba(255,255,255,0.05)]",
    "border",
    "border-[rgba(255,255,255,0.1)]",
    "backdrop-blur-[6px]",
    "hover:bg-white-100",
    "hover:border-[rgba(255,255,255,0.15)]",
    "transition-colors",
  ].join(" "),
};

const childrenStyles = {
  fill: [
    "text-white",
    "hover:drop-shadow-[0px_3px_12px_rgba(12,12,12,0.2)]",
    "transition-shadow",
    "duration-[120ms]",
  ].join(" "),
  outline: ["text-white-400"].join(" "),
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonStyles;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, variant = "fill", ...props }) => {
  if (!variant) {
    variant = "fill";
  }

  return (
    <button className={buttonStyles[variant]} {...props}>
      <div className={childrenStyles[variant]}>{children}</div>
    </button>
  );
};

export default Button;