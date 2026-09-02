"use client";

import * as React from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

function Select({ className = "", children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={`w-full appearance-none rounded-[15px] border border-border bg-muted/20 px-3 py-2 pr-9 text-sm text-foreground outline-none focus:border-primary ${className}`}
        {...props}
      >
        {children}
      </select>
      <CaretDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

export { Select };