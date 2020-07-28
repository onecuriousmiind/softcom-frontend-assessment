import React from 'react';

import { FormField, FormSection } from '../../../../components';
import fields from "./fields";

const PaymentCardFormSection = () => (
  <FormSection
    title="Add a payment card"
    description="This is a one-time set up so we can charge you seamlessly subsequently."
  >
    {fields.map(({ renderField, ...props }) => (
      <FormField key={props.name} {...props}>{renderField}</FormField>
    ))}
  </FormSection>
);

export default PaymentCardFormSection;
