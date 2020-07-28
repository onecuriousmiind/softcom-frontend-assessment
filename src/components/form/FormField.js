import PropTypes from "prop-types";
import React from 'react';
import { Field, HelperMessage, ErrorMessage, ValidMessage } from '@atlaskit/form';

import FormContext from './FormContext';

const FormField = ({ children: renderChildren, helpMessage, validMessage, validate, ...props }) => {
  const formProps = React.useContext(FormContext);

  return (
    <Field
      transform={createTransformer(props)}
      validate={createValidator({ ...props, validate }, formProps)}
      {...props}
    >
      {({ fieldProps, error, valid, meta: { dirty } }) => (
        <>
          {renderChildren(fieldProps)}

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
      )}
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

const createTransformer = (formFieldProps) => (event) => {
  const { accept } = formFieldProps;
  const { target: { value: newValue } } = event;

  if (accept) {

    return (newValue.match(accept) || []).join('');
  }

  return newValue;
};

export default FormField;
