import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function pathMiddleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set('x-current-path', request.nextUrl.pathname);
  return NextResponse.next({ headers });
}
