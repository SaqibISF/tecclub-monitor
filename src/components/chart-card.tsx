import React, { FC } from "react";
import { Card, CardBody, CardHeader, CardProps } from "@heroui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { cn } from "@/lib/utils";

export const ChartCard: FC<
  CardProps & {
    title: string;
    color?: "danger" | "success" | "primary" | "secondary";
    data?: { name: string; value: number }[];
  }
> = ({ id, title, color = "primary", data, className, ...props }) => {
  const colorMap = {
    danger: "hsl(var(--heroui-danger-500))",
    success: "hsl(var(--heroui-success-500))",
    primary: "hsl(var(--heroui-primary-500))",
    secondary: "hsl(var(--heroui-secondary-500))",
  };

  return (
    <Card
      className={cn("p-6 border border-divider shadow-xs", className)}
      {...props}
    >
      <CardHeader className="text-start">
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <CardBody className="pt-0 pb-4 px-2">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={colorMap[color]}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={colorMap[color]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--heroui-divider))"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--heroui-foreground-500))" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--heroui-foreground-500))" }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--heroui-content1))",
                borderColor: "hsl(var(--heroui-divider))",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{ color: "hsl(var(--heroui-foreground))" }}
              labelStyle={{ color: "hsl(var(--heroui-foreground-500))" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={colorMap[color]}
              fillOpacity={1}
              fill={`url(#${id})`}
              strokeWidth={2}
              activeDot={{
                r: 6,
                stroke: colorMap[color],
                strokeWidth: 2,
                fill: "hsl(var(--heroui-content1))",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};
