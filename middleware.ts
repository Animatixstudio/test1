import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define a rate limit window of 60 seconds
const WINDOW_SIZE_IN_SECONDS = 60
const MAX_REQUESTS_PER_WINDOW = 5

const rateLimitMap = new Map<string, number[]>()

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/api/contact') {
        // Use headers to get IP since request.ip is not available
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'
        const now = Date.now()
        const windowStart = now - (WINDOW_SIZE_IN_SECONDS * 1000)

        const requestTimestamps = rateLimitMap.get(ip) || []
        const recentRequests = requestTimestamps.filter((timestamp: number) => timestamp > windowStart)

        if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
            return new NextResponse(JSON.stringify({
                success: false,
                message: 'Too many requests, please try again later.'
            }), {
                status: 429,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }

        recentRequests.push(now)
        rateLimitMap.set(ip, recentRequests)
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/api/contact',
}