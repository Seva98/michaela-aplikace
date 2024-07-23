import { SubscriptionSession } from '../../../db/userSubscription/userSubscription';

export const getSubscriptionSession = (subscription_sessions: SubscriptionSession[], i: number) => {
  if (subscription_sessions && subscription_sessions.length > i) {
    return subscription_sessions[i];
  } else {
    return null;
  }
};
