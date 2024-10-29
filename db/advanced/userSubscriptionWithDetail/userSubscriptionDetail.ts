export type UserSubscriptionDetail = {
  user_subscription_id: number;
  user_id: number;
  subscription_id: number;
  subscription_name: string;
  total_sessions: number;
  used_sessions: number;
  first_name: string;
  last_name: string;
  is_fully_booked: boolean;
};
