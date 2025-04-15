"use client";

import { useEffect, useRef, useState } from "react";
import { Label, Pie, PieChart } from "recharts";

import { budgets } from "@/app/_lib/supabase/server";
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
import { TrendingUp } from "lucide-react";

type ChartsProps = {
  budgets: budgets[];
  chartData: {
    category: string | null;
    spent: number;
    fill: string | undefined;
  }[];
  chartConfig: ChartConfig;
};

export function ChartsSummary({
  budgets,
  chartData,
  chartConfig,
}: ChartsProps) {
  const labelRef = useRef<SVGTextElement>(null);
  const [innerRadius, setInnerRadius] = useState(72);

  const totalMaxSpeding = budgets?.reduce(
    (acc, cur) => (cur?.maxSpending ? acc + cur?.maxSpending : acc),
    0,
  );

  const totalSpentForAllBudgets = chartData?.reduce(
    (acc, cur) => acc + cur.spent,
    0,
  );

  // for expanding the inner radius as the label increases
  useEffect(() => {
    if (labelRef.current) {
      // Get the bounding box of the label
      const bbox = labelRef.current.getBBox();

      // Calculate the diagonal of the bounding box and add some padding
      const dynamicInnerRadius = Math.max(
        72, // Minimum inner radius
        Math.ceil(Math.sqrt(bbox.width ** 2 + bbox.height ** 2) / 2) + 20,
      );

      setInnerRadius(dynamicInnerRadius);
    }
  }, [totalSpentForAllBudgets, totalMaxSpeding]);

  return (
    <Card className="flex h-fit flex-col">
      <CardHeader className="hidden items-center pb-0">
        <CardTitle>Pie Chart - Donut with Dynamic Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="-my-8 min-h-fit flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="border-green mx-auto aspect-square h-[293px] max-h-fit w-[293px]"
        >
          <PieChart className="border-amber-600" width={293} height={293}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className="bg-white" />}
            />
            <Pie
              data={chartData}
              dataKey="spent"
              nameKey="category"
              innerRadius={innerRadius}
              strokeWidth={5}
              className="border-blue border"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        ref={labelRef}
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="space-y-3"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-preset-1 text-grey-900"
                        >
                          ${totalSpentForAllBudgets}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="text-preset-5 text-grey-500"
                        >
                          of ${totalMaxSpeding} limit
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
      <CardFooter className="hidden flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
