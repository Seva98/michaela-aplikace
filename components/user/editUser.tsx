'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { User } from '@/db/users/user';
import { FormContent } from '../containers/content';
import { LabeledInput } from '../ui/input';
import { createUser } from '@/db/users/createUser';
import { updateUser } from '@/db/users/updateUser';
import { LabeledTextarea } from '../ui/textarea';
import EditColor from './editColor';
import { FormEvent, ReactNode, useState } from 'react';
import { Button } from '../ui/button';
import Loader from '../common/loader';

const EditUser = ({ action, user, children }: { action: 'create' | 'edit'; user?: User; children: ReactNode }) => {
  const { email, first_name, last_name, user_id, address, bio, birthday, phone, color } = user || {};
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    try {
      if (action === 'create') {
        await createUser(formData);
      } else {
        await updateUser(formData);
      }
      setOpen(false);
    } catch (error) {
      console.error('Form submission error:', error);
    }
    setPending(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{action === 'create' ? 'Nový klient' : 'Upravit klienta'}</DialogTitle>
        </DialogHeader>
        <FormContent onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-lg">
          <input type="hidden" name="user_id" value={user_id} />
          <div className="grid grid-cols-2 gap-2">
            <LabeledInput label="Jméno" name="first_name" type="text" defaultValue={first_name} />
            <LabeledInput label="Příjmení" name="last_name" type="text" defaultValue={last_name} />
          </div>
          <EditColor color={color} />
          <LabeledInput label="Email" name="email" type="email" defaultValue={email} />
          <LabeledInput label="Adresa" name="address" type="text" defaultValue={address} />
          <LabeledInput label="Datum narození" name="birthday" type="date" defaultValue={birthday} />
          <LabeledInput label="Telefon" name="phone" type="tel" defaultValue={phone} />
          <LabeledTextarea label="Bio" rows={9} name="bio" defaultValue={bio} />
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? <Loader /> : action === 'create' ? 'Vytvořit klienta' : 'Uložit změny'}
          </Button>
        </FormContent>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
