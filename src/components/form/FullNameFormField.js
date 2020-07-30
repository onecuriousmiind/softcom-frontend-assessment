import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../textfield';

import FormField from './FormField';

const FullNameFormField = ({ textFieldProps, ...props }) => (
  <FormField validate={validateFullName} {...props}>
    {(fieldProps) => (
      <TextField
        autoComplete="off"
        placeholder="Jane Doe"
        isMonospaced
        {...textFieldProps}
        {...fieldProps}
      />
    )}
  </FormField>
);

FullNameFormField.defaultProps = {
  name: 'fullName',
  label: 'Full Name',
  defaultValue: '',
};

FullNameFormField.propTypes = {
  textFieldProps: PropTypes.object,
  defaultValue: PropTypes.string,
};

const validateFullName = (value) => {
  const fullNameValidationRE =
    /^(([A-Z]\w*-?[A-Z]?\w+)\s([A-Z]\w*-?[A-Z]?\w+))$/;

  if (!fullNameValidationRE.test(value)) {
    return "Please fill in a valid name like 'Paul Walker'. Start names with capital letters as well.";
  }

  return null;
};

export default FullNameFormField;
