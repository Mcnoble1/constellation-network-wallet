import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Sent", amount: "-500 DAG", date: "2024-09-01", transactionHash: "0xabc123" },
    { id: 2, type: "Received", amount: "+200 DAG", date: "2024-09-02", transactionHash: "0xdef456" },
    // Add more transactions here
  ]);

  const handleViewOnExplorer = (hash) => {
    window.open(`https://mainnet.dagexplorer.io/transactions/${hash}`, "_blank");
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      <table className="min-w-full text-lg">
        <thead>
          <tr>
            <th className="text-left text-gray-600 pb-2">Type</th>
            <th className="text-left text-gray-600 pb-2">Amount</th>
            <th className="text-left text-gray-600 pb-2">Date</th>
            <th className="text-left text-gray-600 pb-2">Transaction Hash</th>
            <th className="text-left text-gray-600 pb-2">View</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-b border-gray-200">
              <td className="py-2 text-gray-800">{tx.type}</td>
              <td className="py-2 text-gray-800">{tx.amount}</td>
              <td className="py-2 text-gray-800">{tx.date}</td>
              <td className="py-2 text-gray-800">{tx.transactionHash}</td>
              <td className="py-2 text-blue-500 cursor-pointer" onClick={() => handleViewOnExplorer(tx.transactionHash)}>
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
