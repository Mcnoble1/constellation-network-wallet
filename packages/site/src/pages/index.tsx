// import styled from 'styled-components';

// import {
//   ConnectButton,
//   InstallFlaskButton,
//   ReconnectButton,
//   SendHelloButton,
//   Card,
// } from '../components';
// import { defaultSnapOrigin } from '../config';
// import {
//   useMetaMask,
//   useInvokeSnap,
//   useMetaMaskContext,
//   useRequestSnap,
// } from '../hooks';
// import { isLocalSnap, shouldDisplayReconnectButton } from '../utils';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   flex: 1;
//   margin-top: 7.6rem;
//   margin-bottom: 7.6rem;
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

// const Notice = styled.div`
//   background-color: ${({ theme }) => theme.colors.background?.alternative};
//   border: 1px solid ${({ theme }) => theme.colors.border?.default};
//   color: ${({ theme }) => theme.colors.text?.alternative};
//   border-radius: ${({ theme }) => theme.radii.default};
//   padding: 2.4rem;
//   margin-top: 2.4rem;
//   max-width: 60rem;
//   width: 100%;

//   & > * {
//     margin: 0;
//   }
//   ${({ theme }) => theme.mediaQueries.small} {
//     margin-top: 1.2rem;
//     padding: 1.6rem;
//   }
// `;

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

// const Index = () => {
//   const { error } = useMetaMaskContext();
//   const { isFlask, snapsDetected, installedSnap } = useMetaMask();
//   const requestSnap = useRequestSnap();
//   const invokeSnap = useInvokeSnap();

//   const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
//     ? isFlask
//     : snapsDetected;

//   const handleSendHelloClick = async () => {
//     await invokeSnap({ method: 'hello' });
//   };

//   return (
//     <Container>
//       <Heading>
//         Welcome to <Span>template-snap</Span>
//       </Heading>
//       <Subtitle>
//         Get started by editing <code>src/index.tsx</code>
//       </Subtitle>
//       <CardContainer>
//         {error && (
//           <ErrorMessage>
//             <b>An error happened:</b> {error.message}
//           </ErrorMessage>
//         )}
//         {!isMetaMaskReady && (
//           <Card
//             content={{
//               title: 'Install',
//               description:
//                 'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
//               button: <InstallFlaskButton />,
//             }}
//             fullWidth
//           />
//         )}
//         {!installedSnap && (
//           <Card
//             content={{
//               title: 'Connect',
//               description:
//                 'Get started by connecting to and installing the example snap.',
//               button: (
//                 <ConnectButton
//                   onClick={requestSnap}
//                   disabled={!isMetaMaskReady}
//                 />
//               ),
//             }}
//             disabled={!isMetaMaskReady}
//           />
//         )}
//         {shouldDisplayReconnectButton(installedSnap) && (
//           <Card
//             content={{
//               title: 'Reconnect',
//               description:
//                 'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
//               button: (
//                 <ReconnectButton
//                   onClick={requestSnap}
//                   disabled={!installedSnap}
//                 />
//               ),
//             }}
//             disabled={!installedSnap}
//           />
//         )}
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
//         <Notice>
//           <p>
//             Please note that the <b>snap.manifest.json</b> and{' '}
//             <b>package.json</b> must be located in the server root directory and
//             the bundle must be hosted at the location specified by the location
//             field.
//           </p>
//         </Notice>
//       </CardContainer>
//     </Container>
//   );
// };

// export default Index;


// import styled from 'styled-components';
// import {
//   ConnectButton,
//   InstallFlaskButton,
//   ReconnectButton,
//   Card,
// } from '../components';
// import { defaultSnapOrigin } from '../config';
// import {
//   useMetaMask,
//   useInvokeSnap,
//   useMetaMaskContext,
//   useRequestSnap,
// } from '../hooks';
// import { isLocalSnap, shouldDisplayReconnectButton } from '../utils';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   flex: 1;
//   margin-top: 7.6rem;
//   margin-bottom: 7.6rem;
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

// const Notice = styled.div`
//   background-color: ${({ theme }) => theme.colors.background?.alternative};
//   border: 1px solid ${({ theme }) => theme.colors.border?.default};
//   color: ${({ theme }) => theme.colors.text?.alternative};
//   border-radius: ${({ theme }) => theme.radii.default};
//   padding: 2.4rem;
//   margin-top: 2.4rem;
//   max-width: 60rem;
//   width: 100%;
//   & > * {
//     margin: 0;
//   }
//   ${({ theme }) => theme.mediaQueries.small} {
//     margin-top: 1.2rem;
//     padding: 1.6rem;
//   }
// `;

// const ErrorMessage = styled.div`
//   background-color: ${({ theme }) => theme.colors.error?.muted};
//   border: 1px solid ${({ theme }) => theme.colors.error?.default};
//   color: ${({ theme }) => theme.colors.error?.alternative};
//   border-radius: ${({ theme }) => theme.radii.default};
//   padding: 2.4rem;
//   margin-bottom: 2.4rem;
//   margin-top: 2.4rem;
//   max-width: 60rem;2
//   width: 100%;
//   ${({ theme }) => theme.mediaQueries.small} {
//     padding: 1.6rem;
//     margin-bottom: 1.2rem;
//     margin-top: 1.2rem;
//     max-width: 100%;
//   }
// `;

