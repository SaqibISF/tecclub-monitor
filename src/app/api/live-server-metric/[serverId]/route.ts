import { asyncHandler } from "@/lib/asyncHandler";

export const GET = asyncHandler(
  async (req, { params }: { params: Promise<{ serverId: string }> }) => {
    const { serverId } = await params;

    const res = await fetch(`${req.api_url}/vps/servers/${serverId}/live`, {
      method: "GET",
      headers: { Authorization: `Bearer ${req.token}` },
    }).then((res) => res.json());

    return Response.json({ success: true, ...res }, { status: 200 });
  }
);
