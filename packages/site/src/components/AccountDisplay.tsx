import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faCopy } from "@fortawesome/free-solid-svg-icons";
import { shortAddress } from '../utils';

const AccountDisplay = ({ onSendClick, onReceiveClick, balance, usdEquivalent, address, network }) => {
  // State for balance and address
  const [copied, setCopied] = useState(false);

  // setAddress({wallet?.account.address})
  // setBalance({wallet?.account.balance})

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
  };

  return (
    <div className="w-full md:w-[40%] bg-white p-5 rounded-2xl shadow-2xl">
      <div className="flex justify-between items-center mb-1">
        <p className="text-xl text-black">{address ? shortAddress(address) : ''}
        <FontAwesomeIcon onClick={copyToClipboard} icon={faCopy} className="ml-2 translate-x text-secondary hover:text-secondary/50" />
        <span className="text-sm">{copied ? "Copied!" : ""}</span>
        </p>

          <div className="flex justify-center items-center mb-2">
        <a
          href={`https://${network}.dagexplorer.io/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-secondary hover:text-secondary/50"
        >
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="mr-2" />
        </a>
      </div>
      </div>

      <div className="text-center mb-2">
        <p className="text-2xl font-bold text-black">{Number(balance) > 0 ? Number(balance).toFixed(2) : '0'} DAG</p>
        <p className="text-sm text-black mt-2">${Number(usdEquivalent) > 0 ? Number(usdEquivalent).toFixed(2) : '0'} USD</p>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onSendClick}
          className="bg-secondary text-white px-6 py-3 rounded-xl hover:bg-secondary/90 transition"
        >
          Send
        </button>
        <button
          onClick={onReceiveClick}
          className="bg-green text-white px-6 py-3 rounded-xl hover:bg-green/90 transition"
        >
          Receive
        </button>
      </div>
    </div>
  );
};

export default AccountDisplay;
