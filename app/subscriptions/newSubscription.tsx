import EditSubscription from '@/components/edit/editSubscription';
import { Button } from '@/components/ui/button';

const NewSubscription = () => {
  return (
    <EditSubscription action="create">
      <Button variant="outline" className="w-full">
        Přidat typ člensví
      </Button>
    </EditSubscription>
  );
};

export default NewSubscription;
