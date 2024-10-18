import { FaExclamationTriangle } from 'react-icons/fa';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import EditUser from '../edit/editUser';
import { Button } from '../ui/button';

const CreateUserAlert = () => {
  return (
    <div className="space-y-4">
      <Alert className="w-fit">
        <FaExclamationTriangle className="h-4 w-4 my-auto" />
        <AlertTitle>Chybí klienti</AlertTitle>
        <AlertDescription>Nejdříve přidej nějakého klienta</AlertDescription>
      </Alert>
      <EditUser action="create">
        <Button>Přidat klienta</Button>
      </EditUser>
    </div>
  );
};

export default CreateUserAlert;
