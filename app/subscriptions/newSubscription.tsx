import EditSubscriptionDialog from '@/components/edit/editSubscriptionDialog';
import { Button } from '@/components/ui/button';

const NewSubscription = () => {
  return (
    <EditSubscriptionDialog action="create">
      <Button variant="outline" className="w-full">
        Přidat typ člensví
      </Button>
    </EditSubscriptionDialog>
  );
};

export default NewSubscription;
