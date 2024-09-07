import React from 'react';
import styled from 'styled-components';

const AddressContainer = styled.div`
  margin-top: 0.5rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  border-radius: ${({ theme }) => theme.radii.default};
`;

const AddressHeading = styled.h2`
  margin-bottom: 0.5rem;
`;

interface AccountDisplayProps {
  accountAddress: string;
}

const AccountDisplay: React.FC<AccountDisplayProps> = ({ accountAddress }) => {
  return (
    <AddressContainer>
      <AddressHeading>Account Address</AddressHeading>
      <p>{accountAddress}</p>
    </AddressContainer>
  );
};

export default AccountDisplay;
