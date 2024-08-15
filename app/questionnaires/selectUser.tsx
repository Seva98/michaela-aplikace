'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '@/db/users/user';
import { getName } from '@/utils/db/user/getName';
import { useEffect, useState } from 'react';

const SelectUser = ({ users }: { users: User[] }) => {
  const [selectedUser, setSelectedUser] = useState(`${users.length > 0 ? users[0].user_id : -1}`);

  return (
    <>
      <Select name="user_id" value={selectedUser} onValueChange={(u) => setSelectedUser(u)}>
        <SelectTrigger>
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent>
          {users.map(({ user_id, first_name, last_name }) => (
            <SelectItem key={`sub-${user_id}`} value={`${user_id}`}>
              {getName(first_name, last_name)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input type="hidden" name="user_id" value={selectedUser} />
    </>
  );
};

export default SelectUser;
