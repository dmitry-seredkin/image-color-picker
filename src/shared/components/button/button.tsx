import { ButtonHTMLAttributes } from 'react';

import { classnames } from '../../utils';

import s from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ className, ...props }: ButtonProps) => (
  <button className={classnames(className, s.button)} {...props} />
);
