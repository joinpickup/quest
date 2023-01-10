import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Middleware } from "./util/middleware";
import { NextApiResponse } from "next";
import * as jose from "jose";

export async function middleware(request: NextRequest, res: NextApiResponse) {
  let token = "";
  if (request.headers.get("Key") == "1p5g4NsGXwFS6MQT") {
    token = await new jose.SignJWT({})
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .sign(new TextEncoder().encode(process.env.JWT_STRING as string));
  }

  const client = new Middleware(token as string);
  if (request.nextUrl.pathname.startsWith("/api/kapi")) {
    const keeper = await client.newInstance("KeeperAPI");
    request.headers.append("Authorization", `Bearer ${token}`);
    const endpoint =
      request.nextUrl.pathname.replace("/api/kapi", "/v1") +
      "?" +
      request.nextUrl.searchParams;
    const url = new URL(endpoint, keeper.base);
    return NextResponse.rewrite(url, { request });
  } else if (request.nextUrl.pathname.startsWith("/api/proxy/quest")) {
    const quest = await client.newInstance("QuestServer");
    request.headers.append("Authorization", `Bearer ${token}`);
    const endpoint =
      request.nextUrl.pathname.replace("/api/proxy/quest", "/v1") +
      "?" +
      request.nextUrl.searchParams;
    const url = new URL(endpoint, quest.base);
    return NextResponse.rewrite(url, { request });
  }
}
