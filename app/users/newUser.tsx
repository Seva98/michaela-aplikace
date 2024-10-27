import { Button } from '@/components/ui/button';
import EditUserDialog from '@/components/edit/editUserDialog';

const NewUser = () => {
  return (
    <EditUserDialog action="create">
      <Button variant="outline" className="w-full">
        Přidat klienta
      </Button>
    </EditUserDialog>
  );
};

export default NewUser;
