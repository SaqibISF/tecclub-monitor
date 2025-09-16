declare type Server = {
  id: string;
  name: string;
  ipAddress: string;
  username: string;
  domain: string;
  status: "active" | "inactive";
  connected: string;
};
