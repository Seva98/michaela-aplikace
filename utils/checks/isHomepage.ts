import { headers } from 'next/headers';
import { ROOT } from '../constants';

export const isHomepage = (await headers()).get('x-current-path') === ROOT;
