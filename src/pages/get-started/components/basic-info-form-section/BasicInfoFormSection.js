import React from 'react';

import { EmailFormField, FullNameFormField, FormSection, PhoneNumberFormField } from '../../../../components';

const BasicInfoFormSection = () => (
  <FormSection title="Basic Info" description="A few personal details so we can get acquainted :)">
    <FullNameFormField isRequired />
    <EmailFormField isRequired />
    <PhoneNumberFormField isRequired />
  </FormSection>
);

export default BasicInfoFormSection;
