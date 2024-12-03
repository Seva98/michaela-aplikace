'use server';

import { uploadImageAction } from '@/server/uploadImageAction';
import { sql } from '@vercel/postgres';

export const updateOwnerSettings = async (formData: FormData) => {
  const owner_id = parseInt(formData.get('owner_id') as string);
  const title = formData.get('title') as string;
  const theme = formData.get('theme') as string;
  const menu = formData.get('menu') as string;
  const imageFile = formData.get('image') as File;
  const oldImage = formData.get('old_image') as string;
  const folder = formData.get('folder') as string;

  if (imageFile) {
    await updateLogo(formData);
  }

  await sql`
      UPDATE michaela_owner_settings
      SET title = ${title}, theme = ${theme}, menu = ${menu}
      WHERE owner_id = ${owner_id};
    `;
};

export const updateLogo = async (formData: FormData) => {
  const owner_id = parseInt(formData.get('owner_id') as string);

  const blob = await uploadImageAction(formData);
  if (!blob) return;

  await sql`
      UPDATE michaela_owner_settings
      SET logo = ${blob.url}
      WHERE owner_id = ${owner_id};
    `;
};
