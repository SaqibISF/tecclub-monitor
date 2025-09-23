import { asyncHandler } from "@/lib/asyncHandler";

export const GET = asyncHandler(async (req) => {
  const res = await fetch(`${req.api_url}/vps/dashboard`, {
    method: "GET",
    headers: { Authorization: `Bearer ${req.token}` },
  }).then((res) => res.json());

  return Response.json({ success: true, ...res }, { status: 200 });
});
