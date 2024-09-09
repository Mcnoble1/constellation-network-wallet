import { useState, createContext, useContext } from 'react';
import { WalletSnapState } from 'src/types/snap';

export type WalletContextContent = {
  wallet: WalletSnapState | null;
  setWallet: (w: WalletSnapState) => void;
};

const defaultWalletContextValue = {
  wallet: {
    account: { address: '', evmAddress: '' },
    config: { network: '' },
  } as WalletSnapState,
  setWallet: () => {},
} as WalletContextContent;

export const WalletContext = createContext<WalletContextContent>(defaultWalletContextValue);

export const useWalletContext = () => useContext(WalletContext);
