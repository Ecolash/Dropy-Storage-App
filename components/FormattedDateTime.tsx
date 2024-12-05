import React from "react";
import { cn, formatDateTime } from "@/lib/utils";

export const FormattedDateTime = ({
  date,
  className,
}: {
  date: string;
  className?: string;
}) => {
  return (
    <p className={cn("text-[15px] text-light-200", className)}>
      {formatDateTime(date)}
    </p>
  );
};
export default FormattedDateTime;
