import FormSubmitButton from '@/components/common/formSubmitButton';
import FormWithError from '@/components/common/formWithError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createSession } from '@/db/sessions/createSession';
import { today } from '@/utils/dates';
import Rating from './rating';

const AddSession = ({ user_subscription_id, color }: { user_subscription_id: number; color: string }) => {
  return (
    <FormWithError className="flex flex-col gap-1" action={createSession}>
      <Textarea placeholder="Poznámka" name="note"></Textarea>
      <Rating color={color} user_subscription_id={user_subscription_id} />
      <div className="grid grid-cols-2 gap-1">
        <input type="hidden" name="user_subscription_id" value={user_subscription_id} />
        <Input type="date" name="session_date" defaultValue={today()} />
        <FormSubmitButton
          style={{
            backgroundColor: color,
          }}
        >
          Přidat trénink
        </FormSubmitButton>
      </div>
    </FormWithError>
  );
};

export default AddSession;
