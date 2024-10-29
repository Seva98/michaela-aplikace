import { SubscriptionSession } from '../../../db/advanced/userSubscription/userSubscription';

export const getSubscriptionSession = (subscription_sessions: SubscriptionSession[], i: number) => {
  if (subscription_sessions && subscription_sessions.length > i) {
    return subscription_sessions[i];
  } else {
    return undefined;
  }
};

export const getUserSubscriptionSession = (subscription_sessions: SubscriptionSession[], i: number) => {
  const subscriptionSession = getSubscriptionSession(subscription_sessions, i);
  if (subscriptionSession) {
    const { session_date, session_id } = subscriptionSession;
    return { session_date, session_id };
  } else {
    return undefined;
  }
};

export const isSusbscriptionExpired = (subscription_sessions: SubscriptionSession[], is_completed: boolean, i: number) =>
  !getSubscriptionSession(subscription_sessions, i) && is_completed;

export const isSusbscriptionNotPlannedYet = (subscription_sessions: SubscriptionSession[], i: number) => !getSubscriptionSession(subscription_sessions, i);
