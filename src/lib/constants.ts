export const REST_API_BASE_URL = process.env.NEXT_PUBLIC_REST_API_BASE_URL!;

export const VPS_DASHBOARD_ROUTE = `${REST_API_BASE_URL}/vps/dashboard`;

export const Live_Server_Metric = (serverId: number | string) =>
  `${REST_API_BASE_URL}/vps/servers/${serverId}/live`;

export const Server_Metric = (serverId: number | string) =>
  `${REST_API_BASE_URL}/vps/servers/${serverId}/metrics`;
