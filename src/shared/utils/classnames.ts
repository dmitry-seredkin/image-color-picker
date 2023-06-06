type ClassName = string | number | false | null | undefined;

export const classnames = (...classes: ClassName[]): string => classes.filter(Boolean).join(" ");
