import { ButtonHTMLAttributes } from 'react';

import { classnames as cn } from '../../utils';

import s from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ className, ...props }: ButtonProps) => (
  <button className={cn(className, s.button)} {...props} />
);
