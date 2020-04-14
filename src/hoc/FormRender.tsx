import { SetStateAction, SyntheticEvent, useState } from "react";
import * as yup from "yup";
import { Schema } from "yup";

export type FormErrors<T> = {
  [K in keyof T]: string | "";
};

export interface FormRenderProps<T> {
  initValues: T;
  initErrors: FormErrors<T>;
  validateSchema: Schema<T>;
  onSubmit: (values: T) => void;
  render: (props: RenderProps<T>) => JSX.Element;
  setFormValues: (value: SetStateAction<T>) => void;
  formValues: T;
}

export interface RenderProps<T> {
  onBlur: (event: any) => void;
  onChange: (event: any) => void;
  values: T;
  errors: FormErrors<T>;
  onSubmit: (event: any) => void;
  onReset: () => void;
}

function FormRender<T>(props: FormRenderProps<T>) {
  // need to auto generate this initErrors
  const [formErrors, setFormErrors] = useState<FormErrors<T>>(props.initErrors);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    props.setFormValues({
      ...props.formValues,
      [name]: value,
    });
    setFormErrors(props.initErrors);
  };

  const handleBlur = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    yup
      .reach(props.validateSchema, name)
      .validate(value)
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.message,
        });
      });
  };

  const formValidation = async (): Promise<boolean> => {
    try {
      await yup
        .reach(props.validateSchema, "")
        .validate(props.formValues, { abortEarly: false });
      return true;
    } catch (err) {
      let errors = err.inner.reduce((acc: any, current: any) => {
        if (acc[current.path]) return { ...acc };
        return { ...acc, [current.path]: current.message };
      }, {});
      setFormErrors({ ...formErrors, ...errors });
      return false;
    }
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const formValid = await formValidation();
      if (!formValid) return;

      await props.onSubmit(props.formValues);

      props.setFormValues(props.initValues);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReset = () => props.setFormValues(props.initValues);

  return props.render({
    errors: formErrors,
    onBlur: handleBlur,
    onChange: handleChange,
    onSubmit: handleSubmit,
    values: props.formValues,
    onReset: handleReset,
  });
}

export default FormRender;
