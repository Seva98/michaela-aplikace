import { RiDeleteBin6Line } from 'react-icons/ri';
import FormSubmitButton from './formSubmitButton';

const DeleteButton = () => {
  return (
    <FormSubmitButton variant={'ghost'}>
      <RiDeleteBin6Line />
    </FormSubmitButton>
  );
};

export default DeleteButton;
