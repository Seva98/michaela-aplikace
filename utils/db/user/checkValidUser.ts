import { getUserId } from './getUserId';
import { isOwnerOrUser } from './isAdminOrUser';
import { Role } from './role';

export const checkValidUser = async (user_id?: number) => {
  const isUser = (await isOwnerOrUser()) === Role.USER;
  console.log('isUser', isUser);
  const session_user_id = await getUserId();
  if (isUser && session_user_id !== user_id) {
    throw new Error('Unauthorized');
  }
};
