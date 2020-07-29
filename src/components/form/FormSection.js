import React from 'react';
import styled from 'styled-components';

const FormSection = ({ title, description, children }) => (
  <div>
    <Title>{title}</Title>
    <Description>{description}</Description>
    {children}
  </div>
);

const Title = styled.h3`
  margin-bottom: 0;
`;

const Description = styled.p`
  margin-top: .3rem;
  margin-bottom: 2rem;
  font-size: .9rem;
`;

export default FormSection;
