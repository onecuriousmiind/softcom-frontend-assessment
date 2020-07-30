import PropTypes from "prop-types";
import React from 'react';
import { Field, HelperMessage, ErrorMessage, ValidMessage } from '@atlaskit/form';

// A tiny (≈ 800b) component (and hook) to transform any input component into formatted or masked input.
import { Rifm } from 'rifm';

import { isFunction } from '../../util';

import FormContext from './FormContext';

const FormField = (
  {
    // Regular expression to detect "accepted" symbols
    accept,
    // format function
    format,
    // use replace input mode if true,
    // use cursor visual hacks if prop provided
    mask,
    // format postprocessor called only if cursor is in the
    // last position and new symbols added, used for specific
    // use-case to add non accepted symbol when you type.
    append,
    // format postprocessor allows you to fully replace
    // any/all symbol/s preserving cursor
    replace,
    children: renderChildren,
    helpMessage,
    validMessage,
    // validate props is detached from the rest of the
    // props to avoid conflict with the base
    // FormField validate function prop.
    validate,
    ...props
  }
) => {
  const formProps = React.useContext(FormContext);

  const renderChildrenWithRifm = (
    {
      fieldProps,
      format,
      ...rifmProps
    }
  ) => {
    const { accept } = rifmProps;

    return (
      <Rifm
        value={fieldProps.value}
        onChange={fieldProps.onChange}
        format={createBaseFormatter({ accept, format })}
        {...rifmProps}
      >
        {({ value, onChange }) => renderChildren({ ...fieldProps, value, onChange, })}
      </Rifm>
    )
  };

  // Only use Rifm when any of these props are available.
  const shouldUseRifm = ([
    accept,
    mask,
    format,
  ]).some((prop) => !!prop);

  return (
    <Field
      validate={createValidator({ ...props, validate }, formProps)}
      {...props}
    >
      {({ fieldProps, error, valid, meta: { dirty } }) => {

        // Build up all Rifm props here to control strictly what
        // goes in there and also to avoid passing unnecessary props
        // down the stack/tree.
        const rifmProps = {
          accept,
          format,
          mask,
          append,
          replace,
          // Honor for form field props chain.
          // Rifm will use `value` and `onChange`
          // and pass the rest on.
          fieldProps,
        };

        return (
          <>
            {shouldUseRifm ?
              renderChildrenWithRifm(rifmProps) :
              renderChildren(fieldProps)
            }

            {helpMessage && !error && !dirty && (
              <HelperMessage>
                {helpMessage}
              </HelperMessage>
            )}

            {validMessage && !error && valid && (
              <ValidMessage>
                {validMessage}
              </ValidMessage>
            )}

            {error && (
              <ErrorMessage>
                {error}
              </ErrorMessage>
            )}
          </>
        )
      }}
    </Field>
  );
};

FormField.propTypes = {
  accept: PropTypes.instanceOf(RegExp),
  children: PropTypes.func,
  helpMessage: PropTypes.string,
  validate: PropTypes.func,
  requiredMessage: PropTypes.string,
};

const createValidator = (formFieldProps, formProps) => (value) => {
  const { getValues: getFormValues } = formProps;
  const { isRequired, requiredMessage, label, validate } = formFieldProps;
  const formValues = getFormValues();

  switch (true) {
    case isRequired && !value:
      return `${label} is required` || requiredMessage;

    default:
      return typeof validate === 'function' ? validate(value, formFieldProps, formValues) : null;
  }
};

const createBaseFormatter = (config) => (value) => {
  const { accept, format } = config;
  let formattedValue;

  if (accept) {
    formattedValue = (value.match(accept) || []).join('');
  }

  // TODO: Allow formatting with regex or an object mapping positions to delimiters.

  return isFunction(format) ? format(formattedValue) : formattedValue;
};

export default FormField;
