import { SubscritpionHistoryState } from '@/utils/db/subscriptions/subscriptionHistoryState';

const SubscriptionSessionState = ({ state, handleClick }: { state: SubscritpionHistoryState; handleClick?: () => void }) => {
  return (
    <div className="flex justify-center items-center text-white" onClick={handleClick}>
      {state === 'completed' && '✔'}
      {state === 'planned' && '◉'}
      {state === 'expired' && 'X'}
    </div>
  );
};

export default SubscriptionSessionState;
