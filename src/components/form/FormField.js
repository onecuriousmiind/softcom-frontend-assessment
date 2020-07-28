import PropTypes from "prop-types";
import React from 'react';
import { Field, HelperMessage, ErrorMessage, ValidMessage } from '@atlaskit/form';

import FormContext from './FormContext';

const FormField = ({ children: renderChildren, helpMessage, validMessage, validate, ...props }) => {
  const formProps = React.useContext(FormContext);

  return (
    <Field validate={createValidator({ ...props, validate }, formProps)} {...props}>
      {({ fieldProps, error, valid }) => (
        <>
          {renderChildren(fieldProps)}

          {helpMessage && !error && (
            <HelperMessage>
              {helpMessage}
            </HelperMessage>
          )}

          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}

          {validMessage && !error && valid && (
            <ValidMessage>
              {validMessage}
            </ValidMessage>
          )}
        </>
      )}
    </Field>
  );
};

FormField.propTypes = {
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

export default FormField;
