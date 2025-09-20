"use client";

import React, { FC } from "react";
import { Card, CardBody, Skeleton } from "@heroui/react";
import { Icon, IconifyIcon } from "@iconify/react";

type StatCardProps = {
  title: string;
  value: number | string;
  icon: IconifyIcon | string;
  color: "primary" | "secondary" | "success" | "warning" | "danger";
  isLoading?: boolean;
};

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  isLoading,
}) => {
  const getIconBgColor = () => {
    const colorMap = {
      primary: "bg-primary-100 text-primary-500",
      secondary: "bg-secondary-100 text-secondary-500",
      success: "bg-success-100 text-success-500",
      warning: "bg-warning-100 text-warning-500",
      danger: "bg-danger-100 text-danger-500",
    };

    return colorMap[color] || colorMap.primary;
  };

  return (
    <Card className="border border-divider shadow-xs">
      <CardBody className={isLoading ? "animate-pulse" : ""}>
        {isLoading ? (
          <div className="flex items-start justify-between">
            <div className="w-full">
              <Skeleton className="h-4 w-1/3 rounded mb-2" />
              <Skeleton className="h-8 w-1/2 rounded mb-2" />
            </div>
            <Skeleton className="p-2 size-9 rounded-medium" />
          </div>
        ) : (
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-foreground-500">{title}</p>
              <h3 className="text-2xl font-semibold mt-1 text-foreground">
                {value}
              </h3>
            </div>
            <div className={`p-2 rounded-medium ${getIconBgColor()}`}>
              <Icon icon={icon} width={20} />
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
