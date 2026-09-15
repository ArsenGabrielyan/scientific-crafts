import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Card, CardHeader, CardAction, CardTitle, CardFooter, CardDescription } from "../ui/card";
import type { Template } from "@/lib/types";
import { absoluteCDN } from "@/lib/utils";
import Link from "next/link";
import { Calendar, Download } from "lucide-react";

interface TemplateCardProps{
     data: Template
}
export default function TemplateCard({data}: TemplateCardProps){
     return (
          <Card className="relative mx-auto w-full max-w-sm pt-0">
               <Image
                    src={absoluteCDN(data.thumbnail)}
                    alt={data.slug}
                    className="aspect-retro-vertical w-full object-cover brightness-95"
                    width={1280}
                    height={720}
               />
               <CardHeader>
                    <CardAction>
                         <Badge variant="secondary">{data.pages} էջ</Badge>
                    </CardAction>
                    <CardTitle>{data.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                         <Calendar className="size-4"/>
                         {data.date}
                    </CardDescription>
               </CardHeader>
               <CardFooter>
                    <Button className="w-full" asChild>
                         <Link href={absoluteCDN(data.file)} download={data.slug}>
                              <Download/>
                              Ներբեռնել
                         </Link>
                    </Button>
               </CardFooter>
          </Card>
     )
}