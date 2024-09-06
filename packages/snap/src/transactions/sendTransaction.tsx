import { dag4 } from '@stardust-collective/dag4';
import { Box, Text, Bold } from '@metamask/snaps-sdk/jsx';
import { getPrivateKey } from '../account/getPrivateKey';

export async function sendTransaction(to: string, amount: number): Promise<string> {
  try {
    // Display a confirmation dialog before proceeding with the transaction
    const confirmation = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: (
          <Box>
            <Text>
              Do you want to send <Bold>{amount}</Bold> DAG to <Bold>{to}</Bold>?
            </Text>
          </Box>
        ),
      },
    });

    if (!confirmation) {
      throw new Error('User rejected transaction');
    }

    // Retrieve the private key
    const privateKey = await getPrivateKey();

    // Create and sign the transaction
    const transaction = await dag4.account.transferDag(to, amount, 0, privateKey);

    // Display a success notification with the transaction hash
    await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'alert',
        content: (
          <Box>
            <Text>Transaction successful! Tx Hash: <Bold>{transaction.hash}</Bold></Text>
          </Box>
        ),
      },
    });

    return transaction.hash;
  } catch (error) {
    // Display an error notification if the transaction fails
    await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'alert',
        content: (
          <Box>
            <Text>
              <Bold>Error:</Bold> Transaction failed. Please try again.
            </Text>
          </Box>
        ),
      },
    });

    throw new Error('Failed to send transaction: ' + error.message);
  }
}
