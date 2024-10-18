import { HTMLProps, ReactNode } from 'react';
import ComponentWithError from './error/componentWithError';

const FormWithError = ({ children, ...props }: { children: ReactNode } & HTMLProps<HTMLFormElement>) => {
  return (
    <ComponentWithError>
      <form {...props}>{children}</form>
    </ComponentWithError>
  );
};

export default FormWithError;
