import type { FunctionComponent, ReactNode } from 'react';
import { useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer, Header } from './components';

import { WalletContext } from './hooks';
import { WalletSnapState } from './types/snap';

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletSnapState | null>(null);

  return (
    <>
      <ToastContainer />
      <WalletContext.Provider value={{ wallet, setWallet }}>
        <Header />
        {children}
        <Footer />
      </WalletContext.Provider>
    </>
  );
};
