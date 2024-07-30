import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import FormSubmitButton from './formSubmitButton';

const ChangeOrder = ({
  action,
  id,
  idKey,
  itemIndex,
  itemsLength,
}: {
  action: (formData: FormData) => void;
  id: number;
  idKey: string;
  itemIndex: number;
  itemsLength: number;
}) => {
  return (
    <div className="flex justify-between items-end">
      {itemIndex === 0 ? (
        <div />
      ) : (
        <form action={action}>
          <input type="hidden" name={idKey} value={id} />
          <input type="hidden" name="amount" value="-1" />

          <FormSubmitButton variant="ghost">
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
          <FormSubmitButton className="float-right" variant="ghost">
            <ArrowDownIcon />
          </FormSubmitButton>
        </form>
      )}
    </div>
  );
};

export default ChangeOrder;
