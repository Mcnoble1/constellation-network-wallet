import { BIP44Node, getBIP44AddressKeyDeriver } from '@metamask/key-tree';

/**
 * Derive the single account we're using for this snap.
 * The path of the account is m/44'/1'/0'/0/0.
 */
export const getAccount = async (): Promise<BIP44Node> => {
  const dagTestnetNode = await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: 1137, // 1 is for all Testnets
    },
  });

  const deriveDagTestnetPrivateKey = await getBIP44AddressKeyDeriver(
    dagTestnetNode,
  );

  return deriveDagTestnetPrivateKey(0);
};




// import { Box, Text, Bold } from '@metamask/snaps-sdk/jsx';
// import { snap } from '@metamask/snaps-sdk';

// export async function getPrivateKey(): Promise<string> {
//   // Show a warning dialog to confirm the private key retrieval
//   const confirmation = await snap.request({
//     method: 'snap_dialog',
//     params: {
//       type: 'confirmation',
//       content: (
//         <Box>
//           <Text>
//             <Bold>Warning:</Bold> Revealing your private key can be risky. Are you sure you want to proceed?
//           </Text>
//         </Box>
//       ),
//     },
//   });

//   if (!confirmation) {
//     throw new Error('User rejected private key retrieval');
//   }

//   // Retrieve the private key from MetaMask Snap state
//   const state = await snap.request({
//     method: 'snap_manageState',
//     params: { operation: 'get' },
//   });

//   if (!state || !state.privateKey) {
//     // Show an error notification if no private key is found
//     await snap.request({
//       method: 'snap_dialog',
//       params: {
//         type: 'alert',
//         content: (
//           <Box>
//             <Text>
//               <Bold>Error:</Bold> No private key found. Please create an account first.
//             </Text>
//           </Box>
//         ),
//       },
//     });
//     throw new Error('No private key found');
//   }

//   // Show a notification with the private key
//   await snap.request({
//     method: 'snap_dialog',
//     params: {
//       type: 'alert',
//       content: (
//         <Box>
//           <Text>
//             Your private key is: <Bold>{state.privateKey}</Bold>
//           </Text>
//         </Box>
//       ),
//     },
//   });

//   return state.privateKey;
// }
