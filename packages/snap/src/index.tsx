/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
/* eslint-disable no-case-declarations */
/* eslint-disable import/order */
import { dag4 } from '@stardust-collective/dag4';
import type { OnRpcRequestHandler, OnHomePageHandler, OnInstallHandler } from '@metamask/snaps-sdk';
import { Box, Text, Heading, Bold, Row } from '@metamask/snaps-sdk/jsx';
import {
  getAccount,
  getBalance,
  transferDag,
  updateAccount,
  createAccount,
} from '../account/account';
import { WalletSnapState } from './types';
import { capitalize } from './utils';
import { onHomePageUI } from './homepage';
import { onInstallUI } from './install';
import { signMessage } from './transactions/signMessage';

dag4.di.useFetchHttpClient(fetch);

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
  let wallet: WalletSnapState | null;
  const { network, address } = request?.params as { network: string; address: string };

  switch (request.method) {
    case 'connectToNetwork':
      console.log("network", network);
      wallet = await getAccount();
      if (wallet === null) throw new Error('Wallet not found');

      wallet.config.network = network;
      await updateAccount(wallet);
      return wallet;

    case 'createAccount':
      wallet = await createAccount(network);
      return wallet;

    case 'getAccount':
      wallet = await getAccount();
      return wallet;

    case 'getAccountBalance':
      const balance = await getBalance(network);
      return balance;

      case 'sendTransaction':
        wallet = await getAccount();
        if (wallet === null) throw new Error('Wallet not found');

        const { toAddress, amount, fee } = request?.params as {
          toAddress: string;
          amount: string;
          fee: string;
        };

        const confirm = await snap.request({
          method: 'snap_dialog',
          params: {
            type: 'confirmation',
            content: (
              <Box>
                <Heading>Do you want to transfer?</Heading>
                <Row label="Network:">
                  <Text>{capitalize(wallet.config.network)}</Text>
                </Row>
                <Row label="Sender:">
                  <Text>{wallet.account.address}</Text>
                </Row>
                <Row label="Receipient:">
                  <Text>{toAddress}</Text>
                </Row>
                <Row label="Amount:">
                  <Text>
                    {amount} DAG
                  </Text>
                </Row>
                <Row label="Fee:">
                  <Text>
                    {fee}
                  </Text>
                </Row>
              </Box>
            ),
          },
        });

        if (confirm === true) {
            const dagTx = await transferDag(toAddress, amount, fee);
            return dagTx;
        }

        return null;

    case 'signMessage':
      console.log(request.params);
      return await signMessage(request?.params[0]);

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
