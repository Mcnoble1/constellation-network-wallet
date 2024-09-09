import { Button, Card, CopyButton, Divider, Flex, Group, Stack, Text, ActionIcon, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconCopy, IconQrcode } from '@tabler/icons-react';
import { SendModal } from './SendModal';
import { ReceiveModal } from './ReceiveModal';
import { shortAddress } from '../utils';

type PortfolioHeaderProps = {
  balance: string;
  balanceUsd: string;
  address: string;
};
export const PortfolioHeader = ({ balance, balanceUsd, address }: PortfolioHeaderProps) => {
  const [sendModalOpened, { open: openSendModal, close: closeSendModal }] = useDisclosure(false);
  const [receiveModalOpened, { open: openReceiveModal, close: closeReceiveModal }] = useDisclosure(false);

  return (
    <Card shadow="xl" radius="md" p="lg" withBorder>
      <Group justify="space-between">
        <Group>
          <Stack gap={0} miw={20}>
            <Text size="sm" c="dimmed">
              Total
            </Text>

            <Flex justify="flex-start" align="flex-end" direction="row" wrap="wrap">
              <Text>{Number(balance) > 0 ? Number(balance).toFixed(2) : '0'} </Text>
              <Text size="xs" c="dimmed" mb={4} ml={4}>
                (${Number(balanceUsd) > 0 ? Number(balanceUsd).toFixed(2) : '0'})
              </Text>
            </Flex>
          </Stack>
          <Divider orientation="vertical" ml="md" mr="md" />
          <Stack gap={0}>
            <Text size="sm" c="dimmed">
              Constellation Wallet
            </Text>
            <Group gap="sm">
              <Text>{address ? shortAddress(address) : 'unknown'}</Text>
              <Group gap={0}>
                <CopyButton value={address} timeout={2000}>
                  {({ copied, copy }) => (
                    <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                      {copied ? <IconCheck style={{ width: rem(16) }} /> : <IconCopy style={{ width: rem(16) }} />}
                    </ActionIcon>
                  )}
                </CopyButton>

                <ActionIcon color="gray" size="md" variant="subtle" onClick={() => openReceiveModal()}>
                  <IconQrcode style={{ width: rem(18), height: rem(18) }} />
                </ActionIcon>
              </Group>
            </Group>
          </Stack>
        </Group>

        <Group gap="sm">
          <Button size="md" onClick={() => openSendModal()}>
            Send
          </Button>
          <Button size="md" onClick={() => openReceiveModal()}>
            Receive
          </Button>
        </Group>
      </Group>

      <SendModal opened={sendModalOpened} close={closeSendModal}></SendModal>
      <ReceiveModal opened={receiveModalOpened} close={closeReceiveModal} address={address}></ReceiveModal>
    </Card>
  );
};
