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
    accept: /\d+/g,
    defaultValue: '',
    helpMessage: 'Fill in a 4-digit PIN.',
    validMessage: 'Perfect!',
    validate(value) {
      const shouldBe4CharsLongRE = /.{4,}/;

      if (!shouldBe4CharsLongRE.test(value)) {
        return 'Should be 4 character long.';
      }

      return null;
    },
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
