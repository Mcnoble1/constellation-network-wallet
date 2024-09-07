import React, { useState } from 'react';
import styled from 'styled-components';

import { SendTransactionButton } from './Buttons';

const FormContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  border-radius: ${({ theme }) => theme.radii.default};
`;

const FormHeading = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  border-radius: ${({ theme }) => theme.radii.default};
  width: 100%;
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.colors.primary?.default};
  color: ${({ theme }) => theme.colors.text?.alternative};
  border: none;
  border-radius: ${({ theme }) => theme.radii.default};
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background?.alternative};
    cursor: not-allowed;
  }
`;

interface TransactionFormProps {
  onSubmit: (receiver: string, amount: string) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(receiver, amount);
  };

  return (
    <FormContainer>
      <FormHeading>Send Transaction</FormHeading>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Receiver Address"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Amount (DAG)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <SendTransactionButton disabled={!receiver || !amount} />
      </Form>
    </FormContainer>
  );
};

export default TransactionForm;
