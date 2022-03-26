export default function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const formatISO = (date: Date) => {
  return date.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
