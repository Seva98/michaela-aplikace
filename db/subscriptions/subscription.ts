import { z } from 'zod';

export interface Subscription {
  subscription_id: number;
  name: string;
  expiration_days: number;
  price_per_session: number;
  number_of_sessions: number;
}

export const subscriptionSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(255, { message: 'Name is too long' }),
  expiration_days: z.number().int().min(0, { message: 'Expiration days must be at least 0' }),
  price_per_session: z.number().int().min(0, { message: 'Price per session must be at least 0' }),
  number_of_sessions: z.number().int().min(1, { message: 'Number of sessions must be at least 1' }),
});
