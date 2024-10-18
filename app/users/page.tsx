import Section from '@/components/containers/section';
import NewUser from './newUser';
import UsersList from './usersList';
import Card from '@/components/ui/card';

const Subscriptions = async () => {
  return (
    <Section className="relevant" title="Klienti" linkBack>
      <Card>
        <UsersList />
        <NewUser />
      </Card>
    </Section>
  );
};

export default Subscriptions;
