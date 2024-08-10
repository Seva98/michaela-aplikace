import { RiSave3Fill } from 'react-icons/ri';
import FormSubmitButton from './formSubmitButton';

const Save = ({ variant = 'button' }: { variant?: 'icon' | 'button' }) => {
  return <FormSubmitButton>{variant === 'button' ? 'Uložit' : <RiSave3Fill />}</FormSubmitButton>;
};

export default Save;
