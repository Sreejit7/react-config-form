/** Config object for a form input element */
export interface FormInputConfig {
  label: string;
  labelClass?: string;
  initialValue?: FormInputValue;
  checked?: boolean;
  onChange?: ((value: FormInputValue) => void) | any;
  className?: string;
  styles?: React.CSSProperties;
  type: FormInputType;
  required?: boolean;
  placeholder?: string;
  size?: FormInputSize;
  options?: (string | number)[];
  groupClass?: string;
  groupHeader?: JSX.Element;
  groupFooter?: JSX.Element;
}

/** Props for FormBuilder component */
export interface FormBuilderProps {
  formHeader?: React.ReactNode;
  config: FormInputConfig[];
  formClass?: string;
  formStyles?: React.CSSProperties;
  containerClass?: string;
  containerStyles?: React.CSSProperties;
  children?: React.ReactNode;
  onSubmit: (form: FormSubmitState) => void;
}

/** State object containing current form state */
export interface FormState {
  [key: string]: {
    value: FormInputValue | File;
    error?: boolean;
    touched?: boolean;
  };
}

/** Form submission state, containing inputs & corresponding values */
export interface FormSubmitState {
  [key: string]: FormInputValue | File;
}

/** Types for a form input  */
export type FormInputType =
  | React.HTMLInputTypeAttribute
  | 'textarea'
  | 'dropdown';

type FormInputValue = string | number | boolean | undefined;

type FormInputSize = 'large' | 'medium' | 'small';
