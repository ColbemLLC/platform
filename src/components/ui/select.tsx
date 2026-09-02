"use client";

import * as React from "react";
import { Select as BaseSelect } from "@base-ui-components/react/select";
import { CaretDown, Check } from "@phosphor-icons/react/dist/ssr";

function Select(props: React.ComponentProps<typeof BaseSelect.Root>) {
  return <BaseSelect.Root {...props} />;
}

function SelectTrigger({
  className = "",
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.Trigger>) {
  return (
    <BaseSelect.Trigger
      className={`flex w-full items-center justify-between rounded-[15px] border border-border bg-muted/20 px-3 py-2 text-sm text-foreground outline-none focus:border-primary data-[popup-open]:border-primary ${className}`}
      {...props}
    >
      {children}
      <BaseSelect.Icon>
        <CaretDown className="h-4 w-4 text-muted-foreground" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

function SelectValue(props: React.ComponentProps<typeof BaseSelect.Value>) {
  return <BaseSelect.Value {...props} />;
}

function SelectContent({
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.Popup>) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner sideOffset={6}>
        <BaseSelect.Popup
          className="min-w-[var(--anchor-width)] overflow-hidden rounded-[15px] border border-border bg-popover p-1 text-foreground shadow-lg"
          {...props}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

function SelectItem({
  children,
  className = "",
  ...props
}: React.ComponentProps<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      className={`flex cursor-pointer items-center justify-between rounded-[10px] px-3 py-2 text-sm text-foreground outline-none data-[highlighted]:bg-muted ${className}`}
      {...props}
    >
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator>
        <Check className="h-4 w-4 text-primary" />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };