import { auth0 } from '@/utils/auth0';
import type { NextRequest } from 'next/server';

export async function authMiddleware(request: NextRequest) {
  return await auth0.middleware(request);
}
