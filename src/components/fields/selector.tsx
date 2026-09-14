import { Noop } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SelectType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SelectorFieldProps{
     onChange?: (value: string | null) => void;
     onBlur?: Noop;
     value?: string;
     disabled?: boolean;
     name?: string;
     invalid?: boolean,
     items: SelectType[],
     placeholder?: string | number,
     className?: string,
     side?: "top" | "left" | "bottom" | "right"
}
export default function SelectorField({name, value, onChange, invalid, disabled, onBlur, items, placeholder="Select", className, side}: SelectorFieldProps){
     return (
          <Select
               name={name}
               value={value}
               onValueChange={onChange}
               disabled={disabled}
          >
               <SelectTrigger
                    id={name}
                    name={name}
                    aria-invalid={invalid}
                    className={cn("min-w-30 flex-1",className)}
                    onBlur={onBlur}
               >
                    <SelectValue placeholder={placeholder} />
               </SelectTrigger>
               <SelectContent side={side}>
                    {items.map(item => (
                         <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
                              {item.Icon && <item.Icon/>}
                              {item.label}
                         </SelectItem>
                    ))}
               </SelectContent>
          </Select>
     )
}