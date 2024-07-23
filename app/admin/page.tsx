import FormSubmitButton from '@/components/common/formSubmitButton';
import { Button } from '@/components/ui/button';
import {
  createBookingsTable,
  createConfigurationsTable,
  createRolesTable,
  createSubscriptionsTable,
  createUsersRolesTable,
  createUsersTable,
} from '@/db/_tables/createTables';

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <form action={createUsersTable}>
        <FormSubmitButton>Create Users Table</FormSubmitButton>
      </form>
      <form action={createRolesTable}>
        <FormSubmitButton>Create Roles Table</FormSubmitButton>
      </form>
      <form action={createUsersRolesTable}>
        <FormSubmitButton>Create Users Roles Table</FormSubmitButton>
      </form>
      <form action={createConfigurationsTable}>
        <FormSubmitButton>Create Configurations Table</FormSubmitButton>
      </form>
      <form action={createBookingsTable}>
        <FormSubmitButton>Create Bookings Table</FormSubmitButton>
      </form>
      <form action={createSubscriptionsTable}>
        <FormSubmitButton>Create Subscriptions Table</FormSubmitButton>
      </form>
    </div>
  );
};

export default AdminPage;
