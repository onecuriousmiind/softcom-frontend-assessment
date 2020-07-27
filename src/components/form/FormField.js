import React, { Fragment } from 'react';

import { Field, HelperMessage, ErrorMessage } from '@atlaskit/form'

const FormField = ({ children: renderChildren, helpMessage, ...props }) => {
  return (
    <Field {...props}>
      {({ fieldProps, error }) => (
        <Fragment>
          {renderChildren(fieldProps)}

          {helpMessage && !error && (
            <HelperMessage>
              {helpMessage}
            </HelperMessage>
          )}

          {error && (
            <ErrorMessage>
              Custom error message goes here ...
            </ErrorMessage>
          )}
        </Fragment>
      )}
    </Field>
  );
};

export default FormField;
