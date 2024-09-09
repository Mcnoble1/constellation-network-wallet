import { Alert, Button, Divider, Modal, NumberInput, rem, Stack, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconInfoCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useInvokeSnap, useRequestSnap, useWalletContext } from '../hooks';
import { Asset, Transaction } from 'src/types/snap';

type SendModalProps = {
  opened: boolean;
  close: () => void;
  asset?: Asset;
};

export const SendModal = ({
  opened,
  close,
  asset = { symbol: 'DAG', icon: 'https://stargazer-assets.s3.us-east-2.amazonaws.com/logos/dag.png' } as Asset,
}: SendModalProps) => {
  const [amount, setAmount] = useState(0);
  const [receipient, setReceipient] = useState('');
  const requestSnap = useRequestSnap();
  const invokeSnap = useInvokeSnap();
  const { wallet, setWallet } = useWalletContext();

  const sendHandleClicked = () => {
    try {
      invokeSnap({
        method: 'transfer',
        params: {
          toAddress: receipient,
          amount: amount.toString(),
          fee: '0',
          metagraphId: asset.id,
        },
      }).then((res) => {

        close();
        setAmount(0);
        setReceipient('');

        const tx = res as Transaction;
        if (!tx) {
          setTimeout(() => {
            notifications.show({
              title: `Error`,
              message: `User rejected the operation or something went wrong!`,
              autoClose: 5000,
              color: 'red',
              position: 'top-center',
              style: { position: 'absolute', top: 10, left: '25%', right: '25%' },
            });
          }, 200);
        } else {
          setTimeout(() => {
            notifications.show({
              title: `You're sending ${tx.amount} ${asset?.symbol}`,
              message: (
                <div>
                  Transaction{' '}
                  <a
                    style={{ textDecoration: 'none' }}
                    target="_blank"
                    href={`https://${wallet?.config.network}.dagexplorer.io/transactions/${tx.hash}`}
                  >
                    {tx.hash}
                  </a>{' '}
                  is underway
                </div>
              ),
              autoClose: 5000,
              color: 'green',
              position: 'top-center',
              style: { position: 'absolute', top: 10, left: '25%', right: '25%' },
            });
          }, 200);
        }
      });
    } catch (error: any) {
      close();
    }
  };

  return (
    <Modal size="md" opened={opened} onClose={close} title="Send" centered>
      <Divider mb="md"></Divider>
      <Stack gap="xs">
        <NumberInput
          leftSectionPointerEvents="none"
          leftSection={<img src={asset?.icon} width={36}></img>}
          rightSection={<Text>{asset?.symbol}</Text>}
          rightSectionWidth={60}
          label={<Text size="sm">Token</Text>}
          placeholder="0"
          size="lg"
          styles={{ input: { textAlign: 'right' } }}
          value={amount}
          onChange={(val) => setAmount(Number(val))}
        />

        <TextInput
          label={<Text size="sm">Recipient</Text>}
          value={receipient}
          placeholder="Paste recipient address here"
          onChange={(e) => setReceipient(e.target.value)}
        />
        <Alert color="green" variant="light" title="" icon={<IconInfoCircle />}>
          <Text size="xs">
            Please only enter a valid Constellation address. Sending funds to a different network might result in
            permanent loss.
          </Text>
        </Alert>

        <Button fullWidth mt="md" size="lg" onClick={sendHandleClicked} disabled={amount === 0 || receipient === ''}>
          Send
        </Button>
      </Stack>
    </Modal>
  );
};
