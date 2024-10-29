import { SubscriptionSession } from '@/db/advanced/userSubscription/userSubscription';
import { getSubscriptionSession, isSusbscriptionExpired, isSusbscriptionNotPlannedYet } from './getSubscriptionSession';
import { hexToRgba } from '@/utils/colors';

export type SubscritpionHistoryState = 'completed' | 'planned' | 'not_planned' | 'expired';

export const getSubscriptionHistoryState = (subscription_sessions: SubscriptionSession[], index: number, is_completed: boolean): SubscritpionHistoryState => {
  const now = new Date();
  const session = getSubscriptionSession(subscription_sessions, index);

  if (isSusbscriptionNotPlannedYet(subscription_sessions, index)) return 'not_planned';
  if (session && new Date(session.session_date) > now) return 'planned';
  if (isSusbscriptionExpired(subscription_sessions, is_completed, index)) return 'expired';

  return 'completed';
};

export const getSubscriptionHistoryStateColor = (state: SubscritpionHistoryState, color: string) => {
  switch (state) {
    case 'completed':
      return color;
    case 'planned':
      return hexToRgba(color, 0.6);
    case 'not_planned':
      return 'white';
    case 'expired':
      return '#eee';
  }
};
