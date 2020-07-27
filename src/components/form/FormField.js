import PropTypes from "prop-types";
import React, { Fragment } from 'react';

import { Field, HelperMessage, ErrorMessage } from '@atlaskit/form'

const FormField = ({ children: renderChildren, helpMessage, validate, ...props }) => {
  return (
    <Field validate={createValidator({ ...props, validate })} {...props}>
      {({ fieldProps, error }) => (
        <Fragment>
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
        </Fragment>
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

const createValidator = (formFieldProps) => (value) => {
  const { isRequired, requiredMessage, label, validate } = formFieldProps;

  switch (true) {
    case isRequired && !value:
      return `${label} is required` || requiredMessage;

    default:
      return typeof validate === 'function' ? validate(value, formFieldProps) : null;
  }
};

export default FormField;
