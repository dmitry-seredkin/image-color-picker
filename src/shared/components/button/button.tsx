import { ButtonHTMLAttributes } from "react";

import { classnames as cn } from "../../utils";

import s from "./button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, ...props }: ButtonProps) => (
  <button className={cn(className, s.button)} {...props} />
);
