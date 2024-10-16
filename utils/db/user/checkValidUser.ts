import { getUserId } from './getUserId';
import { isOwnerOrAdmin } from './isAdminOrUser';
import { Role } from './role';

export const checkValidUser = async (user_id?: number) => {
  const isUser = (await isOwnerOrAdmin()) === Role.USER;
  const session_user_id = await getUserId();
  if (isUser && session_user_id !== user_id) {
    throw new Error('Unauthorized');
  }
};
