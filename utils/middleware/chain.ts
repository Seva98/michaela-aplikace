import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';

type Middleware = (request: NextRequest, event: NextFetchEvent) => Promise<NextResponse> | NextResponse;

export function chain(middlewares: Middleware[]) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    let response = NextResponse.next();
    for (const middleware of middlewares) {
      response = await middleware(request, event);
      if (response.headers.has('x-middleware-rewrite') || response.headers.has('Location')) {
        break;
      }
    }
    return response;
  };
}
