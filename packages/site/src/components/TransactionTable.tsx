/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useInvokeSnap, useRequestSnap, useWalletContext } from '../hooks';
import { Transaction } from 'src/types/snap';
import { getLocalStorage, isLocalSnap, setLocalStorage, shouldDisplayReconnectButton } from '../utils';
import { shortAddress } from "../utils";
const TransactionTable = () => {
  const { wallet, setWallet } = useWalletContext();
  // const [transactions, setTransactions] = useState([
  //   { id: 1, type: "Sent", amount: "-500 DAG", date: "2024-09-01", transactionHash: "0xabc123" },
  //   { id: 2, type: "Received", amount: "+200 DAG", date: "2024-09-02", transactionHash: "0xdef456" },
  //   // Add more transactions here
  // ]);

  const txns = JSON.parse(getLocalStorage('Transactions'));
  const transactions = [txns];
  console.log(transactions);
  const handleViewOnExplorer = (hash) => {
    window.open(`https://${wallet?.config.network}.dagexplorer.io/transactions/${hash}`, "_blank");
  };

 const formatDatetime = (datetimeString: string) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(datetimeString).toLocaleDateString(undefined, options);
    return formattedDate;
  };


  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg flex flex-col overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-strokedark ">
            <th className="p-2.5 xl:p-5 text-sm font-medium text-left uppercase">Date</th>
            <th className="p-2.5 xl:p-5 text-sm font-medium text-left uppercase">Amount</th>
            <th className="p-2.5 xl:p-5 text-sm font-medium text-left uppercase">Sender</th>
            <th className="p-2.5 xl:p-5 text-sm font-medium text-left uppercase">Transaction Hash</th>
            <th className="p-2.5 xl:p-5 text-sm font-medium text-left uppercase">Receiver</th>
            <th className="p-2.5 xl:p-5 text-sm font-medium text-left uppercase">Fee</th>
            <th className="p-2.5 xl:p-5 text-sm font-medium text-left uppercase">View</th>
          </tr>
        </thead>
        <tbody>
          {(transactions.length > 0) && transactions.map((tx) => (
            <tr key={tx?.id} className="border-b border-gray-200">
              <td className="p-2.5 xl:p-5">{formatDatetime(tx?.timestamp)}</td>
              <td className="p-2.5 xl:p-5">{tx?.amount}</td>
              <td className="p-2.5 xl:p-5">{shortAddress(tx?.sender)}</td>
              <td className="p-2.5 xl:p-5">{shortAddress(tx?.hash)}</td>
              <td className="p-2.5 xl:p-5">{shortAddress(tx?.receiver)}</td>
              <td className="p-2.5 xl:p-5">{tx?.fee}</td>
              <td className="py-2 text-blue-500 cursor-pointer" onClick={() => handleViewOnExplorer(tx?.hash)}>
                <FontAwesomeIcon icon={faArrowRight} className="text-blue-500 hover:text-blue-700" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
