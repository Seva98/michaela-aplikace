'use client';

import FormSubmitButton from '@/components/common/formSubmitButton';
import { completeSubscription } from '@/db/subscriptions/activateSubscription';
import { CheckCircledIcon } from '@radix-ui/react-icons';

const CompleteSubscriptionButton = ({ user_subscription_id }: { user_subscription_id: number }) => {
  const handleComplete = (formData: FormData) => {
    if (confirm('Ukončit současné předplatné?')) {
      completeSubscription(formData);
    }
  };

  return (
    <form action={handleComplete}>
      <input type="hidden" name="user_subscription_id" value={user_subscription_id} />
      <FormSubmitButton variant={'ghost'}>
        <CheckCircledIcon />
      </FormSubmitButton>
    </form>
  );
};

export default CompleteSubscriptionButton;
