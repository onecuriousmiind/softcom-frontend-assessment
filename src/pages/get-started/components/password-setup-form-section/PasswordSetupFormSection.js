import React from 'react';

import { PasswordFormField, FormSection } from '../../../../components';

const PasswordSetupFormSection = () => (
  <FormSection
    title="Setup a strong password"
    description="This is required to protect your account from unwanted access."
  >
    <PasswordFormField
      shouldHaveConfirmationField
      isRequired
    />
  </FormSection>
);

export default PasswordSetupFormSection;
