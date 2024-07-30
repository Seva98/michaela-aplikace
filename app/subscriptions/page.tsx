import Section from '@/components/containers/section';
import { getAllSbuscriptions } from '@/db/subscriptions/getSubscriptions';
import NewSubscription from './newSubscription';
import SubscriptionsList from './subscriptionsList';

const Subscriptions = async () => {
  const subscriptions = await getAllSbuscriptions();
  const gridClass = 'grid grid-cols-[95px_auto_110px_100px] gap-2 items-end';

  return (
    <Section className="relevant" title="Členství" linkBack>
      <div className="flex flex-col gap-4 shadow-lg w-fit  border border-gray-100 p-4">
        <SubscriptionsList subscriptions={subscriptions} gridClass={gridClass} />
        <NewSubscription gridClass={gridClass} />
      </div>
    </Section>
  );
};

export default Subscriptions;
