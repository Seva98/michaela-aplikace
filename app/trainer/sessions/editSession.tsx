import EditSessionDialog from '@/components/edit/editSessionDialog';
import { SubscriptionSession } from '@/db/advanced/userSubscription/userSubscription';

const EditSession = ({ session, children }: { session: SubscriptionSession; children: React.ReactNode }) => {
  return (
    <EditSessionDialog object={session}>
      <div className="w-6 h-6 bg-blue-200"></div>
    </EditSessionDialog>
  );
};

export default EditSession;
