import { AnchorHTMLAttributes } from "react";

import { classnames as cn } from "../../utils";

import s from "./link.module.css";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = ({ className, ...props }: LinkProps) => <a className={cn(className, s.link)} {...props} />;
