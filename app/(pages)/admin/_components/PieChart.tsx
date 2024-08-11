"use client";

import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  students: {
    label: "Students",
  },
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
  active: {
    label: "Active",
    color: "hsl(var(--chart-2))",
  },
  offline: {
    label: "Offline",
    color: "hsl(var(--chart-3))",
  },
  banned: {
    label: "Banned",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function PieChartComponent({
  active,
  banned,
  total,
  offline,
}: {
  active: number;
  banned: number;
  total: number;
  offline: number;
}) {
  const chartData = [
    { student: "Total", students: total, fill: "var(--color-total)" },
    { student: "Active", students: active, fill: "var(--color-active)" },
    { student: "Banned", students: banned, fill: "var(--color-banned)" },
    { student: "Offline", students: offline, fill: "var(--color-offline)" },
  ];

  return (
    <Card className="flex flex-col w-full min-h-[200px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Students</CardTitle>
        {/* <CardDescription>Active and Ban</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="students"
              nameKey="student"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Students
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total student activities.
        </div>
      </CardFooter>
    </Card>
  );
}
