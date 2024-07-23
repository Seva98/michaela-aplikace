import FormSubmitButton from '@/components/common/formSubmitButton';
import FormWithError from '@/components/common/formWithError';
import { Input } from '@/components/ui/input';
import { createSession } from '@/db/sessions/createSession';
import { today } from '@/utils/dates';

const AddSession = ({ user_subscription_id, color }: { user_subscription_id: number; color: string }) => {
  return (
    <FormWithError className="grid grid-cols-2 gap-1" action={createSession}>
      <input type="hidden" name="user_subscription_id" value={user_subscription_id} />
      <Input type="date" name="session_date" defaultValue={today()} />
      <FormSubmitButton
        style={{
          backgroundColor: color,
        }}
      >
        Přidat trénink
      </FormSubmitButton>
    </FormWithError>
  );
};

export default AddSession;
