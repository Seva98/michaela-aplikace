import Content from '@/components/containers/content';
import Typography from '@/components/ui/typography';
import { getSubscriptions } from '@/db/subscriptions/getSubscriptions';
import { getTotal } from '@/utils/currency';

const Subscriptions = async () => {
  const subscriptions = await getSubscriptions();
  return (
    <Content>
      <Typography variant="h2">Uživatelé</Typography>
      {subscriptions.length > 0 ? (
        subscriptions.map(({ subscription_id, name, number_of_sessions, price_per_session, expiration_days }) => (
          <div key={`sub-${subscription_id}`} className="flex gap-2 items-end">
            <Typography variant="h3">{name}</Typography>
            <Typography variant="p">
              {number_of_sessions} lekcí za {price_per_session} Kč/lekci
            </Typography>
            <Typography variant="p">Celkem {getTotal(number_of_sessions, price_per_session)} Kč</Typography>
            <Typography variant="p">Expirace {expiration_days} dní</Typography>
          </div>
        ))
      ) : (
        <Typography variant="p">Žádný uživatel nebyl nalezen</Typography>
      )}
    </Content>
  );
};

export default Subscriptions;
