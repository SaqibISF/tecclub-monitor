"use client";

import React, { FC, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  CardProps,
} from "@heroui/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Key } from "@react-types/shared";
import { cn } from "@/lib/utils";

const monthlyData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
  { name: "Aug", value: 4000 },
  { name: "Sep", value: 2300 },
  { name: "Oct", value: 2500 },
  { name: "Nov", value: 3100 },
  { name: "Dec", value: 3500 },
];

const weeklyData = [
  { name: "Mon", value: 900 },
  { name: "Tue", value: 1200 },
  { name: "Wed", value: 1500 },
  { name: "Thu", value: 1300 },
  { name: "Fri", value: 1400 },
  { name: "Sat", value: 1100 },
  { name: "Sun", value: 800 },
];

const dailyData = [
  { name: "12am", value: 300 },
  { name: "4am", value: 200 },
  { name: "8am", value: 400 },
  { name: "12pm", value: 800 },
  { name: "4pm", value: 700 },
  { name: "8pm", value: 600 },
  { name: "12am", value: 400 },
];

export const ChartCard: FC<CardProps & {title: string;}> = ({ title, className, ...props }) => {
  const [selected, setSelected] = useState<Key>("monthly");

  const getChartData = () => {
    switch (selected) {
      case "weekly":
        return weeklyData;
      case "daily":
        return dailyData;
      default:
        return monthlyData;
    }
  };

  const formatYAxis = (value: number): string => {
    if (value >= 1000) {
      return `${value / 1000}k`;
    }
    return String(value);
  };

  return (
    <Card
      className={cn("border border-divider shadow-xs", className)}
      {...props}
    >
      <CardHeader className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Tabs
            selectedKey={selected}
            onSelectionChange={setSelected}
            size="sm"
            variant="light"
            color="primary"
            radius="full"
            classNames={{
              base: "mt-0",
              tabList: "gap-2",
              tab: "px-3 py-1",
            }}
          >
            <Tab key="daily" title="Daily" />
            <Tab key="weekly" title="Weekly" />
            <Tab key="monthly" title="Monthly" />
          </Tabs>
        </div>
      </CardHeader>
      <CardBody className="pt-0 pb-4 px-2">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={getChartData()}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--heroui-primary-500))"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--heroui-primary-500))"
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
              tickFormatter={formatYAxis}
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
              stroke="hsl(var(--heroui-primary-500))"
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={2}
              activeDot={{
                r: 6,
                stroke: "hsl(var(--heroui-primary-500))",
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
