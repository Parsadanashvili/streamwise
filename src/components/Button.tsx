import { ButtonHTMLAttributes, ElementType, FC, ReactNode } from "react";

const baseStyles = [
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
    ...baseStyles,
    "bg-primary",
    "hover:shadow-[0px_1px_40px_rgba(92,100,255,0.3)]",
    "transition-shadow",
  ].join(" "),
  outline: [
    ...baseStyles,
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
  startIcon?: ElementType;
  endIcon?: ElementType;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  startIcon,
  endIcon,
  variant = "fill",
  ...props
}) => {
  if (!variant) {
    variant = "fill";
  }

  const StartIcon = startIcon;
  const EndIcon = endIcon;

  return (
    <button
      className={`${buttonStyles[variant]} ${className ?? ""}`}
      {...props}
    >
      {StartIcon && (
        <div className="flex items-center">
          {<StartIcon className={"w-[18px] h-[18px]"} />}
        </div>
      )}
      <div className={childrenStyles[variant]}>{children}</div>
      {EndIcon && (
        <div className="flex items-center">
          {<EndIcon className={"w-[18px] h-[18px]"} />}
        </div>
      )}
    </button>
  );
};

export default Button;
