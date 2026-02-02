"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import * as React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/* ---------- Types ---------- */

export type MultiSelectOption = {
  id: string;
  label: string;
};

type MultiSelectInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  options: MultiSelectOption[];
  disabled?: boolean;
};

/* ---------- Component ---------- */

export function MultiSelectInput<T extends FieldValues>({
  control,
  name,
  label,
  required,
  placeholder = "Select options",
  options,
  disabled = false,
}: MultiSelectInputProps<T>) {
  const [open, setOpen] = React.useState(false);

  const handeleClick = () => {
    alert("Clicked");
  };
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value: string[] = field.value || [];

        const toggleItem = (id: string) => {
          if (value.includes(id)) {
            field.onChange(value.filter((v) => v !== id));
          } else {
            field.onChange([...value, id]);
          }
        };

        const removeItem = (id: string) => {
          alert;
          field.onChange((field.value || []).filter((v: string) => v !== id));
        };

        return (
          <FormItem className="form-input-item">
            {label && (
              <FormLabel className="gap-1 text-base">
                {label}
                {required && <span className="text-destructive">*</span>}
              </FormLabel>
            )}

            <FormControl>
              <div className="space-y-2">
                {/* Combobox */}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      disabled={disabled}
                      aria-expanded={open}
                      className={cn(
                        "w-full justify-between text-left font-normal",
                        "text-muted-foreground! hover:text-muted-foreground! w-full justify-between border-[#D0D5DD] bg-white text-left font-normal hover:bg-transparent",
                        value.length === 0 && "text-muted-foreground",
                      )}
                    >
                      {value.length > 0
                        ? `${value.length} selected`
                        : placeholder}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search..." />
                      <CommandList>
                        <CommandEmpty>No data found.</CommandEmpty>
                        <CommandGroup>
                          {options.map((option) => (
                            <CommandItem
                              key={option.id}
                              onSelect={() => toggleItem(option.id)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value.includes(option.id)
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {option.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* Selected badges */}
                {value.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {value.map((id) => {
                      const item = options.find((o) => o.id === id);
                      if (!item) return null;

                      return (
                        <Badge
                          key={id}
                          className="border-dark-blue-200 bg-dark-blue-200/40 text-dark-blue-700 flex items-center gap-1 border px-3 py-1 text-xs"
                          onClick={() => removeItem(id)}
                        >
                          {item.label}
                          <X
                            className="block h-4 w-4 cursor-pointer"
                            // onClick={() => removeItem(id)}
                          />
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
