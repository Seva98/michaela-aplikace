export type SubscriptionSession = {
  session_id: number;
  session_date: string;
};

export type Subscription = {
  user_id: number;
  is_completed: boolean;
  subscription_name: string;
  start_date: string;
  expiration_date: string | null;
  number_of_sessions: number;
  user_subscription_id: number;
  subscription_sessions: SubscriptionSession[];
};

export type UserSubscription = {
  user_id: number;
  name: string;
  color: string;
  active_subscription: Subscription | null;
};
