export type NetworkInfo = {
  id: string;
  beUrl?: string;
  lbUrl?: string;
  l0Url?: string;
  l1Url?: string;
  networkVersion?: string;
  testnet?: boolean;
};

export enum Networks {
  TestNet,
  MainNet,
  IntegrationNet,
}

export type WalletSnapState = {
  account: Account;
  config: Config;
};

export type Config = {
  network: string;
};

export type Account = {
  evmAddress: string;
  address: string;
};

export type Balance = {
  balance: number;
  usdEquivalent: number;
};

export type Asset = {
  id: string;
  name: string;
  symbol: string;
  amount: string;
  price: string;
  address?: string;
  decimals?: number;
  icon?: string;
};

