import { Box, Text, Bold } from '@metamask/snaps-sdk/jsx';

export const getAccountAddress = async (): Promise<string> => {
  // Retrieve the account address from MetaMask Snap state
  const state = await snap.request({
    method: 'snap_manageState',
    params: { operation: 'get' },
  });

  if (!state || !state.account) {
    // Show a notification if no account is found
    await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'alert',
        content: (
          <Box>
            <Text>
              <Bold>No account found!</Bold> Please create an account first.
            </Text>
          </Box>
        ),
      },
    });
    throw new Error('No account found');
  }

  // Show a notification with the retrieved account address
  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: (
        <Box>
          <Text>
            Your DAG Address is: <Bold>{state.account}</Bold>
          </Text>
        </Box>
      ),
    },
  });

  return state.account;
};
