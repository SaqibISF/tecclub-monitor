"use client";

import React, { FC, Suspense, useState } from "react";
import Section from "@/components/Section";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { CircularProgress } from "@heroui/progress";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { ChartCard } from "@/components/chart-card";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { Alert } from "@heroui/alert";
import { Key } from "@react-types/shared";

const ServerDetails: FC = () => {
  const searchParams = useSearchParams();
  const payload = searchParams.get("payload");
  const { serverId } = useParams();

  const [range, setRange] = useState<Key>("live");

  if (!payload || isNaN(Number(serverId))) {
    notFound();
  }

  const { data: usage } = useSWR<{
    success: boolean;
    message?: string;
    server: { id: number; name: string; ip_address: string; domain: string };
    timestamp: Date;
    is_online: boolean;
    health_score: number;
    cpu_usage: number;
    ram_usage: number;
    disk_usage: number;
    download_rate: number;
    upload_rate: number;
    response_time: number | null;
    last_updated: Date;
  }>(
    `/api/live-server-metric/${serverId}`,
    (url) =>
      fetcher(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${payload}`,
        },
      }),
    { keepPreviousData: true }
  );

  const { data } = useSWR<{
    success: boolean;
    message?: string;
    server: { id: number; name: string; ip_address: string; domain: string };
    time_range: string;
    metrics: {
      hour_start: Date;
      health_score: number;
      cpu_usage: number;
      ram_usage: number;
      disk_usage: number;
      bandwidth_usage: number;
      response_time: number;
      download_rate_kbit: number;
      upload_rate_kbit: number;
      total_mbit_per_s: number;
      uptime_percentage: number;
      time_group: string;
    }[];
    uptime_stats: {
      uptime_percentage: number;
      total_checks: number;
      online_checks: number;
      avg_response_time: number;
      min_response_time: number;
      max_response_time: number;
    };
    incidents: [
      {
        type: string;
        severity: string;
        max_response_time: number;
        message: string;
        timestamp: Date;
      }
    ];
    data_points: number;
    data_source: {
      type: string;
      description: string;
      granularity: string;
      retention: string;
    };
    timestamp: Date;
  }>(
    `/api/server-metric/${serverId}?range=${range}`,
    (url) =>
      fetcher(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${payload}`,
        },
      }),
    { keepPreviousData: true }
  );

  return (
    <Section
      heading="Metrics & Monitoring"
      description="View real-time metrics and monitor your server's performance."
    >
      {!data?.success && data?.message && (
        <Alert color="danger" classNames={{ title: "text-start" }}>
          {data?.message}
        </Alert>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "CPU Usage",
            value: usage?.cpu_usage ?? 0,
            color: "danger",
          },
          {
            title: "RAM Usage",
            value: usage?.ram_usage ?? 0,
            color: "success",
          },
          {
            title: "Disk Usage",
            value: usage?.disk_usage ?? 0,
            color: "primary",
          },
          {
            title: "Server Health",
            value: usage?.health_score ?? 0,
            color: "secondary",
          },
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

      {[
        {
          id: "cpu-usage",
          title: "CPU Usage",
          color: "danger",
          data: data?.metrics?.map((metric) => ({
            name: metric.time_group,
            value: metric.cpu_usage,
          })),
        },
        {
          id: "ram-usage",
          title: "RAM Usage",
          color: "success",
          data: data?.metrics?.map((metric) => ({
            name: metric.time_group,
            value: metric.ram_usage,
          })),
        },
        {
          id: "disk-usage",
          title: "Disk Usage",
          color: "primary",
          data: data?.metrics?.map((metric) => ({
            name: metric.time_group,
            value: metric.disk_usage,
          })),
        },
        {
          id: "server-health",
          title: "Server Health",
          color: "secondary",
          data: data?.metrics?.map((metric) => ({
            name: metric.time_group,
            value: metric.health_score,
          })),
        },
        {
          id: "bandwidth-usage",
          title: "Bandwidth Usage",
          color: "warning",
          data: data?.metrics?.map((metric) => ({
            name: metric.time_group,
            value: metric.bandwidth_usage,
          })),
        },
        {
          id: "response-time",
          title: "Response Time",
          color: "success",
          data: data?.metrics?.map((metric) => ({
            name: metric.time_group,
            value: metric.response_time,
          })),
          domain: [0, 999],
          unit: ""
        },
        {
          id: "total-mbit-per-s",
          title: "Speed mb/s",
          color: "danger",
          data: data?.metrics?.map((metric) => ({
            name: metric.time_group,
            value: metric.total_mbit_per_s,
          })),
          domain: [0, 10000],
          unit: ""
        },
      ].map(({ id, title, color, data, domain, unit }) => (
        <ChartCard
          key={id}
          id={id}
          title={title}
          color={color as "primary"}
          data={data}
          domain={domain}
          unit={unit}
          className="mt-6"
          range={range}
          setRange={setRange}
        />
      ))}
    </Section>
  );
};

const Page: FC = () => (
  <Suspense>
    <ServerDetails />
  </Suspense>
);

export default Page;
