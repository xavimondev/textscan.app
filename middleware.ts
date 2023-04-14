import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import redis from 'utils/getRedis'

// Docs: https://upstash.com/blog/edge-rate-limiting
// Create a new ratelimiter, that allows 5 requests per 60 seconds
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(3, '60 s'),
      analytics: true
    })
  : undefined

export default async function middleware(request: NextRequest): Promise<Response | undefined> {
  const identifier = request.ip ?? '127.0.0.1'
  if (ratelimit) {
    const { success, limit, remaining, reset } = await ratelimit.limit(identifier)
    if (!success) {
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('X-RateLimit-Limit', limit.toString())
      requestHeaders.set('X-RateLimit-Remaining', remaining.toString())
      requestHeaders.set('X-RateLimit-Reset', reset.toString())
      return new NextResponse(
        JSON.stringify({
          ok: false,
          msg: 'Too many requests in 1 minute. Please try again in a few minutes.'
        }),
        { status: 429, headers: requestHeaders }
      )
    }
    return NextResponse.next()
  }
}
// Limit all my functions
export const config = {
  matcher: '/api/detect-text'
}
