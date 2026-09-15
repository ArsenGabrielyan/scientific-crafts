import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Card, CardHeader, CardAction, CardTitle, CardDescription, CardFooter } from "../ui/card";
import type { ExperimentMetadata } from "@/lib/types/experiment";
import Link from "next/link";
import { EXPERIMENT_FILTER_NAMES } from "@/lib/constants/filters";

interface ExperimentCardProps{
     data: ExperimentMetadata
}
export default function ExperimentCard({data}: ExperimentCardProps){
     return (
          <Card className="relative mx-auto w-full max-w-sm pt-0">
               <Image
                    src={data.thumbnail}
                    alt={data.slug}
                    className="aspect-video w-full object-cover"
                    width={1280}
                    height={720}
               />
               <CardHeader>
                    <CardAction>
                         <Badge variant="secondary">{EXPERIMENT_FILTER_NAMES[data.categories[0]]}</Badge>
                    </CardAction>
                    <CardTitle>{data.title}</CardTitle>
                    <CardDescription className="line-clamp-4">{data.description}</CardDescription>
               </CardHeader>
               <CardFooter>
                    <Button className="w-full" asChild>
                         <Link href={`/experiments/${data.slug}`}>
                              Իմանալ Ավելին
                         </Link>
                    </Button>
               </CardFooter>
          </Card>
     )
}