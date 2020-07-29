import React from 'react';
import PropTypes from 'prop-types';

import FormField from './FormField';
import TextField from '../textfield';

const PasswordFormField = ({ name, label, textFieldProps, shouldHaveConfirmationField, ...props }) => {
  return (
    <>
      <FormField
        name={name}
        label={label}
        defaultValue=""
        validate={validatePasswordField}
        validMessage="Now, that's one hell of a password! 😎"
        {...props}
      >
        {(fieldProps) => (
          <TextField
            {...defaultTextFieldProps}
            {...textFieldProps}
            {...fieldProps}
          />
        )}
      </FormField>

      {shouldHaveConfirmationField && <FormField
        passwordFeildName={name}
        name={`${name}Confirmation`}
        label={`${label} Confirmation`}
        defaultValue=""
        validate={validatePasswordConfirmationField}
        {...props}
      >
        {(fieldProps) => (
          <TextField
            {...defaultTextFieldProps}
            {...textFieldProps}
            {...fieldProps}
          />
        )}
      </FormField>}
    </>
  );
};

PasswordFormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  shouldHaveConfirmationField: PropTypes.bool,
};

PasswordFormField.defaultProps = {
  name: 'password',
  label: 'Password',
  shouldHaveConfirmationField: false,
};

const defaultTextFieldProps = {
  maxLength: 25,
  autoComplete: 'off',
  type: 'password',
  isMonospaced: true,
};

const validatePasswordField = (value) => {
  const passwordPolicy = {
    atLeastOneCapLetterRE: /[A-Z]/,
    atLeastOneDigitRE: /\d/,
    atLeastOneSpecialCharRE: /[^A-Za-z0-9_<>]/,
    atLeast6CharsLongRE: /.{6,}/
  };

  switch (true) {
    case !value.match(passwordPolicy.atLeastOneCapLetterRE):
      return 'Password should include at least one uppercase character.';

    case !value.match(passwordPolicy.atLeastOneDigitRE):
      return 'Password should include at least one number.';

    case !value.match(passwordPolicy.atLeastOneSpecialCharRE):
      return 'Password should include at least one special character.';

    case !passwordPolicy.atLeast6CharsLongRE.test(value):
      return 'Password should be at least 6 characters long.';

    default:
      return null;
  }
};

const validatePasswordConfirmationField = (value, { passwordFieldName }, formValues) => {
  const passwordFieldValue = formValues[passwordFieldName];

  if (value !== passwordFieldValue) {
    return 'Passwords don\'t match.';
  }

  return null;
};

export default PasswordFormField;
