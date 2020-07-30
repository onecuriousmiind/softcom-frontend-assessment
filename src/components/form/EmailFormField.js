import React from 'react';
import PropTypes from 'prop-types';

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
  // Thanks to https://emailregex.com/ for providing this email address regular expression :)
  const validEmailRegExpPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!validEmailRegExpPattern.test(value)) {
    return 'That email does not look good.'
  }

  return null;
};

export default EmailFormField;
