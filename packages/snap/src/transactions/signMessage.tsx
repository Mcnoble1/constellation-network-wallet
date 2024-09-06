import { dag4 } from '@stardust-collective/dag4';
import { Box, Text, Bold } from '@metamask/snaps-sdk/jsx';
import { getPrivateKey } from '../account/getPrivateKey';

export async function signMessage(message: string): Promise<string> {
  try {
    // Display a confirmation dialog before proceeding with message signing
    const confirmation = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: (
          <Box>
            <Text>
              Do you want to sign the following message?
            </Text>
            <Text>
              <Bold>{message}</Bold>
            </Text>
          </Box>
        ),
      },
    });

    if (!confirmation) {
      throw new Error('User rejected message signing');
    }

    // Retrieve the private key
    const privateKey = await getPrivateKey();

    // Sign the message with the private key
    const signature = await dag4.account.sign(message, privateKey);

    // Display a success notification
    await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'alert',
        content: (
          <Box>
            <Text>Message signed successfully!</Text>
          </Box>
        ),
      },
    });

    return signature;
  } catch (error) {
    // Display an error notification if signing fails
    await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'alert',
        content: (
          <Box>
            <Text>
              <Bold>Error:</Bold> Failed to sign the message. Please try again.
            </Text>
          </Box>
        ),
      },
    });

    throw new Error('Failed to sign message: ' + error.message);
  }
}
