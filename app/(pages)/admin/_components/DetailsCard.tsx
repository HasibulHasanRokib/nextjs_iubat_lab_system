import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import prisma from "@/lib/db";

export default function DetailsCard() {
  const total = prisma.student.count();

  const activeNow = prisma.student.count({
    where: { isLoggedIn: true },
  });

  const offline = prisma.student.count({
    where: { isLoggedIn: false, isBanned: false },
  });

  const banned = prisma.student.count({
    where: { isBanned: true },
  });

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Student details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="border rounded-md p-2 bg-slate-50 flex justify-between items-center">
          <p className="font-semibold ">Total students</p>
          <Badge className="bg-[hsl(var(--chart-1))]">{total}</Badge>
        </div>
        <div className="border rounded-md p-2 bg-slate-50 flex justify-between items-center">
          <p className="font-semibold  ">Active now</p>
          <Badge className="bg-[hsl(var(--chart-2))]">{activeNow}</Badge>
        </div>
        <div className="border rounded-md p-2 bg-slate-50 flex justify-between items-center">
          <p className="font-semibold">Banned students</p>
          <Badge className="bg-[hsl(var(--chart-4))]">{banned}</Badge>
        </div>
        <div className="border rounded-md p-2 bg-slate-50 flex justify-between items-center">
          <p className="font-semibold">Offline students</p>
          <Badge className="bg-[hsl(var(--chart-3))]">{offline}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
