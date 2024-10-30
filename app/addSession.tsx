import FormSubmitButton from '@/components/common/formSubmitButton';
import FormWithError from '@/components/common/formWithError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createSession } from '@/db/sessions/createSession';
import { today, todayWithTime } from '@/utils/dates';
import Rating from '../components/rating/rating';
import { getButtonColorStyle } from '@/utils/colors';

const AddSession = ({ user_subscription_id, color }: { user_subscription_id: number; color: string }) => {
  return (
    <FormWithError className="flex flex-col gap-2 h-full" action={createSession}>
      <Input type="datetime-local" name="session_date" defaultValue={todayWithTime()} className="flex-none" />
      <Rating color={color} user_subscription_id={user_subscription_id} />
      <Textarea placeholder="Poznámka k tréninku" name="note" className="min-h-[5rem] h-full"></Textarea>
      <FormSubmitButton style={getButtonColorStyle(color)}>Přidat trénink</FormSubmitButton>
      <input type="hidden" name="user_subscription_id" value={user_subscription_id} />
    </FormWithError>
  );
};

export default AddSession;
