import Section from '@/components/containers/section';
import { getAllSbuscriptions } from '@/db/subscriptions/getSubscriptions';
import NewSubscription from './newSubscription';
import SubscriptionsList from './subscriptionsList';
import Card from '@/components/ui/card';

const Subscriptions = async () => {
  const subscriptions = await getAllSbuscriptions();

  return (
    <Section className="relevant" title="Členství" linkBack>
      <Card>
        <SubscriptionsList subscriptions={subscriptions} />
        <NewSubscription />
      </Card>
    </Section>
  );
};

export default Subscriptions;
