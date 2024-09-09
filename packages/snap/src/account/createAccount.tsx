import { Box, Text, Bold, Address } from '@metamask/snaps-sdk/jsx';
import { dagDi } from '@stardust-collective/dag4-core';
import { dag4 } from '@stardust-collective/dag4';
import { getAccount } from './getPrivateKey';

dagDi.useFetchHttpClient(fetch);

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

  const account = await getAccount();
  console.log('AccountPrivate created successfully:', account);

  const accountAddress : string = dag4.account.address;
  console.log('Account created successfully:', accountAddress);

  const accountBalance = await dag4.network.getAddressBalance(accountAddress);
  const balance = accountBalance.balance;
  console.log('Account Balance:', accountBalance);
  console.log('Balance:', balance);

  const publickey = dag4.account.publicKey;
  console.log('Public Key:', publickey);
  // Store the account address securely in MetaMask Snap state
  await snap.request({
    method: 'snap_manageState',
    params: { operation: 'update', newState: { account: accountAddress, publickey: publickey } },
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
           <Bold>{accountAddress}</Bold>
           <Text>
            Public Key
            </Text>
           <Bold>{publickey}</Bold>
        </Box>
      ),
    },
  });

  return accountAddress;
}
