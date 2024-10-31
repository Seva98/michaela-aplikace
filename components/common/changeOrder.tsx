import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import FormSubmitButton from './formSubmitButton';
import { ButtonSize } from '../ui/button';
import FormWithError from './formWithError';

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
        <FormWithError action={action}>
          <input type="hidden" name={idKey} value={id} />
          <input type="hidden" name="amount" value="-1" />

          <FormSubmitButton variant="ghost" size={size}>
            <ArrowUpIcon />
          </FormSubmitButton>
        </FormWithError>
      )}
      {itemIndex === itemsLength - 1 ? (
        <div />
      ) : (
        <FormWithError action={action}>
          <input type="hidden" name={idKey} value={id} />
          <input type="hidden" name="amount" value="1" />
          <FormSubmitButton className="float-right" variant="ghost" size={size}>
            <ArrowDownIcon />
          </FormSubmitButton>
        </FormWithError>
      )}
    </div>
  );
};

export default ChangeOrder;
