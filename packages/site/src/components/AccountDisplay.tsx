import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faCopy } from "@fortawesome/free-solid-svg-icons";

const AccountDisplay = ({ onSendClick, onReceiveClick }) => {
  // State for balance and address
  const [balance, setBalance] = useState(10000); // Example: 10,000 DAG
  const [usdEquivalent, setUsdEquivalent] = useState(1200); // Example: $1,200 USD
  const [address, setAddress] = useState("0x123...789");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
  };

  return (
    <div className="w-full md:w-[40%] bg-white p-8 rounded-2xl shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <p className="text-2xl text-gray-500">{address}
        <FontAwesomeIcon onClick={copyToClipboard} icon={faCopy} className="ml-2 translate-x" />
        </p>
          <span>{copied ? "Copied!" : ""}</span>
          <div className="flex justify-center items-center mb-6">
        <a
          href="https://mainnet.dagexplorer.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="mr-2" />
        </a>
      </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-4xl font-bold text-gray-900">{balance.toLocaleString()} DAG</p>
        <p className="text-xl text-gray-500 mt-2">${usdEquivalent.toLocaleString()} USD</p>
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
