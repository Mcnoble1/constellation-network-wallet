import { Button, CopyButton, Divider, Modal, rem, Stack, Text, Title } from '@mantine/core';
import QRCode from 'react-qr-code';

export const ReceiveModal = ({ opened, close, address }: { opened: boolean; close: () => void; address: string }) => {
  return (
    <Modal opened={opened} onClose={close} title={'Receive'} centered>
      <Divider mb="xl"></Divider>
      <Stack align="center" m="md">
        <QRCode value={address} />
        <Text>Your address</Text>
        <Title order={6}>{address}</Title>
        <CopyButton value={address}>
          {({ copied, copy }) => (
            <Button fullWidth color={copied ? 'teal' : 'violet'} onClick={copy} size="md">
              {copied ? 'Copied address' : 'Copy address'}
            </Button>
          )}
        </CopyButton>
      </Stack>
    </Modal>
  );
};
