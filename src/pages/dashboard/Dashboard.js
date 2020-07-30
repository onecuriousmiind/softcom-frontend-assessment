import React from 'react';
import styled from 'styled-components';

const Dashboard = () => (
  <Container>
    <h2>Welcome to Softcom!</h2>
  </Container>
);

const Container = styled.div`
  display: grid;
  height: 100%;
  align-items: center;
  justify-items: center;
`;

export default Dashboard;
