import React from 'react';
import PropTypes from 'prop-types';

import BaseForm from '@atlaskit/form';

import FormContext from './FormContext';

const Form = ({ children, ...props }) => {
  // This allows child components of Form to access `renderFormProps`
  // in two ways. Via context and through the function passed as `children`.
  // With context, values are more accessible deep within the form child components
  // without drilling props downwards.
  const renderForm = (renderFormProps) => (
    <FormContext.Provider value={renderFormProps}>
      {children(renderFormProps)}
    </FormContext.Provider>
  );

  return (
    <BaseForm {...props}>
      {renderForm}
    </BaseForm>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

export default Form;
