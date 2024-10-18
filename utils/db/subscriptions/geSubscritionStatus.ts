import { ActivatedSubscription } from '@/db/userSubscription/userSubscription';

export enum SubscriptionExpired {
  EXPIRED = 'Expirovalo!',
  NEVER_EXPIRES = 'Nikdy neexpiruje',
}

export const isSubscriptionActive = (activeSubscription?: ActivatedSubscription | null) => {
  return !activeSubscription || !activeSubscription.is_completed || hasRemainingSessions(activeSubscription);
};

export const hasRemainingSessions = (activeSubscription?: ActivatedSubscription | null) => {
  return (
    activeSubscription &&
    (!activeSubscription.subscription_sessions ||
      (activeSubscription.subscription_sessions && activeSubscription.subscription_sessions.length < activeSubscription.number_of_sessions))
  );
};
