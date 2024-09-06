import type { OnHomePageHandler } from "@metamask/snaps-sdk";
import { Box, Heading, Divider, Text, Link, Image } from "@metamask/snaps-sdk/jsx";
import svgIcon from "../images/logo.svg";

export const onHomePageUI: OnHomePageHandler = async () => {
  return {
    content: (
      <Box>
        <Heading>Welcome to Constellation Network Wallet home page!</Heading>
        <Image src={svgIcon} />
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
