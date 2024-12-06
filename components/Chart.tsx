"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { calculatePercentage, convertFileSize } from "@/lib/utils";

const chartConfig = {
  size: {
    label: "Size",
  },
  used: {
    label: "Used",
    color: "white",
  },
} satisfies ChartConfig;

export const Chart = ({ used = 0 }: { used: number }) => {
  const chartData = [{ storage: "used", 10: used, fill: "white" }];

  return (
    <Card className="chart hover:shadow-xl transition-transform transition-shadow duration-300">
      <CardContent className="flex-1 p-0">
      <ChartContainer config={chartConfig} className="chart-container">
        <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={Number(calculatePercentage(used)) * 4 + 90}
        innerRadius={80}
        outerRadius={110}
        >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="polar-grid"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="storage" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                className="chart-total-percentage"
              >
                {used && calculatePercentage(used)
                ? calculatePercentage(used)
                  .toString()
                  .replace(/^0+/, "")
                : "0"}
                %
              </tspan>
              <tspan
                x={viewBox.cx}
                y={(viewBox.cy || 0) + 28}
                className="fill-white/70 text-[15px] mt-1"
              >
                Space used
              </tspan>
              </text>
            );
            }
          }}
          />
        </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
      </CardContent>
      <CardHeader className="chart-details">
      <div>
      <CardTitle className="chart-title">Used Storage</CardTitle>
      <CardDescription className="chart-description">
        {used ? convertFileSize(used) : "0 MB"} / 100MB
      </CardDescription>
      </div>
      <div className="xl-2xl:block hidden">
      <CardTitle className="chart-title">Available Storage</CardTitle>
      <CardDescription className="chart-description">
        {used ? convertFileSize(100 * 1024 * 1024 - used) : "100 MB"} / 100MB
      </CardDescription>
      </div>
      </CardHeader>
    </Card>
  );
};
