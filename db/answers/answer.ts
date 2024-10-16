export type Answer = {
  answer_id: number;
  owner_id: number;
  user_id: number;
  questionnaire_id: number;
  answer: string;
  current_progress: number;
  last_updated: Date;
  assigned_at: Date;
  total_questions: number;
};
