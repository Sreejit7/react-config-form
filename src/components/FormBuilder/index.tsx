import React, { startTransition, useEffect, useId, useState } from 'react';
import {
  FormBuilderProps,
  FormInputConfig,
  FormInputType,
  FormInputValue,
  FormState,
  FormSubmitState,
  Validator,
} from './FormBuilder.types';
import './formStyles.css';

const FormBuilder = ({
  formHeader,
  config,
  children,
  formClass,
  containerClass,
  formStyles,
  containerStyles,
  onSubmit,
}: FormBuilderProps) => {
  const formId = useId();

  const [formState, setFormState] = useState<FormState>({});
  const [formResetState, setFormResetState] = useState<FormState>({});
  const [formError, setformError] = useState(false);

  useEffect(() => {
    const initialFormState: FormState = {};

    // save the initial form state based on config
    for (const { label, initialValue, type } of config) {
      initialFormState[label] = {
        value:
          // special case for dropdown, specify a '- None -' initialValue if no initialValue present
          type === 'dropdown'
            ? !initialValue && typeof initialValue !== ('number' || 'boolean')
              ? '- None -'
              : initialValue
            : typeof initialValue !== 'undefined'
            ? initialValue
            : '',
        touched: false,
        errors: [],
      };
    }

    setFormState(initialFormState);

    startTransition(() => {
      setFormResetState(initialFormState);
    });
  }, []);

  /**
   * @description handles any input change on the form, updates the form state
   * @param label label the input
   * @param e the change event
   * @param type the input type
   * @param required boolean for whether a value is required for the input
   * @param onChange extra onchange prop for the input
   */
  const handleFormChange = (
    label: string,
    e: React.ChangeEvent<HTMLInputElement>,
    type: FormInputType,
    required = false,
    onChange?: any
  ) => {
    const currInputvalue = getValue(e, type);

    // TO-DO: remember to remove required if not used
    if (typeof onChange === 'function' && required) {
      onChange(currInputvalue);
    }

    startTransition(() => {
      setFormState(prevFormState => ({
        ...prevFormState,
        [label]: {
          ...prevFormState[label],
          value: currInputvalue,
          // errors:
          //   required &&
          //   prevFormState[label]?.touched &&
          //   typeof currInputvalue !== 'boolean' &&
          //   type !== 'number' &&
          //   // special check for dropdown, if value is `- None -`, mark an error state
          //   (!currInputvalue ||
          //     (type === 'dropdown' && currInputvalue === '- None -'))
          //     ? [`Please fill ${label}`]
          //     : [],
        },
      }));
    });
  };

  /**
   * @description handles the blur event for inputs
   * @param required boolean for whether a value is required for the input
   * @param label label for the input
   * @param e input focus event for getting the input value
   * @param type type of the input
   */
  const handleInputBlur = (
    required = false,
    label: string,
    e: React.FocusEvent<HTMLInputElement>,
    type: FormInputType,
    validators: Validator[]
  ) => {
    const value = getValue(e, type);

    let errors = getInputValidationErrors(
      label,
      value,
      validators,
      formState[label]?.errors || [],
      type,
      required
    );

    setFormState(prevFormState => ({
      ...prevFormState,
      [label]: {
        ...prevFormState[label],
        touched: !prevFormState[label]?.touched
          ? true
          : prevFormState[label]?.touched,
        errors: errors,
      },
    }));

    // reset form level error
    if (formError) {
      startTransition(() => {
        const errorExists = Object.values(formState).some(
          label => label?.errors && label?.errors.length > 0
        );
        setformError(errorExists);
      });
    }
  };

  /**
   * @description validates and submits the form, calls the onSubmit callback prop with the form state
   * @param e the form event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formSubmitState: FormSubmitState = {};

    // validate the form & create form submission state
    for (const { label, required = false, initialValue, type } of config) {
      if (required) {
        const { touched, errors, value } = formState[label];

        if (touched && errors && errors?.length > 0) {
          // prevent submission in case of an error
          setformError(true);
          return;
        } else if (
          !touched &&
          typeof initialValue !== ('number' || 'boolean') &&
          !initialValue &&
          // special check for dropdown, if value is `- None -`, mark an error state
          (!value || (type === 'dropdown' && value === '- None -'))
        ) {
          /*
           * show an error in case user didn't touch the input
           * & no valid value is present for the input
           **/
          startTransition(() => {
            setFormState(prevFormState => ({
              ...prevFormState,
              [label]: {
                ...prevFormState[label],
                errors: [`Please update ${label}`],
              },
            }));

            setformError(true);
          });

          return;
        } else {
          // form is valid
          setformError(false);
        }
      }

      // create the form submission state
      formSubmitState[label] = formState[label]?.value;
    }

    if (typeof onSubmit === 'function') {
      onSubmit(formSubmitState);

      // reset the form
      startTransition(() => {
        setFormState(formResetState);
        setformError(false);
      });
    }
  };

  /**
   * @description renders a form input based on the input type
   * @param type type of the input
   * @param inputProps props needed for the input
   * @returns the form input element
   */
  const renderInput = (
    type: FormInputType,
    {
      className,
      label = '',
      size = 'medium',
      initialValue,
      onChange,
      required = false,
      options = [],
      styles,
      placeholder = '',
      validators = [],
    }: Partial<FormInputConfig>
  ) => {
    switch (type) {
      case 'radio':
        if (options.length === 0) {
          throw new Error('please provide options for a radio input!');
        }
        return options.map(option => (
          <React.Fragment key={option}>
            <label htmlFor={`${formId}-${option}`} className="form-radio">
              <input
                className={`form-input form-input-radio ${size} ${
                  className ? className : ''
                } `}
                style={styles}
                id={`${formId}-${option}`}
                type="radio"
                value={option}
                name={`${label}`}
                checked={
                  formState[label]?.value === 'undefined'
                    ? option === initialValue
                    : option === formState[label]?.value
                }
                onChange={e =>
                  handleFormChange(label, e, type, required, onChange)
                }
                onBlur={e =>
                  handleInputBlur(required, label, e, type, validators)
                }
              />
              {option}
            </label>
          </React.Fragment>
        ));
      case 'dropdown':
        if (options.length === 0) {
          throw new Error('please provide options for a dropdown!');
        }
        return (
          <>
            <select
              className={`form-input form-input-dropdown ${size} ${
                className ? className : ''
              } `}
              style={styles}
              id={`${formId}-${label}`}
              value={
                typeof initialValue !== 'boolean'
                  ? typeof formState[label]?.value === 'undefined'
                    ? initialValue
                    : formState[label]?.value?.toString()
                  : undefined
              }
              onChange={e =>
                handleFormChange(
                  label,
                  (e as unknown) as React.ChangeEvent<HTMLInputElement>,
                  type,
                  required,
                  onChange
                )
              }
              onBlur={e =>
                handleInputBlur(
                  required,
                  label,
                  (e as unknown) as React.FocusEvent<HTMLInputElement>,
                  type,
                  validators
                )
              }
            >
              {/* Default dropdown option */}
              <option
                key="- None -"
                value="- None -"
                className={`form-input form-input-dropdown ${size} ${
                  className ? className : ''
                } `}
              >
                - None -
              </option>
              {options.map(item => (
                <option
                  key={item}
                  value={item}
                  className={`form-input form-input-dropdown ${size} ${
                    className ? className : ''
                  } `}
                >
                  {item}
                </option>
              ))}
            </select>
          </>
        );
      case 'textarea':
        return (
          <textarea
            className={`form-input ${size} ${className ? className : ''} `}
            style={styles}
            id={`${formId}-${label}`}
            value={
              typeof initialValue !== 'boolean'
                ? typeof formState[label]?.value === 'undefined'
                  ? initialValue
                  : formState[label]?.value?.toString()
                : undefined
            }
            placeholder={placeholder}
            onChange={e =>
              handleFormChange(
                label,
                (e as unknown) as React.ChangeEvent<HTMLInputElement>,
                type,
                required,
                onChange
              )
            }
            onBlur={e =>
              handleInputBlur(
                required,
                label,
                (e as unknown) as React.FocusEvent<HTMLInputElement>,
                type,
                validators
              )
            }
            rows={size === 'medium' ? 6 : size === 'large' ? 8 : 4}
            required={required}
          ></textarea>
        );
      case 'file':
        return (
          <input
            className={`form-input form-input-file ${size} ${
              className ? className : ''
            } `}
            style={styles}
            id={`${formId}-${label}`}
            type="file"
            onChange={e => handleFormChange(label, e, type, required, onChange)}
            onBlur={e => handleInputBlur(required, label, e, type, validators)}
            required={required}
          />
        );
      default:
        return (
          <input
            className={`form-input ${size} ${className ? className : ''}`}
            style={styles}
            id={`${formId}-${label}`}
            type={type}
            value={
              typeof initialValue !== 'boolean'
                ? typeof formState[label]?.value === 'undefined'
                  ? initialValue
                  : formState[label]?.value?.toString()
                : undefined
            }
            checked={
              typeof initialValue === 'boolean' &&
              typeof formState[label]?.value === 'undefined'
                ? initialValue
                : typeof formState[label]?.value === 'boolean' &&
                  !!formState[label]?.value
            }
            placeholder={placeholder}
            onChange={e => handleFormChange(label, e, type, required, onChange)}
            onBlur={e => handleInputBlur(required, label, e, type, validators)}
            required={required}
          />
        );
    }
  };

  /**
   * @description function for getting the current input value
   * @param e input event (change or focus event)
   * @param type type of the input
   * @returns the current input value based on input type
   */
  const getValue = (
    e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
    type: FormInputType
  ) => {
    switch (type) {
      case 'file':
        if (e.target.files) {
          return e.target.files[0];
        } else {
          console.error('No files detected for a file input!');
          return '';
        }
      case 'checkbox':
        return e.target.checked;
      case 'number':
        return e.target.valueAsNumber;
      default:
        return e.target.value;
    }
  };

  const getInputValidationErrors = (
    label: string,
    value: FormInputValue | File,
    validators: Validator[],
    errors: string[],
    type: FormInputType,
    required = false
  ) => {
    let updatedErrors: string[] = [...errors];

    // If input is required, handle the error behavior
    if (required) {
      const requiredInputMissing = updatedErrors[0] !== `Please fill ${label}`;
      if (
        typeof value !== 'boolean' &&
        type !== 'number' &&
        // special check for dropdown, if value is `- None -`, mark an error state
        (!value || (type === 'dropdown' && value === '- None -')) &&
        requiredInputMissing
      ) {
        updatedErrors.unshift(`Please fill ${label}`);
      } else if (!requiredInputMissing) {
        // remove the error
        updatedErrors.shift();
      }
    }

    validators.forEach(validator => {
      const { validated, errorMessage } = validator(value);
      const errorIndex = errors.findIndex(err => err === errorMessage);

      // if input is valid & error is present, remove the error
      if (validated && errorIndex !== -1) {
        updatedErrors.splice(errorIndex, 1);
      }
      // if input is invalid & error isn't present, add the error
      else if (!validated && errorIndex === -1) {
        updatedErrors = [...updatedErrors, errorMessage];
      }
    });

    return updatedErrors;
  };

  return (
    <section
      style={containerStyles}
      className={`form-container ${containerClass ? containerClass : ''}`}
    >
      {formHeader}
      <form
        style={formStyles}
        className={`form padding-md ${formClass ? formClass : ''} `}
        onSubmit={handleSubmit}
      >
        {config.map(
          ({
            label,
            labelClass,
            groupClass,
            type,
            required,
            groupHeader,
            groupFooter,
            ...inputProps
          }) => (
            <section
              className={`form-group form-group-${type} ${
                groupClass ? groupClass : ''
              }`}
              key={`${formId}-${label}`}
            >
              {groupHeader}
              <label
                htmlFor={`${formId}-${label}`}
                className={`form-label ${labelClass ? labelClass : ''} `}
              >
                {label}
                {required && <span className="form-required">*</span>}
              </label>
              {renderInput(type, { label, required, ...inputProps })}
              {formState[label]?.errors?.map(err => (
                <small key={err} className="form-group-error">
                  {/* Please {type === 'file' ? 'upload' : 'fill'} {label} */}
                  {err}
                </small>
              ))}
              {groupFooter}
            </section>
          )
        )}
        {formError && (
          <small className="form-group-error">
            Please update all required fields!
          </small>
        )}
        {children}
      </form>
    </section>
  );
};

export default FormBuilder;
