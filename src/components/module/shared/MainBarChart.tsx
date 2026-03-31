"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function MainBarChart({ 
    data, 
    title, 
    description 
}: { 
    data: { label: string; value: number }[];
    title: string;
    description?: string;
}) {
  const maxValue = React.useMemo(() => {
    return Math.max(...data.map(item => item.value), 1)
  }, [data])

  return (
    <Card className="flex flex-col border border-border/50 shadow-none bg-muted/50 rounded-2xl h-full transition-all duration-300">
      <CardHeader className="items-start pb-4 pt-6 px-6">
        <CardTitle className="text-base font-bold tracking-tight text-foreground">{title}</CardTitle>
        {description && <CardDescription className="text-xs font-medium text-muted-foreground/60">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-8 pt-0 px-6">
        <div className="flex flex-col gap-4">
          {data.map((item, index) => (
            <div key={item.label} className="flex items-center gap-4 group">
              {/* Month Label */}
              <span className="text-xs font-bold text-muted-foreground w-8 shrink-0 group-hover:text-foreground transition-colors">
                {item.label}
              </span>

              {/* Progress Bar Container */}
              <div className="relative flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                 <div 
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
                    style={{ 
                        width: `${(item.value / maxValue) * 100}%`,
                        backgroundColor: "var(--primary)" 
                    }}
                 />
              </div>

              {/* Value Label */}
              <span className="text-xs font-black text-foreground w-6 text-right tabular-nums">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
