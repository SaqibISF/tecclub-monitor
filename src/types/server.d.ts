declare type Server = {
  id: number;
  name: string;
  ip_address: string;
  domain: string;
  is_online: boolean;
  health_score: number;
  cpu_usage: number;
  ram_usage: number;
  disk_usage: number;
  total_bandwidth: number;
  response_time: number;
  last_updated: Date;
  status_class: "excellent" | "good" | "offline";
};
