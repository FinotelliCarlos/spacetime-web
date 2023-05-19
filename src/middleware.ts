import { NextRequest, NextResponse } from 'next/server'

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID

const SIGNIN_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`

export function middleware(request: NextRequest) {
  const token = request.cookies.get('spacetime_token')?.value

  if (!token) {
    return NextResponse.redirect(SIGNIN_URL, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/memories/:path*',
}
