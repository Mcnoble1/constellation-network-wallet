import { Asset } from 'src/types/snap';
import { Group, Card, Stack, Table, Text, Title, Button } from '@mantine/core';
import { SendModal } from './SendModal';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

type PortfolioAssetsProps = {
  assets: Asset[];
};

export const PortfolioAssets = ({ assets }: PortfolioAssetsProps) => {
  const [sendModalOpened, { open: openSendModal, close: closeSendModal }] = useDisclosure(false);
  const [hoverRowId, setHoverRowId] = useState('');
  const [asset, setAsset] = useState<Asset>({ symbol: 'DAG' } as Asset);

  return (
    <Card shadow="xl" radius="md" withBorder>
      <Title order={3} mb="md">
        Assets
      </Title>

      <Table horizontalSpacing="xs" verticalSpacing="xs" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th c="dimmed">Name</Table.Th>
            <Table.Th c="dimmed">Price</Table.Th>
            <Table.Th c="dimmed">Amount</Table.Th>
            <Table.Th miw={100}></Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {assets.map((asset) => (
            <Table.Tr
              key={asset.name}
              onMouseEnter={() => {
                setHoverRowId(asset.id);
                setAsset(asset);
              }}
              onMouseLeave={() => {
                setHoverRowId('');
              }}
            >
              <Table.Td>
                <Group>
                  <img src={asset.icon} width={36}></img>
                  <Stack gap={0}>
                    <Text size="sm">{asset.name}</Text>
                    <Text size="sm" c="dimmed">
                      {asset.symbol}
                    </Text>
                  </Stack>
                </Group>
              </Table.Td>
              <Table.Td>${Number(asset.price) > 0 ? Number(asset.price).toFixed(4) : asset.price}</Table.Td>
              <Table.Td>{asset.amount}</Table.Td>
              <Table.Td>{asset.id == hoverRowId && <Button onClick={() => openSendModal()}> Send</Button>} </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <SendModal asset={asset} opened={sendModalOpened} close={closeSendModal}></SendModal>
    </Card>
  );
};
