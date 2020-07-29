import React from 'react';
import styled from 'styled-components';

import { GetStartedForm } from './components';

const GetStarted = () => (
  <Container>
    <GetStartedForm />
  </Container>
);

const Container = styled.div`
  display: grid;
  height: 100%;
  align-items: center;
  justify-items: center;
`;

export default GetStarted;
