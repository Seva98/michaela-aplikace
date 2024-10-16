import { ActivatedSubscription } from '@/db/userSubscription/userSubscription';

export const isSubscriptionComplete = (activeSubscription?: ActivatedSubscription | null) => {
  if (!activeSubscription) return true;
  const { is_completed, number_of_sessions, subscription_sessions } = activeSubscription;
  return is_completed || (subscription_sessions && subscription_sessions.length >= number_of_sessions);
};

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