// const Button = styled.button`
//   padding: 1rem 2rem;
//   background-color: ${({ theme }) => theme.colors.primary?.default};
//   color: white;
//   border: none;
//   border-radius: ${({ theme }) => theme.radii.default};
//   cursor: pointer;
//   margin: 1rem;
//   &:hover {
//     background-color: ${({ theme }) => theme.colors.primary?.dark};
//   }
//   &:disabled {
//     background-color: ${({ theme }) => theme.colors.primary?.muted};
//     cursor: not-allowed;
//   }
// `;

// const Index = () => {
//   const { error } = useMetaMaskContext();
//   const { isFlask, snapsDetected, installedSnap } = useMetaMask();
//   const requestSnap = useRequestSnap();
//   const invokeSnap = useInvokeSnap();

//   const isMetaMaskReady = isLocalSnap(defaultSnapOrigin) ? isFlask : snapsDetected;

//   // Trigger the Snap functions
//   const handleCreateAccount = async () => {
//     await invokeSnap({ method: 'createAccount' });
//   };

//   const handleGetAccountAddress = async () => {
//     await invokeSnap({ method: 'getAccountAddress' });
//   };

//   const handleGetAccountBalance = async () => {
//     await invokeSnap({ method: 'getAccountBalance' });
//   };

//   const handleSignMessage = async () => {
//     const message = prompt('Enter the message you want to sign:');
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
//       <Heading>
//         Constellation Network <Span>Snap</Span> Companion dApp
//       </Heading>
//       <Subtitle>Interact with your MetaMask Snap for Constellation Network functions.</Subtitle>
//       <CardContainer>
//         {error && (
//           <ErrorMessage>
//             <b>An error happened:</b> {error.message}
//           </ErrorMessage>
//         )}
//         {!isMetaMaskReady && (
//           <Card
//             content={{
//               title: 'Install MetaMask Flask',
//               description:
//                 'To use Snaps, you need to install MetaMask Flask, a canary distribution for developers.',
//               button: <InstallFlaskButton />,
//             }}
//             fullWidth
//           />
//         )}
//         {!installedSnap && (
//           <Card
//             content={{
//               title: 'Connect to Snap',
//               description: 'Click to connect to and install the Constellation Snap.',
//               button: (
//                 <ConnectButton onClick={requestSnap} disabled={!isMetaMaskReady} />
//               ),
//             }}
//             disabled={!isMetaMaskReady}
//           />
//         )}
//         {shouldDisplayReconnectButton(installedSnap) && (
//           <Card
//             content={{
//               title: 'Reconnect to Snap',
//               description:
//                 'Reconnect to the Snap if you made any changes to update it.',
//               button: (
//                 <ReconnectButton onClick={requestSnap} disabled={!installedSnap} />
//               ),
//             }}
//             disabled={!installedSnap}
//           />
//         )}
//         {installedSnap && (
//           <>
//             <Button onClick={handleCreateAccount} disabled={!installedSnap}>
//               Create Account
//             </Button>
//             <Button onClick={handleGetAccountAddress} disabled={!installedSnap}>
//               Get Account Address
//             </Button>
//             <Button onClick={handleGetAccountBalance} disabled={!installedSnap}>
//               Get Account Balance
//             </Button>
//             <Button onClick={handleSignMessage} disabled={!installedSnap}>
//               Sign Message
//             </Button>
//             <Button onClick={handleSendTransaction} disabled={!installedSnap}>
//               Send Transaction
//             </Button>
//           </>
//         )}
//         <Notice>
//           <p>
//             This dApp allows you to interact with the Constellation Network Snap installed in your MetaMask Flask wallet. Use the buttons above to trigger Snap functions.
//           </p>
//         </Notice>
//       </CardContainer>
//     </Container>
//   );
// };

// export default Index;


import styled from 'styled-components';
import { useState, useEffect } from 'react';

import AccountDisplay from '../components/AccountDisplay';
import BalanceDisplay from '../components/BalanceDisplay';
import TransactionForm from '../components/TransactionForm';

import { useMetaMask, useMetaMaskContext, useRequestSnap, useInvokeSnap } from '../hooks';
import { defaultSnapOrigin } from '../config';
import { isLocalSnap, shouldDisplayReconnectButton } from '../utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Index = () => {
  const { error } = useMetaMaskContext();
  const { isFlask, snapsDetected, installedSnap } = useMetaMask();
  const requestSnap = useRequestSnap();
  const invokeSnap = useInvokeSnap();

  const [accountAddress, setAccountAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('');

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin) ? isFlask : snapsDetected;

  useEffect(() => {
    if (installedSnap) {
      // Fetch account address and balance
      invokeSnap({ method: 'getAccountAddress' }).then(setAccountAddress);
      invokeSnap({ method: 'getBalance' }).then(setBalance);
    }
  }, [installedSnap, invokeSnap]);

  const handleTransactionSubmit = (receiver: string, amount: string) => {
    invokeSnap({ method: 'sendTransaction', params: { receiver, amount } });
  };

  return (
    <Container>
      <Heading>Constellation Network Snap DApp</Heading>

      {error && <ErrorMessage>An error occurred: {error.message}</ErrorMessage>}

      {!isMetaMaskReady && (
        <Notice>
          Please install MetaMask Flask to proceed.
        </Notice>
      )}

      {installedSnap && (
        <>
          <AccountDisplay accountAddress={accountAddress} />
          <BalanceDisplay balance={balance} />
          <TransactionForm onSubmit={handleTransactionSubmit} />
        </>
      )}

      {!installedSnap && isMetaMaskReady && (
        <Button onClick={requestSnap}>Connect Snap</Button>
      )}

      {shouldDisplayReconnectButton(installedSnap) && (
        <Button onClick={requestSnap}>Reconnect Snap</Button>
      )}
    </Container>
  );
};

export default Index;
