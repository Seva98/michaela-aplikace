import { Subscription } from '@/db/userSubscription/userSubscription';

export const isSubscriptionCompleted = ({ is_completed, number_of_sessions, subscription_sessions }: Subscription) =>
  is_completed || (subscription_sessions && subscription_sessions.length >= number_of_sessions);
