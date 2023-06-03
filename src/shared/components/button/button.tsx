import { ButtonHTMLAttributes } from "react";

import { classnames as cn } from "../../utils";

import s from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const Button = ({ className, active, ...props }: ButtonProps) => (
  <button className={cn(className, s.button, active && s["active-button"])} {...props} />
);
