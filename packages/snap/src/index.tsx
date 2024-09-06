import type { OnRpcRequestHandler, OnHomePageHandler, OnInstallHandler } from '@metamask/snaps-sdk';
import { Box, Text, Heading, Bold } from '@metamask/snaps-sdk/jsx';
import { createAccount } from './account/createAccount';
import { getAccountAddress } from './account/getAccountAddress';
import { getAccountBalance } from './account/getAccountBalance';
import { signMessage } from './transactions/signMessage';
import { sendTransaction } from './transactions/sendTransaction';
import { onInstallUI } from './install';
import { onHomePageUI } from './homepage'


/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */


export const onHomePage: OnHomePageHandler = onHomePageUI

export const onInstall: OnInstallHandler = onInstallUI

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'createAccount':
      return await createAccount();
    case 'getAccountAddress':
      return await getAccountAddress();
    case 'getAccountBalance':
      return await getAccountBalance();
    case 'signMessage':
      if (typeof request.params !== 'object' || !request.params.message) {
        throw new Error('Invalid parameters');
      }
      return await signMessage(request.params.message);
    case 'sendTransaction':
      if (
        typeof request.params !== 'object' ||
        !request.params.to ||
        !request.params.amount
      ) {
        throw new Error('Invalid parameters');
      }
      return await sendTransaction(request.params.to, request.params.amount);
    case 'hello':
      console.log("Received 'hello' request from", origin, request);
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: (
            <Box>
              <Text>
                Hello, <Bold>{origin}</Bold>!
              </Text>
              <Text>
                This custom confirmation is just for display purposes.
              </Text>
              <Text>
                But you can edit the snap source code to make it do something,
                if you want to!
              </Text>
            </Box>
          ),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};
