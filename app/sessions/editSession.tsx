import EditSessionPopup from '@/components/edit/editSessionPopup';
import { SubscriptionSession } from '@/db/userSubscription/userSubscription';

const EditSession = ({ session, children }: { session: SubscriptionSession; children: React.ReactNode }) => {
  return (
    <EditSessionPopup object={session}>
      <div className="w-6 h-6 bg-blue-200"></div>
    </EditSessionPopup>
  );
};

export default EditSession;
