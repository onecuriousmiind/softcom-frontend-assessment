import React from 'react';
import PropTypes from 'prop-types';

import { VALID_EMAIL_REGEX } from '../../util';

import TextField from '../textfield';

import FormField from './FormField';

const EmailFormField = ({ textFieldProps, ...props }) => (
  <FormField validate={validateEmail} {...props}>
    {(fieldProps) => (
      <TextField
        autoComplete="off"
        placeholder="e.g. jane@example.com"
        isMonospaced
        {...textFieldProps}
        {...fieldProps}
      />
    )}
  </FormField>
);

EmailFormField.defaultProps = {
  name: 'email',
  label: 'Email',
  defaultValue: '',
};

EmailFormField.propTypes = {
  textFieldProps: PropTypes.object,
  defaultValue: PropTypes.string,
};

const validateEmail = (value) => {
  if (!VALID_EMAIL_REGEX.test(value)) {
    return 'That email does not look good.'
  }

  return null;
};

export default EmailFormField;
