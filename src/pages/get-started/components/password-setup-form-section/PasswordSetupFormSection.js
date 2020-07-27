import React from 'react';

import { FormField, FormSection } from '../../../../components';
import fields from "./fields";

const PasswordSetupFormSection = () => (
  <FormSection
    title="Setup a strong password"
    description="This is required to protect your account from unwanted access."
  >
    {fields.map(({ renderField, ...props }) => (
      <FormField key={props.name} {...props}>{renderField}</FormField>
    ))}
  </FormSection>
);

export default PasswordSetupFormSection;
