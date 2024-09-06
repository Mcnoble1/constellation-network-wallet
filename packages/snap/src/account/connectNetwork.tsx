import { dag4 } from '@stardust-collective/dag4';

export const connectToNetwork = () => {
  // Connect to Constellation testnet or mainnet
  dag4.account.connect({
    networkVersion: '2.0',   // Use '1.0' for mainnet 1.0 support
    testnet: true,           // Set to false for mainnet
  });
};
