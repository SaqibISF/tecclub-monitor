"use client";

import React, { FC, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  getKeyValue,
  Pagination,
  Spinner,
} from "@heroui/react";
import Link from "next/link";

import useSWR from "swr";

const servers1: Server[] = [
  {
    id: "1",
    name: "Web Server 1",
    ipAddress: "192.168.1.10",
    username: "root",
    domain: "web1.example.com",
    status: "active",
    connected: "2 minutes ago",
  },
  {
    id: "2",
    name: "Database Server",
    ipAddress: "192.168.1.20",
    username: "root",
    domain: "db.example.com",
    status: "inactive",
    connected: "5 minutes ago",
  },
  {
    id: "3",
    name: "Backup Server",
    ipAddress: "192.168.1.30",
    username: "root",
    domain: "backup.example.com",
    status: "active",
    connected: "10 minutes ago",
  },
  {
    id: "4",
    name: "Mail Server",
    ipAddress: "192.168.1.40",
    username: "root",
    domain: "mail.example.com",
    status: "inactive",
    connected: "20 minutes ago",
  },
  {
    id: "5",
    name: "Proxy Server",
    ipAddress: "192.168.1.50",
    username: "root",
    domain: "proxy.example.com",
    status: "active",
    connected: "30 minutes ago",
  },
];

const fetcher = (...args: [RequestInfo | URL, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

const ServersTable: FC = () => {
  const [page, setPage] = useState(1);

  const { data: servers, isLoading } = useSWR<{
    data: Server[];
    meta: { total: number; per_page: number };
  }>(`https://safepro.tecclubb.com/api/servers?page${page}`, fetcher, {
    keepPreviousData: true,
  });

  const rowsPerPage = servers?.meta.per_page ?? 10;

  const pages = useMemo(
    () =>
      servers?.meta.total ? Math.ceil(servers.meta.total / rowsPerPage) : 0,
    [servers?.meta.total, rowsPerPage]
  );

  const loadingState =
    isLoading || servers?.data.length === 0 ? "loading" : "idle";

  return (
    <div className="w-full space-y-2">
      <h3 className="text-2xl font-bold">Servers</h3>
      <Table
        aria-label="VPS Servers"
        bottomContent={
          pages > 1 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
        classNames={{ wrapper: "p-0" }}
      >
        <TableHeader>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="ip_address">IP Address</TableColumn>
          <TableColumn key="username">Username</TableColumn>
          <TableColumn key="domain">Domain</TableColumn>
          <TableColumn key="status">Status</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          // items={servers?.data ?? []}
          items={servers1}
          loadingContent={<Spinner />}
          loadingState={loadingState}
          emptyContent="No Servers Found"
        >
          {(server) => (
            <TableRow key={server.id}>
              {(columnKey) => (
                <TableCell className="capitalize">
                  {columnKey === "name" ? (
                    <div>
                      <p className="text-sm font-medium">{server.name}</p>
                      <p className="text-default-500 text-xs">
                        {server.connected}
                      </p>
                    </div>
                  ) : columnKey === "status" ? (
                    <Chip
                      color={server.status === "active" ? "success" : "danger"}
                      variant="flat"
                      size="sm"
                    >
                      {server.status}
                    </Chip>
                  ) : columnKey === "actions" ? (
                    <Button
                      as={Link}
                      href={`/${server.id}`}
                      color="primary"
                      size="sm"
                    >
                      Details
                    </Button>
                  ) : (
                    getKeyValue(server, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServersTable;
