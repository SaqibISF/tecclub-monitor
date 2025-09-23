import React, { FC } from "react";
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
  Spinner,
} from "@heroui/react";
import Link from "next/link";
import { LoadingState } from "@react-types/shared";

const ServersTable: FC<{
  payload: string;
  servers?: Server[];
  loadingState?: LoadingState;
  errorMessage?: string;
}> = ({ payload, servers, loadingState, errorMessage }) => (
  <div className="w-full space-y-2">
    <h3 className="text-2xl font-bold">Servers</h3>
    <Table aria-label="VPS Servers" classNames={{ wrapper: "p-0" }}>
      <TableHeader>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="ip_address">IP Address</TableColumn>
        <TableColumn key="domain">Domain</TableColumn>
        <TableColumn key="status_class">Status</TableColumn>
        <TableColumn key="is_online">Online</TableColumn>
        <TableColumn key="actions">Actions</TableColumn>
      </TableHeader>
      <TableBody
        items={servers ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
        emptyContent={errorMessage ? errorMessage : "No Servers Found"}
      >
        {(server) => (
          <TableRow key={server.id}>
            {(columnKey) => (
              <TableCell className="capitalize">
                {columnKey === "name" ? (
                  <div>
                    <p className="text-sm font-medium">{server.name}</p>
                    <p className="text-default-500 text-xs">{server.name}</p>
                  </div>
                ) : columnKey === "status_class" ? (
                  <Chip
                    color={
                      server.status_class === "excellent"
                        ? "success"
                        : server.status_class === "good"
                        ? "warning"
                        : "danger"
                    }
                    variant="flat"
                    size="sm"
                  >
                    {server.status_class}
                  </Chip>
                ) : columnKey === "is_online" ? (
                  <Chip
                    color={server.is_online ? "success" : "danger"}
                    variant="flat"
                    size="sm"
                  >
                    {server.is_online ? "Yes" : "No"}
                  </Chip>
                ) : columnKey === "actions" ? (
                  <Button
                    as={Link}
                    href={`/server-details/${server.id}?payload=${payload}`}
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

export default ServersTable;
