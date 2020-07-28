import React from 'react';

import { EmailFormField, FullNameFormField, FormSection, PhoneNumberFormField } from '../../../../components';

const BasicInfoFormSection = () => (
  <FormSection title="Basic Info" description="Put all your dumb basic info here">
    <FullNameFormField isRequired />
    <EmailFormField isRequired />
    <PhoneNumberFormField isRequired />
  </FormSection>
);

export default BasicInfoFormSection;
