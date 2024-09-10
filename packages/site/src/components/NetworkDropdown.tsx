/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { useInvokeSnap, useWalletContext, useRequestSnap } from '../hooks';
import { WalletSnapState } from '../types/snap';
import { setLocalStorage } from '../utils';
const NetworkDropdown = () => {
  const [network, setNetwork] = useState("Testnet");
  const { wallet, setWallet } = useWalletContext();
  const invokeSnap = useInvokeSnap();

  const NetworkList = ["Mainnet", "Testnet", "Integrationnet", "LocalNet"];

  const changeNetwork = async (network: string) => {
    const wallet = (await invokeSnap({
      method: 'connectToNetwork',
      params: {
        network: network.toLowerCase(),
      },
    })) as WalletSnapState;

    setNetwork(wallet.config.network);

    setLocalStorage('wallet', JSON.stringify(wallet));
    setWallet(wallet as WalletSnapState);
  };

  useEffect(() => {
    if (wallet) {
      setNetwork(wallet.config.network);
    }
  }, [wallet?.config.network]);

  return (
    <div>
      <label className="block text-lg font-semibold text-gray-700 mb-2">Network</label>
      <select
        className="block w-full p-3 text-lg bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={network}
        onChange={(e) => setNetwork(e.target.value)}
      >
        {NetworkList.map((network, index) => (
          <option onClick={
            () => changeNetwork(network)
          } key={index} value={network}>{network}</option>
        ))}
      </select>
    </div>
  );
};

export default NetworkDropdown;
