/* eslint-disable prettier/prettier */
// import { useState, useEffect } from 'react';
// import styled from 'styled-components';

// import {
//   ConnectButton,
//   InstallFlaskButton,
//   SendHelloButton,
//   CreateAccountButton,
//   GetAccountAddressButton,
//   GetAccountBalanceButton,
//   Card,
// } from '../components';
// import AccountDisplay from '../components/AccountDisplay';
// import BalanceDisplay from '../components/BalanceDisplay';
// import TransactionForm from '../components/TransactionForm';
// import { defaultSnapOrigin } from '../config';
// import {
//   useMetaMask,
//   useMetaMaskContext,
//   useRequestSnap,
//   useInvokeSnap,
// } from '../hooks';
// import { isLocalSnap, shouldDisplayReconnectButton } from '../utils';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-left: 5%;
//   margin-right: 5%;
//   flex: 1;
//   margin-top: 1.6rem;
//   margin-bottom: 1.6rem;
//   ${({ theme }) => theme.mediaQueries.small} {
//     padding-left: 2.4rem;
//     padding-right: 2.4rem;
//     margin-top: 2rem;
//     margin-bottom: 2rem;
//     width: auto;
//   }
// `;

// const Heading = styled.h1`
//   margin-top: 0;
//   margin-bottom: 2.4rem;
//   text-align: center;
// `;

// const Span = styled.span`
//   color: ${(props) => props.theme.colors.primary?.default};
// `;

// const Subtitle = styled.p`
//   font-size: ${({ theme }) => theme.fontSizes.large};
//   font-weight: 500;
//   margin-top: 0;
//   margin-bottom: 0;
//   ${({ theme }) => theme.mediaQueries.small} {
//     font-size: ${({ theme }) => theme.fontSizes.text};
//   }
// `;

// const CardContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   max-width: 64.8rem;
//   width: 100%;
//   height: 100%;
//   margin-top: 1.5rem;
// `;

// // const Notice = styled.div`
// //   background-color: ${({ theme }) => theme.colors.background?.alternative};
// //   border: 1px solid ${({ theme }) => theme.colors.border?.default};
// //   color: ${({ theme }) => theme.colors.text?.alternative};
// //   border-radius: ${({ theme }) => theme.radii.default};
// //   padding: 2.4rem;
// //   margin-top: 2.4rem;
// //   max-width: 60rem;
// //   width: 100%;

// //   & > * {
// //     margin: 0;
// //   }
// //   ${({ theme }) => theme.mediaQueries.small} {
// //     margin-top: 1.2rem;
// //     padding: 1.6rem;
// //   }
// // `;

// const ErrorMessage = styled.div`
//   background-color: ${({ theme }) => theme.colors.error?.muted};
//   border: 1px solid ${({ theme }) => theme.colors.error?.default};
//   color: ${({ theme }) => theme.colors.error?.alternative};
//   border-radius: ${({ theme }) => theme.radii.default};
//   padding: 2.4rem;
//   margin-bottom: 2.4rem;
//   margin-top: 2.4rem;
//   max-width: 60rem;
//   width: 100%;
//   ${({ theme }) => theme.mediaQueries.small} {
//     padding: 1.6rem;
//     margin-bottom: 1.2rem;
//     margin-top: 1.2rem;
//     max-width: 100%;
//   }
// `;

// const Button = styled.button`
//   background-color: ${({ theme }) => theme.colors.primary?.default};
//   border: 1px solid ${({ theme }) => theme.colors.primary?.default};
//   border-radius: ${({ theme }) => theme.radii.default};
//   color: ${({ theme }) => theme.colors.background?.default};
//   cursor: pointer;
//   font-size: ${({ theme }) => theme.fontSizes.large};
//   font-weight: 500;
//   margin-top: 1.2rem;
//   padding: 1.2rem 2.4rem;
//   width: 100%;
//   &:hover {
//     background-color: ${({ theme }) => theme.colors.primary?.muted};
//   }
// `;

// const Index = () => {
//   const { error } = useMetaMaskContext();
//   const { isFlask, snapsDetected, installedSnap } = useMetaMask();
//   const requestSnap = useRequestSnap();
//   const invokeSnap = useInvokeSnap();

//   const [accountAddress, setAccountAddress] = useState<string>('');
//   const [balance, setBalance] = useState<string>('');

//   const isMetaMaskReady = isLocalSnap(defaultSnapOrigin) ? isFlask : snapsDetected;

//   const handleSendHelloClick = async () => {
//     await invokeSnap({ method: 'hello' });
//   };

