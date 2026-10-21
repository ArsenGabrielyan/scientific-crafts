import { Search, X } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "../ui/input-group";
import { cn } from "cn";

export default function SearchField({groupClassName, onClearSearch, excludeClearButton=false, ...props}: React.ComponentProps<"input"> & {
     groupClassName?: string
     onClearSearch?: () => void,
     excludeClearButton?: boolean
}){
     return (
          <InputGroup className={cn(groupClassName)} aria-invalid={props["aria-invalid"]}>
               <InputGroupInput
                    {...props}
                    aria-invalid={props["aria-invalid"]}
               />
               <InputGroupAddon>
                    <Search/>
               </InputGroupAddon>
               {!excludeClearButton && (typeof props.value === "string" && props.value?.trim()!=="") && (
                    <InputGroupAddon align="inline-end">
                         <InputGroupButton size="icon-xs" onClick={onClearSearch}>
                              <X/>
                         </InputGroupButton>
                    </InputGroupAddon>
               )}
          </InputGroup>
     )
}