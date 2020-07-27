import React from "react";

import { TextField } from "../../../../components";

export default [
  {
    name: 'password',
    label: 'Password',
    isRequired: true,
    renderField: (fieldProps) => (
      <TextField
        type="password"
        maxLength={25}
        autoComplete="off"
        {...fieldProps}
        isMonospaced
      />
    ),
  },
  {
    name: 'passwordRepeat',
    label: 'Password Repeat',
    isRequired: true,
    renderField: (fieldProps) => (
      <TextField
        type="password"
        maxLength={25}
        autoComplete="off"
        {...fieldProps}
        isMonospaced
      />
    ),
  },
];
