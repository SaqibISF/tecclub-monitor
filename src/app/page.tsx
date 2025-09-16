import React from "react";
import { StatCard } from "@/components/stat-card";
import ServersTable from "@/components/servers-table";
import Section from "@/components/Section";

export default function App() {
  return (
    <Section
      heading="Dashboard"
      description="Welcome back! Here's an overview of your analytics"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Users"
          value="2,543"
          change="+12.5%"
          changeType="positive"
          icon="lucide:users"
          color="primary"
        />
        <StatCard
          title="Revenue"
          value="$45,231"
          change="+8.2%"
          changeType="positive"
          icon="lucide:dollar-sign"
          color="success"
        />
        <StatCard
          title="Active Sessions"
          value="1,324"
          change="-3.1%"
          changeType="negative"
          icon="lucide:activity"
          color="warning"
        />
        <StatCard
          title="Conversion Rate"
          value="24.5%"
          change="+2.3%"
          changeType="positive"
          icon="lucide:percent"
          color="secondary"
        />
      </div>

      <ServersTable />
    </Section>
  );
}
