import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Middleware } from './util/middleware'
import { NextApiResponse } from 'next'

export async function middleware(request: NextRequest, res: NextApiResponse) {
  const token = request.cookies.get("token")
  const client = new Middleware(token?.value as string)

  if (request.nextUrl.pathname.startsWith('/api/kapi')) {
    const keeper = await client.newInstance("KeeperAPI")
    request.headers.append("authorization", `bearer ${token?.value}`)
    const endpoint = request.nextUrl.pathname.replace("/api/kapi","/v1") + "?" + request.nextUrl.searchParams
    const url = new URL(endpoint, keeper.base)
    return NextResponse.rewrite(url, {request})
  } else {
    return NextResponse.next()
  }
}
