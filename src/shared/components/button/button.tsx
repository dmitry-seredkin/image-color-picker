import { ButtonHTMLAttributes } from 'react';

import s from "./button.module.css";

type ClassName = string | number | false | null | undefined;

const cn = (...classes: ClassName[]) => classes.filter(Boolean).join(" ");

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ className, ...props }: ButtonProps) => (
  <button className={cn(className, s.button)} {...props} />
);
