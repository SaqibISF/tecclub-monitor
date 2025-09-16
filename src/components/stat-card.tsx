"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: string;
  color: "primary" | "secondary" | "success" | "warning" | "danger";
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  color,
}) => {
  const getChangeColor = () => {
    if (changeType === "positive") return "text-success";
    if (changeType === "negative") return "text-danger";
    return "text-foreground-500";
  };

  const getChangeIcon = () => {
    if (changeType === "positive") return "lucide:trending-up";
    if (changeType === "negative") return "lucide:trending-down";
    return "lucide:minus";
  };

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
      <CardBody>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-foreground-500">{title}</p>
            <h3 className="text-2xl font-semibold mt-1 text-foreground">
              {value}
            </h3>
            <div className="flex items-center mt-2">
              <Icon
                icon={getChangeIcon()}
                className={`${getChangeColor()} mr-1`}
                width={16}
              />
              <span className={`text-xs font-medium ${getChangeColor()}`}>
                {change} from last month
              </span>
            </div>
          </div>
          <div className={`p-2 rounded-medium ${getIconBgColor()}`}>
            <Icon icon={icon} width={20} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
