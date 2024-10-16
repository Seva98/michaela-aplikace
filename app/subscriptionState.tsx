'use client';

import { SelectButton } from '@/components/ui/selectButton';
import { updateSubscriptionState } from '@/db/subscriptions/activateSubscription';
import { getButtonColorStyle } from '@/utils/colors';

enum State {
  COMPLETED = 'completed',
  ACTIVE = 'active',
}

const SubscriptionState = ({ is_completed, user_subscription_id, color }: { is_completed: boolean; user_subscription_id: number; color: string }) => {
  const state: State = is_completed ? State.COMPLETED : State.ACTIVE;

  const changeSubscriptionState = (selectedValue: string) => {
    const formData = new FormData();
    formData.append('user_subscription_id', String(user_subscription_id));
    formData.append('new_state', selectedValue);

    if (selectedValue === State.COMPLETED && confirm('Ukončit současné předplatné?')) {
      updateSubscriptionState(formData);
    } else if (selectedValue === State.ACTIVE && confirm('Aktivovat znovu předplatné?')) {
      updateSubscriptionState(formData);
    }
  };

  return (
    <form>
      <SelectButton
        options={[
          { label: 'Aktivní', value: State.ACTIVE },
          { label: 'Ukončeno', value: State.COMPLETED },
        ]}
        defaultValue={state}
        variant={state === State.COMPLETED ? 'outline' : 'default'}
        style={state === State.COMPLETED ? {} : getButtonColorStyle(color)}
        onValueChange={(selectedValue) => changeSubscriptionState(selectedValue)}
      />
    </form>
  );
};

export default SubscriptionState;
