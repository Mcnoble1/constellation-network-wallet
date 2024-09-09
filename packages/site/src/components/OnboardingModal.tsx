import { Alert, Box, Button, Divider, FocusTrap, Modal, Skeleton, Text } from '@mantine/core';
import { IconInfoCircle, IconWallet, IconUserCheck, IconUserCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { Stepper, Group } from '@mantine/core';

import { useMetaMask, useInvokeSnap, useMetaMaskContext, useRequestSnap, useWalletContext } from '../hooks';
import { ReactComponent as FlaskFox } from '../assets/flask_fox.svg';
import { isLocalSnap, setLocalStorage, shouldDisplayReconnectButton } from '../utils';
import { defaultSnapOrigin } from '../config';
import { Balance, WalletSnapState } from 'src/types/snap';

export const OnboardingModal = ({ opened, close }: { opened: boolean; close: () => void }) => {
  const { wallet, setWallet } = useWalletContext();
  const requestSnap = useRequestSnap();
  const invokeSnap = useInvokeSnap();
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const { isFlask, snapsDetected, installedSnap } = useMetaMask();
  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin) ? isFlask : snapsDetected;

  const createWallet = async (network: string) => {
    const wallet = (await invokeSnap({
      method: 'createWallet',
      params: {
        network: network.toLowerCase(),
      },
    })) as WalletSnapState;

    setWallet(wallet);
  };

  return (
    <Modal
      size="xl"
      opened={opened}
      onClose={close}
      title="Onboarding"
      centered
      // overlayProps={{
      //   backgroundOpacity: 0.6,
      //   blur: 3,
      // }}
      withCloseButton={false}
      closeOnClickOutside={false}
    >
      <FocusTrap.InitialFocus />
      <Stepper p="sm" size="sm" active={active} onStepClick={setActive} allowNextStepsSelect={false}>
        <Stepper.Step label="Step 1" description="Install Metamask" loading={active === 0}>
          <Box my="xl">
            <Text size="sm" mb="sm">
              You'll need a Metamask or MetaMask Flask wallet.
            </Text>
            <Text size="sm" mb="sm">
              MetaMask Flask is a canary distribution for developers with access to upcoming features.
            </Text>
          </Box>
          {isMetaMaskReady && (
            <>
              <Alert
                variant="outline"
                color="green"
                title="Metamask is installed already."
                icon={<IconInfoCircle />}
                my="xl"
              ></Alert>
              <Group justify="center" mt="xl">
                <Button size="md" fullWidth onClick={nextStep}>
                  Continue
                </Button>
              </Group>
            </>
          )}
          {!isMetaMaskReady && (
            <>
              <Alert
                variant="outline"
                color="red"
                title="You're asking to install Metamask."
                icon={<IconInfoCircle />}
                my="xl"
              ></Alert>
              <Group justify="center" mt="xl">
                <Button
                  size="md"
                  fullWidth
                  leftSection={<FlaskFox />}
                  component="a"
                  href="https://metamask.io/flask/"
                  target="_blank"
                >
                  Install MetaMask Flask
                </Button>
              </Group>
            </>
          )}
        </Stepper.Step>
        <Stepper.Step label="Step 2" description="Install Constellation Snap" loading={active === 1}>
          <Box my="xl">
            <Text size="sm" mb="sm">
              A Snap is an application that adds features and functionality to MetaMask. Snaps can connect to blockchain
              protocols beyond Ethereum, show insights about transactions, display notifications, add new privacy and
              identity features, and much more.
            </Text>
            <Text size="sm" mb="sm">
              Get started by connecting to and installing the snap.
            </Text>
          </Box>

          {installedSnap && (
            <>
              <Alert
                variant="outline"
                color="green"
                title="The snap is connected."
                icon={<IconInfoCircle />}
                my="xl"
              ></Alert>
              <Group justify="center" mt="xl">
                <Button
                  size="md"
                  fullWidth
                  onClick={() => {
                    nextStep();

                    createWallet('integrationnet').then((w) => {
                      setTimeout(() => {
                        nextStep();
                      }, 3000);
                    });
                  }}
                >
                  Continue
                </Button>
              </Group>
            </>
          )}
          {!installedSnap && (
            <>
              <Alert
                variant="outline"
                color="red"
                title="You're asking to connect the snap."
                icon={<IconInfoCircle />}
                my="xl"
              ></Alert>
              <Group justify="center">
                <Button size="md" fullWidth leftSection={<FlaskFox />} onClick={requestSnap}>
                  Connect
                </Button>
              </Group>
            </>
          )}
        </Stepper.Step>
        <Stepper.Step label="Step 3" description="Create a wallet" loading={active === 2}>
          <Text size="sm" mb="sm">
            <Alert variant="outline" color="dark" title="setting wallet..." icon={<IconInfoCircle />} my="xl">
              <Group>
                <Box w={'18%'}>
                  <Skeleton height={80} circle />
                </Box>
                <Box w={'78%'}>
                  <Group justify="space-between" m={5}>
                    <Text>
                      <Skeleton width={130} height={20} radius="md" />
                    </Text>
                    <Text>
                      <Skeleton width={350} height={20} radius="md" />
                    </Text>
                  </Group>
                  <Box my={10}></Box>
                  <Group justify="space-between" m={5}>
                    <Text>
                      <Skeleton width={130} height={20} radius="md" />
                    </Text>
                    <Text>
                      <Skeleton width={350} height={20} radius="md" />
                    </Text>
                  </Group>
                  <Box my={10}></Box>
                  <Group justify="space-between" m={5}>
                    <Text>
                      <Skeleton width={130} height={20} radius="md" />
                    </Text>
                    <Text>
                      <Skeleton width={350} height={20} radius="md" />
                    </Text>
                  </Group>
                </Box>
              </Group>
            </Alert>
          </Text>
        </Stepper.Step>
        <Stepper.Completed>
          <Alert variant="outline" color="green" title="  You're all set!" icon={<IconInfoCircle />} my="xl">
            <Group>
              <Box w={'18%'}>
                <IconWallet opacity={0.4} size={100}></IconWallet>
              </Box>

              <Box w={'78%'}>
                <Group justify="space-between" m={5}>
                  <Text size="sm" c="dimmed">
                    Address:
                  </Text>
                  <Text size="sm">{wallet?.account.address}</Text>
                </Group>
                <Divider my={10}></Divider>
                <Group justify="space-between" m={5}>
                  <Text size="sm" c="dimmed">
                    Network:
                  </Text>
                  <Text size="sm" tt="capitalize">
                    {wallet?.config.network}
                  </Text>
                </Group>
                <Divider my={10}></Divider>
                <Group justify="space-between" m={5}>
                  <Text size="sm" c="dimmed">
                    Balance:
                  </Text>
                  <Text size="sm">0</Text>
                </Group>
              </Box>
            </Group>
          </Alert>
          <Group justify="center" mt="xl">
            <Button
              fullWidth
              onClick={() => {
                close();
                setLocalStorage('onboard-done', 'true');
              }}
            >
              Done!
            </Button>
          </Group>
        </Stepper.Completed>
      </Stepper>
    </Modal>
  );
};
