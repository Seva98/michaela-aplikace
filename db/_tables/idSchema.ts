import { z } from 'zod';

export const idSchema = {
  id: z.number().int().positive({ message: 'ID must be a positive integer' }),
};

export const zId = z.object({ ...idSchema });
