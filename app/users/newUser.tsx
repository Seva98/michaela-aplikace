import { Button } from '@/components/ui/button';
import EditUser from '@/components/edit/editUser';

const NewUser = () => {
  return (
    <EditUser action="create">
      <Button variant="outline" className="w-full">
        Přidat klienta
      </Button>
    </EditUser>
  );
};

export default NewUser;
