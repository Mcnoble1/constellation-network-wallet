/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prettier/prettier */

//   const handleSignMessage = async () => {
//     const message = "Hello there!";
//     if (message) {
//       await invokeSnap({ method: 'signMessage', params: [message] });
//     }
//   };

import React, { useState, useEffect } from "react";
import { useMetaMask, useInvokeSnap, useMetaMaskContext, useRequestSnap, useWalletContext } from '../hooks';
import { defaultSnapOrigin } from '../config';
import { getLocalStorage, isLocalSnap, setLocalStorage, shouldDisplayReconnectButton } from '../utils';
import { Balance, WalletSnapState } from 'src/types/snap';
import { ConnectButton, InstallFlaskButton, SendHelloButton } from "../components";
import AccountDisplay from "../components/AccountDisplay";
import SendModal from "../components/SendModal";
import ReceiveModal from "../components/ReceiveModal";
import NetworkDropdown from "../components/NetworkDropdown";
import TransactionTable from "../components/TransactionTable";

const Index = () => {
  const { wallet, setWallet } = useWalletContext();
  const requestSnap = useRequestSnap();
  const invokeSnap = useInvokeSnap();
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const { isFlask, snapsDetected, installedSnap } = useMetaMask();
  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin) ? isFlask : snapsDetected;
  const [balance, setBalance] = useState(0);
  const [usdEquivalent, setUsdEquivalent] = useState(0);
  const [network, setNetwork] = useState("")
  const accountReady = Boolean(getLocalStorage('accountReady'));

      const createWallet = async (network: string) => {
        console.log(network)
        const account = (await invokeSnap({
          method: 'createAccount',
          params: {
            network: network.toLowerCase(),
          },
        })) as WalletSnapState;

        setWallet(account);
        setLocalStorage('accountReady', 'true');
      };

  const accountDetails = async () => {
    try {
      const address = wallet?.account.address;
      if (address) {
        const accountInfo = (await invokeSnap({
          method: 'getAccountBalance',
          params: {
            network: wallet?.config.network,
            address: wallet?.account.address,
          },
        })) as Balance;
        setNetwork(wallet?.config.network);
        setBalance(accountInfo.balance);
        setUsdEquivalent(accountInfo.usdEquivalent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      if (isMetaMaskReady && installedSnap) {
        const walletStore = getLocalStorage('wallet');
        if (walletStore && !wallet) {
          setWallet(JSON.parse(walletStore) as WalletSnapState);
        }

        setTimeout(() => {
          console.log("fetching account details")
          accountDetails().then((_) => {
            console.log("accountDetails fetched")
          });
        }, 500);
      }
  }, [isMetaMaskReady, installedSnap, wallet?.config.network]);

  useEffect(() => {
    if (isMetaMaskReady && installedSnap) {
      setInterval(() => {
        accountDetails();
      }, 2000);
    }
  }, []);


  useEffect(() => {
    if (wallet) {
      setLocalStorage('wallet', JSON.stringify(wallet));
      setWallet(wallet as WalletSnapState);
    }
  }, [wallet]);

  const handleSendClick = () => {
    setShowSendModal(true);
  };

  const handleReceiveClick = () => {
    setShowReceiveModal(true);
  };

  return (
      <div className="p-8 bg-gray min-h-screen">

          {!isMetaMaskReady && (
            <div className="w-[80%] mx-[10%] text-center flex flex-col gap-10 align-center">
            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-primary">MetaMask</span> Snap for Constellation Network
              </h1>
              <h2 className="text-xl text-secondary">
                Interact with your MetaMask Snap for Constellation Network functions.
              </h2>
            </div>

            <div className="bg-stroke rounded-2xl p-6">
              <p className="text-xl">
                Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.
              </p>
              <InstallFlaskButton />
            </div>
          </div>
         )}

          {!installedSnap && isMetaMaskReady && (
             <div className="w-[80%] mx-[10%] text-center flex flex-col gap-10 align-center">
             <div>
               <h1 className="text-2xl font-bold">
                 <span className="text-primary">MetaMask</span> Snap for Constellation Network
               </h1>
               <h2 className="text-xl text-secondary">
                 Interact with your MetaMask Snap for Constellation Network functions.
               </h2>
             </div>

             <div className="bg-stroke rounded-2xl p-6">
               <p className="text-xl">
               Get started by installing the constellation network snap.
               </p>
               <ConnectButton
                  onClick={
                    () => { requestSnap();
                      createWallet('testnet').then((_w) => {
                        console.log('connecting to network');
                      });
                    }
                  }
                  disabled={!isMetaMaskReady}
                />
             </div>
           </div>
          )}


          {!accountReady && installedSnap && (
             <div className="w-[80%] mx-[10%] text-center flex flex-col gap-10 align-center">
             <div>
               <h1 className="text-2xl font-bold">
                 <span className="text-primary">MetaMask</span> Snap for Constellation Network
               </h1>
               <h2 className="text-xl text-secondary">
                 Interact with your MetaMask Snap for Constellation Network functions.
               </h2>
             </div>

             <div className="bg-stroke rounded-2xl p-6">
               <button
                  className="inline-flex mt-5 items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 py-3 px-10 text-center font-medium text-white hover-bg-opacity-90 lg:px-8 xl:px-10"
                  onClick={
                    () => {
                      createWallet('testnet').then((_w) => {
                        console.log('connecting to network');
                      });
                    }
                  }
                >Create Account</button>
             </div>
           </div>
        )}

          {installedSnap && accountReady && (
            <>
              <div className="flex justify-between mb-6">
              <AccountDisplay onSendClick={handleSendClick} onReceiveClick={handleReceiveClick} balance={balance} usdEquivalent={usdEquivalent} address={wallet?.account.address || ''} network={network}/>
                <NetworkDropdown />
              </div>
              <TransactionTable />

              {showSendModal && <SendModal onClose={() => setShowSendModal(false)} />}
              {showReceiveModal && <ReceiveModal onClose={() => setShowReceiveModal(false)} address={wallet?.account.address || ''} />}
            </>
          )}
      </div>
  )
};

export default Index;
