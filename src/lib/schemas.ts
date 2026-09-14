import * as z from "zod"

export const SearchSchema = z.object({
     query: z.string().min(2,"Հարցումը շատ կարճ է").max(200,"Հարցումը շատ երկար է").trim()
})