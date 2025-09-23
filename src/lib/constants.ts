export const APP_URL = process.env.APP_URL!;

export const allowedDomains = process.env
  .ALLOWED_DOMAINS!.split(",")
  .map((domain) => domain.trim());
