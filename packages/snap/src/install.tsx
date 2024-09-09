import type { OnInstallHandler } from "@metamask/snaps-sdk";
import { Box, Heading, Divider, Text, Link } from "@metamask/snaps-sdk/jsx";

export const onInstallUI: OnInstallHandler = async () => {
return {
      content: (
        <Box>
          <Heading>Thank you for installing Constellation Snap</Heading>
          <Text>
            Learn more about the constellation network at <Link href="https://docs.constellationnetwork.io/">Constellation Network</Link>.
          </Text>
          <Divider />
          <Text>
            🔑 Applications do NOT have access to your private keys. Everything is stored inside the sandbox environment of Constellation Wallet inside MetaMask
          </Text>
          <Divider />
          <Text>
              ⦿ Note that Constellation Network Wallet Snap does not have direct access to the private key of the MetaMask accounts so it generates a new snap account that is associated with the currently connected MetaMask account so the account created by the snap will have a different address compared to your MetaMask account address.
          </Text>
          <Divider />
        </Box>
      ),
    };
  };
