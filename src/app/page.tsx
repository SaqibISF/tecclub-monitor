"use client";

import React, { FC, Suspense } from "react";
import { StatCard } from "@/components/stat-card";
import ServersTable from "@/components/servers-table";
import Section from "@/components/Section";
import useSWR from "swr";
import { notFound, useSearchParams } from "next/navigation";
import { fetcher } from "@/lib/utils";
import { Alert } from "@heroui/alert";

const HomePage: FC = () => {
  const searchParams = useSearchParams();
  const payload = searchParams.get("payload");

  if (!payload) {
    notFound();
  }

  const { data, error, isLoading } = useSWR<{
    success: boolean;
    message?: string;
    servers: Server[];
    stats: {
      total_servers: number;
      online_servers: number;
      offline_servers: number;
      average_health: number;
      total_bandwidth_usage: number;
      critical_servers: number;
    };
    timestamp: Date;
  }>(
    "/api/dashboard",
    (url) => fetcher(url, { headers: { Authorization: `Bearer ${payload}` } }),
    { keepPreviousData: true }
  );

  const loadingState =
    isLoading || data?.servers?.length === 0 ? "loading" : "idle";

  return (
    <Section
      heading="Dashboard"
      description="Welcome back! Here's an overview of your analytics"
    >
      {!data?.success && data?.message && (
        <Alert color="danger" classNames={{ title: "text-start" }}>
          {data?.message}
        </Alert>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            title: "Total Servers",
            value: data?.stats?.total_servers ?? "-",
            icon: "lucide:server",
            color: "primary",
          },
          {
            title: "Online Servers",
            value: data?.stats?.online_servers ?? "-",
            icon: "lucide:check-circle",
            color: "success",
          },
          {
            title: "Offline Servers",
            value: data?.stats?.offline_servers ?? "-",
            icon: "lucide:x-circle",
            color: "danger",
          },
          {
            title: "Critical Servers",
            value: data?.stats?.critical_servers ?? "-",
            icon: "lucide:alert-triangle",
            color: "warning",
          },
          {
            title: "Avg. Health",
            value: data?.stats?.average_health
              ? `${data.stats.average_health}%`
              : "-",
            icon: "lucide:heart-pulse",
            color: "secondary",
          },
          {
            title: "Bandwidth Usage",
            value: data?.stats?.total_bandwidth_usage
              ? `${data.stats.total_bandwidth_usage} MB`
              : "-",
            icon: "lucide:activity",
            color: "primary",
          },
        ].map(({ title, value, icon, color }, index) => (
          <StatCard
            key={index}
            title={title}
            value={value}
            icon={icon}
            isLoading={isLoading}
            color={
              color as
                | "primary"
                | "secondary"
                | "success"
                | "warning"
                | "danger"
            }
          />
        ))}
      </div>

      <ServersTable
        payload={payload}
        servers={data?.servers}
        loadingState={loadingState}
        errorMessage={error?.message}
      />
    </Section>
  );
};

const Page: FC = () => (
  <Suspense>
    <HomePage />
  </Suspense>
);

export default Page;
