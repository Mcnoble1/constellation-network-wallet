import React from 'react';
import styled from 'styled-components';

const BalanceContainer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  border-radius: ${({ theme }) => theme.radii.default};
`;

const BalanceHeading = styled.h2`
  margin-bottom: 0.5rem;
`;

interface BalanceDisplayProps {
  balance: string;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
  return (
    <BalanceContainer>
      <BalanceHeading>Account Balance</BalanceHeading>
      <p>{balance} DAG</p>
    </BalanceContainer>
  );
};

export default BalanceDisplay;
