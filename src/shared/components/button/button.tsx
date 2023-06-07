import { ButtonHTMLAttributes } from "react";

import { classnames as cn } from "shared/utils";

import s from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const Button = ({ active, className, children, ...props }: ButtonProps) => (
  <button className={cn(className, s.button, active && s["active-button"])} {...props}>
    {children}
  </button>
);