//   useEffect(() => {
//     if (installedSnap) {
//       // Fetch account address and balance
//       // invokeSnap({ method: 'getAccountAddress' }).then(setAccountAddress);
//       // invokeSnap({ method: 'getBalance' }).then(setBalance);
//       invokeSnap({ method: 'connectToNetwork' });
//     }
//   }, [installedSnap, invokeSnap]);

//   const handleTransactionSubmit = (receiver: string, amount: string) => {
//     invokeSnap({ method: 'sendTransaction', params: { receiver, amount } });
//   };

//   // Trigger the Snap functions
//   const handleCreateAccount = async () => {
//     await invokeSnap({ method: 'createAccount' });
//   };

//   const handleGetAccountAddress = async () => {
//     const address = await invokeSnap({ method: 'getAccountAddress' });
//     setAccountAddress(address);
//   };

//   const handleGetAccountBalance = async () => {
//     const bal = await invokeSnap({ method: 'getAccountBalance' });
//     setBalance(bal);
//   };

//   const handleSignMessage = async () => {
//     const message = "Hello there!";
//     if (message) {
//       await invokeSnap({ method: 'signMessage', params: [message] });
//     }
//   };

//   const handleSendTransaction = async () => {
//     const to = prompt('Enter the recipient address:');
//     const amount = prompt('Enter the amount of DAG to send:');
//     if (to && amount) {
//       await invokeSnap({ method: 'sendTransaction', params: [to, parseFloat(amount)] });
//     }
//   };

//   return (
//     <Container>
//       <Subtitle>Interact with your MetaMask Snap for Constellation Network functions.</Subtitle>
//       <CardContainer>
//          {error && (
//           <ErrorMessage>
//             <b>An error happened:</b> {error.message}
//           </ErrorMessage>
//         )}
//       {!isMetaMaskReady && (
//         <Card
//           content={{
//             title: 'Install',
//             description:
//               'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
//             button: <InstallFlaskButton />,
//           }}
//           fullWidth
//         />
//       )}

//       {!installedSnap && isMetaMaskReady && (
//           <Card
//             content={{
//               title: 'Connect',
//               description:
//                 'Get started by installing the constellation network snap.',
//               button: (
//                 <ConnectButton
//                   onClick={requestSnap}
//                   disabled={!isMetaMaskReady}
//                 />
//               ),
//             }}
//           />
//         )}

//       {isMetaMaskReady && (
//         <Card
//           content={{
//             title: 'Send Hello message',
//             description:
//               'Display a custom message within a confirmation screen in MetaMask.',
//             button: (
//               <SendHelloButton
//                 onClick={handleSendHelloClick}
//                 disabled={!installedSnap}
//               />
//             ),
//           }}
//           disabled={!installedSnap}
//           fullWidth={
//             isMetaMaskReady &&
//             Boolean(installedSnap) &&
//             !shouldDisplayReconnectButton(installedSnap)
//           }
//         />
//       )}

//       {installedSnap && (
//         <>
//           <AccountDisplay accountAddress={accountAddress} />
//           <BalanceDisplay balance={balance} />
//           <TransactionForm onSubmit={handleTransactionSubmit} />
//         </>
//       )}

//         {installedSnap && (
//           <>
//             <CreateAccountButton onClick={handleCreateAccount} disabled={!installedSnap}>
//               Create Account
//             </CreateAccountButton>
//             <GetAccountAddressButton onClick={handleGetAccountAddress} disabled={!installedSnap}>
//               Get Account Address
//             </GetAccountAddressButton>
//             <GetAccountBalanceButton onClick={handleGetAccountBalance} disabled={!installedSnap}>
//               Get Account Balance
//             </GetAccountBalanceButton>
//             <SendHelloButton onClick={handleSignMessage} disabled={!installedSnap}>
//               Sign Message
//             </SendHelloButton>
//           </>
//         )}
//       </CardContainer>
//     </Container>
//   );
// };

// export default Index;


import React, { useState } from "react";
import AccountDisplay from "../components/AccountDisplay";
import SendModal from "../components/SendModal";
import ReceiveModal from "../components/ReceiveModal";
import NetworkDropdown from "../components/NetworkDropdown";
import TransactionTable from "../components/TransactionTable";

const Wallet = () => {
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);

  const handleSendClick = () => {
    setShowSendModal(true);
  };

  const handleReceiveClick = () => {
    setShowReceiveModal(true);
  };

  return (
    <div className="p-8 bg-gray min-h-screen">
      <div className="flex justify-between mb-6">
      <AccountDisplay onSendClick={handleSendClick} onReceiveClick={handleReceiveClick} />
        <NetworkDropdown />
      </div>
      <TransactionTable />

      {showSendModal && <SendModal onClose={() => setShowSendModal(false)} />}
      {showReceiveModal && <ReceiveModal onClose={() => setShowReceiveModal(false)} />}
    </div>
  );
};

export default Wallet;
