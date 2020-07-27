import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Button, Form, FormHeader, Stepper } from '../../../../components';

import BasicInfoFormSection from '../basic-info-form-section';
import PasswordSetupFormSection from '../password-setup-form-section';
import PaymentCardFormSection from '../payment-card-form-section';

const Container = styled.div`
  max-width: 18rem;
  width: 100%;
  margin: 0 auto;
`;

const SubmitButton = styled(Button)`
  &[type="submit"] {
    height: 3rem;
    margin-top: 1rem;
  }
`;

export default class GetStartedForm extends PureComponent {

  handleSubmit = (formValues) => {
    console.log('submitted', formValues);
  };

  renderForm = ({ formProps, dirty, submitting }) => (
    <form {...formProps}>
      <FormHeader title="Welcome! Let's get you set up."/>

      <Stepper destroyNonVisibleStep={false}>
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

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          {this.renderForm}
        </Form>
      </Container>
    );
  }
}
