import { dag4 } from '@stardust-collective/dag4';
import { Box, Text, Bold } from '@metamask/snaps-sdk/jsx';
import { getAccountAddress } from './getAccountAddress';

export async function getAccountBalance(): Promise<string> {
  try {
    // Retrieve the account address
    const address = await getAccountAddress();

    // Fetch the balance from the DAG4 network
    const balance = await dag4.network.getAddressBalance(address);

    // Display a notification with the balance
    await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'alert',
        content: (
          <Box>
            <Text>
              The balance of address <Bold>{address}</Bold> is: <Bold>{balance}</Bold> $DAG
            </Text>
          </Box>
        ),
      },
    });

    return balance.toString();
  } catch (error) {
    // Display an error notification if something goes wrong
    await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'alert',
        content: (
          <Box>
            <Text>
              <Bold>Error:</Bold> Failed to retrieve account balance. Please try again later.
            </Text>
          </Box>
        ),
      },
    });

    throw new Error('Failed to retrieve account balance: ' + error.message);
  }
}
