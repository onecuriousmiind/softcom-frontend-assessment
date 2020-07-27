import React from "react";

import { TextField } from "../../../../components";

export default [
  {
    name: 'fullName',
    label: 'Full Name',
    isRequired: true,
    renderField: (fieldProps) => (
      <TextField
        autoComplete="off"
        placeholder="Jane Doe"
        {...fieldProps}
        isMonospaced
      />
    ),
  },
  {
    name: 'email',
    label: 'Email',
    isRequired: true,
    renderField: (fieldProps) => (
      <TextField
        autoComplete="off"
        placeholder="e.g. jane@example.com"
        {...fieldProps}
        isMonospaced
      />
    ),
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    isRequired: true,
    renderField: (fieldProps) => (
      <TextField
        autoComplete="off"
        placeholder="Jane Doe"
        {...fieldProps}
        isMonospaced
      />
    ),
  },
];
