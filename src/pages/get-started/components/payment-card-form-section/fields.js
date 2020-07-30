import React from "react";

import { TextField } from "../../../../components";

export default [
  {
    name: 'cardNumber',
    label: 'Debit / Credit Card Number',
    isRequired: true,
    accept: /\d+/g,
    defaultValue: '',
    format(value) {
      const chars = value.split('');
      const positionsToIncludeSpace = [ 4, 8, 12 ];

      return chars
        .reduce(
          (accumulatedChars, currentChar, index) => (
            positionsToIncludeSpace.includes(index) ?
              `${accumulatedChars} ${currentChar}` :
              `${accumulatedChars}${currentChar}`
          ),
          ''
        );
    },
    validate(value) {
      const validCardNumberRE = /(\d{4}\s?){4}/;

      if (!validCardNumberRE.test(value)) {
        return 'Please fill in a valid credit/debit card number.';
      }

      return null;
    },
    renderField: (fieldProps) => (
      <TextField
        maxLength={19}
        autoComplete="off"
        placeholder="0000 0000 0000 0000"
        isMonospaced
        {...fieldProps}
      />
    ),
  },
  {
    name: 'expirationDate',
    label: 'Expiration Date',
    isRequired: true,
    accept: /\d+/g,
    defaultValue: '',
    format(value) {
      const chars = value.split('');

      return chars
        .reduce(
          (accumulatedChars, currentChar, index) => (
            index === 2 ?
              `${accumulatedChars}/${currentChar}` :
              `${accumulatedChars}${currentChar}`
          ),
          ''
        );
    },
    validate(value) {
      const validDateRE = /\d{2}\/\d{2}/;

      if (!validDateRE.test(value)) {
        return 'Please fill in a valid date';
      }

      return null;
    },
    renderField: (fieldProps) => (
      <TextField
        maxLength={5}
        autoComplete="off"
        placeholder="MM/YY"
        isMonospaced
        {...fieldProps}
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
        isMonospaced
        {...fieldProps}
      />
    ),
  },
];
