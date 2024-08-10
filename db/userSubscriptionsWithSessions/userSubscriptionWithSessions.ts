export type UserSubscriptionWithSessions = {
  user_subscription_id: number;
  subscription_name: string;
  start_date: string;
  completion_date: string;
  sessions: {
    session_id: number;
    session_date: string;
    note: string;
    rating: number;
  }[];
};
