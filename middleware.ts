// middleware.ts

import { authMiddleware } from './utils/middleware/auth';
import { chain } from './utils/middleware/chain';
import { pathMiddleware } from './utils/middleware/path';

export const middleware = chain([authMiddleware, pathMiddleware]);

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
