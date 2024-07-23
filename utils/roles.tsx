import { Session } from '@auth0/nextjs-auth0';

export const isAdmin = (session?: Session | null) => session?.user.email === process.env.ADMIN_EMAIL;
export const isOwner = (session?: Session | null) => session?.user.email === process.env.OWNER || isAdmin(session);
