export type SubscriptionSession = {
  session_id: number;
  session_date: string;
  note?: string;
  rating?: number;
};

export type ActivatedSubscription = {
  user_id: number;
  is_completed: boolean;
  completion_date: string | null;
  subscription_name: string;
  start_date: string;
  expiration_date: string | null;
  number_of_sessions: number;
  user_subscription_id: number;
  subscription_sessions: SubscriptionSession[];
};

export type UserSubscription = {
  session_id?: number;
  user_id: number;
  name: string;
  color: string;
  active_subscription: ActivatedSubscription | null;
};
