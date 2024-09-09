import { dag4 } from '@stardust-collective/dag4';
import { Box, Text, Bold } from '@metamask/snaps-sdk/jsx';

export const connectToNetwork = async () => {
  // Connect to Constellation testnet or mainnet
  dag4.account.connect({
    networkVersion: '2.0',   // Use '1.0' for mainnet 1.0 support
    testnet: true,           // Set to false for mainnet
  });

  // await snap.request({
  //   method: 'snap_dialog',
  //   params: {
  //     type: 'alert',
  //     content: (
  //       <Box>
  //         <Text>
  //           Connected to Constellation Testnet
  //         </Text>
  //       </Box>
  //     ),
  //   },
  // });
};


