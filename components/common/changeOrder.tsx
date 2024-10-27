import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import FormSubmitButton from './formSubmitButton';
import { ButtonSize } from '../ui/button';

const ChangeOrder = ({
  action,
  id,
  idKey,
  itemIndex,
  itemsLength,
  size = 'default',
}: {
  action: (formData: FormData) => void;
  id: number;
  idKey: string;
  itemIndex: number;
  itemsLength: number;
  size?: ButtonSize;
}) => {
  return (
    <div className="flex justify-between items-end">
      {itemIndex === 0 ? (
        <div />
      ) : (
        <form action={action}>
          <input type="hidden" name={idKey} value={id} />
          <input type="hidden" name="amount" value="-1" />

          <FormSubmitButton variant="ghost" size={size}>
            <ArrowUpIcon />
          </FormSubmitButton>
        </form>
      )}
      {itemIndex === itemsLength - 1 ? (
        <div />
      ) : (
        <form action={action}>
          <input type="hidden" name={idKey} value={id} />
          <input type="hidden" name="amount" value="1" />
          <FormSubmitButton className="float-right" variant="ghost" size={size}>
            <ArrowDownIcon />
          </FormSubmitButton>
        </form>
      )}
    </div>
  );
};

export default ChangeOrder;
