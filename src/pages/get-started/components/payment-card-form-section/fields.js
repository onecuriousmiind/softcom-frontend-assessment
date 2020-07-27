import React from "react";

import { TextField } from "../../../../components";

export default [
  {
    name: 'cardNumber',
    label: 'Debit / Credit Card Number',
    isRequired: true,
    renderField: (fieldProps) => (
      <TextField
        maxLength={19}
        autoComplete="off"
        {...fieldProps}
        isMonospaced
      />
    ),
  },
  {
    name: 'expirationDate',
    label: 'Expiration Date',
    isRequired: true,
    renderField: (fieldProps) => (
      <TextField
        maxLength={5}
        autoComplete="off"
        width="xsmall"
        {...fieldProps}
        isMonospaced
      />
    ),
  },
  {
    name: 'pin',
    label: 'PIN',
    isRequired: true,
    renderField: (fieldProps) => (
      <TextField
        type="password"
        autoComplete="off"
        maxLength={4}
        width="small"
        {...fieldProps}
        isMonospaced
      />
    ),
  },
];
