import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import EditUser from '@/components/user/editUser';

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
