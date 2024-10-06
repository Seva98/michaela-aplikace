import { ActivatedSubscription } from '@/db/userSubscription/userSubscription';

export const isSubscriptionCompleted = ({ is_completed, number_of_sessions, subscription_sessions }: ActivatedSubscription) =>
  is_completed || (subscription_sessions && subscription_sessions.length >= number_of_sessions);

export enum SubscriptionExpired {
  EXPIRED = 'Expirovalo!',
  NEVER_EXPIRES = 'Nikdy neexpiruje',
}
