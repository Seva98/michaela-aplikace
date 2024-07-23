import FormSubmitButton from '@/components/common/formSubmitButton';
import Content, { FormContent } from '@/components/containers/content';
import { LabeledInput } from '@/components/ui/input';
import { LabeledTextarea } from '@/components/ui/textarea';
import Typography from '@/components/ui/typography';
import { createUser } from '@/db/users/createUser';

const CreateUser = () => {
  return (
    <Content>
      <Typography variant="h2">Vytvoření nového uživatele</Typography>
      <FormContent action={createUser} className="flex flex-col max-w-lg">
        <div className="grid grid-cols-2 gap-2">
          <LabeledInput label="Jméno" name="first_name" type="text" />
          <LabeledInput label="Příjmení" name="last_name" type="text" />
        </div>
        <LabeledInput label="Email" name="email" type="email" />
        <LabeledInput label="Adresa" name="address" type="text" />
        <LabeledInput label="Datum narození" name="birthday" type="date" />
        <LabeledInput label="Telefon" name="phone" type="tel" />
        <LabeledTextarea label="Bio" name="bio" />
        <FormSubmitButton>Uložit</FormSubmitButton>
      </FormContent>
    </Content>
  );
};

export default CreateUser;
