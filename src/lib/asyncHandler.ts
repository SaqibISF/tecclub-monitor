import fs from "fs";
import path from "path";
import jwt, { JwtPayload } from "jsonwebtoken";
import { allowedDomains, APP_URL } from "./constants";

export const asyncHandler =
  <T extends unknown[]>(
    handler: (req: AuthRequest, ...args: T) => Promise<Response>
  ) =>
  async (req: Request, ...args: T) => {
    try {
      const bearerToken = req.headers.get("Authorization");

      if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
        return Response.json(
          { success: false, message: "Unauthorized, token not provided" },
          { status: 401 }
        );
      }

      const token = bearerToken.replace("Bearer ", "");

      const PRIVATE_KEY_PATH = path.join(
        process.cwd(),
        "keys",
        "private_key.pem"
      );

      const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");

      if (!privateKey) {
        return Response.json(
          { success: false, message: "configure secret keys" },
          { status: 400 }
        );
      }

      const decodedToken = jwt.verify(token, privateKey, {
        complete: true,
        algorithms: ["RS256"],
      });

      const payload = decodedToken.payload as JwtPayload;

      if (!payload.api_url) {
        return Response.json(
          { success: false, message: "token has been expired or invalid" },
          { status: 401 }
        );
      }

      if (!allowedDomains.includes(payload.admin_domain)) {
        return Response.json(
          { success: false, message: "your domain not allowed" },
          { status: 401 }
        );
      }

      if (payload.aud !== APP_URL) {
        return Response.json(
          { success: false, message: "invalid audience" },
          { status: 401 }
        );
      }

      const authReq = Object.assign(req, {
        api_url: payload.api_url,
        token: payload.token,
        admin_name: payload.admin_name,
      });

      return await handler(authReq, ...args);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return Response.json(
        {
          success: false,
          message:
            message === "jwt expired"
              ? "Token was expired please reconnect again"
              : message,
        },
        { status: 500 }
      );
    }
  };
