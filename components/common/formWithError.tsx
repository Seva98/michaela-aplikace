import { HTMLProps, ReactNode } from 'react';
import ComponentWithError from './error/componentWithError';
import Form, { FormProps } from 'next/form';
import { RouteType } from 'next/dist/lib/load-custom-routes';

const FormWithError = ({ children, ...props }: { children: ReactNode } & FormProps<RouteType>) => {
  return (
    <ComponentWithError>
      <Form {...props}>{children}</Form>
    </ComponentWithError>
  );
};

export default FormWithError;
