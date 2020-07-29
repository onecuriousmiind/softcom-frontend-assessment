import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { Button, Form, FormHeader, Stepper } from '../../../../components';

import BasicInfoFormSection from '../basic-info-form-section';
import PasswordSetupFormSection from '../password-setup-form-section';
import PaymentCardFormSection from '../payment-card-form-section';

const Container = styled.div`
  max-width: 18rem;
  width: 100%;
`;

const SubmitButton = styled(Button)`
  &[type="submit"] {
    height: 3rem;
    margin-top: 1rem;
    font-weight: bold;
  }
`;

const GetStartedForm = () => {
  const history = useHistory();

  const handleSubmit = () => {
    history.push('/dashboard');
  };

  const createCanStepDeterminer = ({ ref: formRef, onSubmit }) => async () => {
    // Call onSubmit to mark invalid fields.
    await onSubmit();

    // Proceed if there are no more invalid
    // fields on current step else stay put.
    return !(Array
      .from(formRef.current.querySelectorAll("input[aria-invalid='true']"))
      .filter((element) => {
        element.focus();

        return element === document.activeElement;
      }).length);
  };

  const renderForm = ({ formProps, dirty, submitting }) => (
    <form {...formProps}>
      <FormHeader title="Welcome! Let's get you set up." />

      <Stepper
        destroyNonVisibleStep={false}
        canStep={createCanStepDeterminer(formProps)}
      >
        <Stepper.Step>
          <BasicInfoFormSection />
        </Stepper.Step>

        <Stepper.Step>
          <PasswordSetupFormSection />
        </Stepper.Step>

        <Stepper.Step>
          <PaymentCardFormSection />

          <SubmitButton
            type="submit"
            appearance="primary"
            disabled={submitting}
            isLoading={submitting}
            shouldFitContainer
          >
            Complete
          </SubmitButton>
        </Stepper.Step>
      </Stepper>
    </form>
  );

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {renderForm}
      </Form>
    </Container>
  );
};

export default GetStartedForm;
