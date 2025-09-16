"use client";

import React, { FC } from "react";
import Section from "@/components/Section";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { CircularProgress } from "@heroui/progress";
import { useParams } from "next/navigation";
import { ChartCard } from "./chart-card";

const ServerDetails: FC = () => {
  const { serverId } = useParams();

  return (
    <Section
      heading="Metrics & Monitoring"
      description="View real-time metrics and monitor your server's performance."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "CPU Usage", value: 23, color: "danger" },
          { title: "RAM Usage", value: 60, color: "success" },
          { title: "Disk Usage", value: 80, color: "primary" },
          { title: "Server Health", value: 99, color: "secondary" },
        ].map(({ title, value, color }, index) => (
          <Card key={index} className="p-4">
            <CardHeader className="text-lg font-semibold justify-center">
              {title}
            </CardHeader>
            <CardBody className="items-center">
              <CircularProgress
                aria-label={title}
                color={color as "default"}
                showValueLabel={true}
                value={value}
                classNames={{
                  svg: "size-40",
                  value: `text-${color} text-3xl font-medium`,
                }}
              />
            </CardBody>
            <CardFooter className="justify-center">{value}%</CardFooter>
          </Card>
        ))}
      </div>

      <ChartCard title="CPU Usage" className="mt-6" />
      <ChartCard title="RAM Usage" className="mt-6" />
      <ChartCard title="Disk Usage" className="mt-6" />
      <ChartCard title="Server Health" className="mt-6" />
    </Section>
  );
};

export default ServerDetails;
