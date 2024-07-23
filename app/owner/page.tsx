import Section from '@/components/containers/section';
import CreateUser from './createUser';
import Users from './users';
import CreateSubscription from './createSubscription';
import Subscriptions from './subscriptions';

const OwnerPage = () => {
  return (
    <Section className="flex flex-col gap-4">
      <CreateUser />
      <Users />
      <CreateSubscription />
      <Subscriptions />
    </Section>
  );
};

export default OwnerPage;
