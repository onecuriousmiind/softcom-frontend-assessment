import React from 'react';

import { FormField, FormSection } from '../../../../components';
import fields from './fields';

const BasicInfoFormSection = () => (
  <FormSection title="Basic Info" description="Put all your dumb basic info here">
    {fields.map(({ renderField, ...props }) => (
      <FormField key={props.name} {...props}>{renderField}</FormField>
    ))}
  </FormSection>
);

export default BasicInfoFormSection;
