import { asyncHandler } from "@/lib/asyncHandler";

export const GET = asyncHandler(
  async (req, { params }: { params: Promise<{ serverId: string }> }) => {
    const { serverId } = await params;
    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range");

    const res = await fetch(
      `${req.api_url}/vps/servers/${serverId}/metrics${
        range ? `?range=${range}` : ""
      }`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${req.token}` },
      }
    ).then((res) => res.json());

    return Response.json({ success: true, ...res }, { status: 200 });
  }
);
