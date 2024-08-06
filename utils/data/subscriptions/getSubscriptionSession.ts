import { SubscriptionSession } from '../../../db/userSubscription/userSubscription';

export const getSubscriptionSession = (subscription_sessions: SubscriptionSession[], i: number) => {
  if (subscription_sessions && subscription_sessions.length > i) {
    return subscription_sessions[i];
  } else {
    return null;
  }
};

export const isSusbscriptionFinishedSooner = (subscription_sessions: SubscriptionSession[], is_completed: boolean, i: number) =>
  !getSubscriptionSession(subscription_sessions, i) && is_completed;
