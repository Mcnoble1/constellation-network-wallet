export type GetSnapsResponse = Record<string, Snap>;

export type Snap = {
  permissionName: string;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
};


// types reused from snap
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

export type Metagraph = {
  metagraphId: string;
  metagraphName: string;
  metagraphDescription: string;
  metagraphIcon: string;
  metagraphSymbol: string;
  metagraphSiteUrl: string;
  metagraphFeesWalletAddress: string;
  metagraphStakingWalletAddress: string;
};

export type Transaction = {
  amount: number;
  fee: number;
  hash: string;
  ordinal: number;
  pending: boolean;
  sender: string;
  receiver: string;
  status: string;
  timestamp: number;
};
