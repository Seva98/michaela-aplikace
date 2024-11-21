import { BsStars } from 'react-icons/bs';
import { FaRegCalendarTimes } from 'react-icons/fa';
import { FaMoneyBill1Wave, FaRegCalendarCheck } from 'react-icons/fa6';
import { GrNotes } from 'react-icons/gr';
import { IconType } from 'react-icons/lib';

export type FeatureType = {
  title: string;
  Icon: IconType;
};
export const featureTypes = {
  planning: {
    title: 'Plánování',
    Icon: FaRegCalendarCheck,
  },
  notes: {
    title: 'Poznámky',
    Icon: GrNotes,
  },
  finance: {
    title: 'Finance',
    Icon: FaMoneyBill1Wave,
  },
  cancellation: {
    title: 'Storna',
    Icon: FaRegCalendarTimes,
  },
  ai: {
    title: 'AI',
    Icon: BsStars,
  },
};
