import { Button } from '@/components/ui/button';
import EditUser from '@/components/edit/editUser';

const NewSubscription = () => {
  return (
    <EditUser action="create">
      <Button variant="outline" className="w-full">
        Přidat klienta
      </Button>
    </EditUser>
  );
};

export default NewSubscription;
