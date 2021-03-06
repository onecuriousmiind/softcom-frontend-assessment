import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../textfield';

import FormField from './FormField';

const PhoneNumberFormField = ({ textFieldProps, ...props }) => (
  <FormField
    accept={/\d+/g}
    validate={validatePhoneNumber}
    {...props}
  >
    {(fieldProps) => (
      <TextField
        type="tel"
        autoComplete="off"
        placeholder="e.g. 08100000000"
        maxLength={11}
        isMonospaced
        {...textFieldProps}
        {...fieldProps}
      />
    )}
  </FormField>
);

PhoneNumberFormField.defaultProps = {
  name: 'phoneNumber',
  label: 'Phone Number',
  helpMessage: 'Accepts only Nigerian phone numbers. Country code is not required.',
  defaultValue: '',
};

PhoneNumberFormField.propTypes = {
  textFieldProps: PropTypes.object,
  defaultValue: PropTypes.string,
};

const validatePhoneNumber = (value) => {
  const phoneNumberValidatorRE =
    /^((070|080|090|081)\d{8})$/;

  if (!phoneNumberValidatorRE.test(value)) {
    return 'Please fill in a valid phone number.';
  }

  return null;
};

export default PhoneNumberFormField;
