type ClassName = string | number | false | null | undefined;

export const classnames = (...classes: ClassName[]) => classes.filter(Boolean).join(" ");
