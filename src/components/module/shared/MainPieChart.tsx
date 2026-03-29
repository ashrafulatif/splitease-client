"use client"

import * as React from "react"
import { Pie, PieChart, Cell, Label } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  value: {
    label: "Total Records",
  },
  MEAL: {
    label: "Meal",
    color: "var(--chart-1)",
  },
  RENT: {
    label: "Rent",
    color: "var(--chart-2)",
  },
  GAS: {
    label: "Gas",
    color: "var(--chart-3)",
  },
  ELECTRICITY: {
    label: "Electricity",
    color: "var(--chart-4)",
  },
  INTERNET: {
    label: "Internet",
    color: "var(--chart-5)",
  },
  WATER: {
    label: "Water",
    color: "var(--chart-6)",
  },
  OTHER: {
    label: "Other",
    color: "var(--chart-7)",
  },
} satisfies ChartConfig

const COLORS = [
  "oklch(0.627 0.194 256.79)", // Vibrant Blue (Matching Image)
  "oklch(0.648 0.150 160.00)", // Vibrant Green (Primary)
  "oklch(0.769 0.188 70.00)",  // Vibrant Orange/Amber
  "oklch(0.621 0.020 256.34)", // Cool Gray
  "oklch(0.600 0.200 30.00)",  // Warm Rose
  "oklch(0.700 0.150 200.00)", // Cyan/Teal
  "oklch(0.500 0.100 280.00)", // Deep Indigo
]

export function MainPieChart({ 
    data, 
    title, 
    description 
}: { 
    data: { label: string; value: number }[];
    title: string;
    description?: string;
}) {
  const totalValue = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0)
  }, [data])

  const chartData = React.useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      fill: COLORS[index % COLORS.length],
      percentage: totalValue > 0 ? Math.round((item.value / totalValue) * 100) : 0
    }))
  }, [data, totalValue])

  return (
    <Card className="flex flex-col border border-border/50 shadow-none bg-white rounded-2xl h-full transition-all duration-300">
      <CardHeader className="items-start pb-4 pt-6 px-6">
        <CardTitle className="text-base font-bold tracking-tight text-foreground">{title}</CardTitle>
        {description && <CardDescription className="text-xs font-medium text-muted-foreground/60">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-8 pt-0 px-6">
        <div className="flex items-center gap-8 h-full">
            {/* Donut on the left */}
            <ChartContainer
                config={chartConfig}
                className="aspect-square w-[140px] max-h-[140px]"
            >
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="label"
                        innerRadius={45}
                        outerRadius={65}
                        strokeWidth={0}
                        paddingAngle={2}
                    >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} className="outline-none stroke-none" />
                    ))}
                    </Pie>
                </PieChart>
            </ChartContainer>

            {/* Custom Legend on the right */}
            <div className="flex flex-col gap-2.5 flex-1">
                {chartData.map((item, index) => (
                    <div key={item.label} className="flex items-center justify-between group">
                        <div className="flex items-center gap-2">
                            <div 
                                className="w-2 h-2 rounded-full" 
                                style={{ backgroundColor: item.fill }}
                            />
                            <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                                {chartConfig[item.label as keyof typeof chartConfig]?.label || item.label}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-muted-foreground/40">—</span>
                            <span className="text-xs font-black text-foreground tabular-nums">
                                {item.percentage}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  )
}




