"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Skill = {
  id: string;
  skillName: string;
};

type Props = {
  skills: Skill[];
  value: string[]; // selected skill ids
  onChange: (value: string[]) => void;
};

export function MultiSelectInputOld({ skills, value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);

  const toggleSkill = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const removeSkill = (id: string) => {
    onChange(value.filter((v) => v !== id));
  };

  return (
    <div className="space-y-2">
      {/* Combobox */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="text-muted-foreground! hover:text-muted-foreground! w-full justify-between border-[#D0D5DD] bg-white text-left font-normal hover:bg-transparent"
          >
            {value.length > 0
              ? `${value.length} skill(s) selected`
              : "Select skills"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search skills..." />
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              {skills.map((skill) => (
                <CommandItem
                  key={skill.id}
                  onSelect={() => toggleSkill(skill.id)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(skill.id) ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {skill.skillName}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected skills */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((id) => {
            const skill = skills.find((s) => s.id === id);
            if (!skill) return null;

            return (
              <Badge
                key={id}
                className="bg-dark-blue-200/40 text-dark-blue-700 border-dark-blue-200 flex items-center gap-1 border px-4 py-1 text-xs font-medium"
              >
                {skill.skillName}
                <X
                  className="relative top-0.5 h-4 w-4 cursor-pointer"
                  onClick={() => removeSkill(id)}
                />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
