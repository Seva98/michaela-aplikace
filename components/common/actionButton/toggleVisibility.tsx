import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import FormSubmitButton from '../formSubmitButton';

const ToggleVisibility = ({ action, is_hidden, id, idKey }: { action: (formData: FormData) => void; is_hidden: boolean; id: number; idKey: string }) => {
  return (
    <form action={action}>
      <input type="hidden" name={idKey} value={id} />
      <input type="hidden" name="is_hidden" value={is_hidden.toString()} />
      <FormSubmitButton type="submit" variant={is_hidden ? 'secondary' : 'outline'}>
        {is_hidden ? <EyeClosedIcon /> : <EyeOpenIcon />}
      </FormSubmitButton>
    </form>
  );
};

export default ToggleVisibility;
