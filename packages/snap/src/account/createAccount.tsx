import { Box, Text, Bold, Address } from '@metamask/snaps-sdk/jsx';
import { dag4 } from '@stardust-collective/dag4';

export async function createAccount(): Promise<string> {
  const confirmation = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: (
        <Box>
          <Text>
            Do you want to create a <Bold>Constellation Network </Bold> account?
          </Text>
        </Box>
      ),
    },
  });

  if (!confirmation) {
    throw new Error('User rejected account creation');
  }

  // Create the account using DAG4.js
  const privateKey = dag4.keyStore.generatePrivateKey();
  dag4.account.loginPrivateKey(privateKey);
  const accountAddress : string = dag4.account.address;

  // Store the account address securely in MetaMask Snap state
  await snap.request({
    method: 'snap_manageState',
    params: { operation: 'update', newState: { account: accountAddress } },
  });

  // Show a confirmation dialog with the account address
  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: (
        <Box>
          <Text>
            Account created successfully! DAG Address
            </Text>
           <Address address={accountAddress} />
        </Box>
      ),
    },
  });

  return accountAddress;
}
