interface FormProps<T> {
  values: T;
  children: (values: T) => JSX.Element;
  submitFunc: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = <T extends {}>({
  values,
  children,
  submitFunc,
}: FormProps<T>) => {
  return <form onSubmit={(e) => submitFunc(e)}>{children(values)}</form>;
};
