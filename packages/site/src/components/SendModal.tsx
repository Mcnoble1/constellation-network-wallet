import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useInvokeSnap, useRequestSnap, useWalletContext } from '../hooks';
import { Asset, Transaction } from 'src/types/snap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLocalStorage } from "src/utils";


const SendModal = ({ onClose }) => {
  // State for amount and recipient address
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState("");
  const requestSnap = useRequestSnap();
  const invokeSnap = useInvokeSnap();
  const { wallet, setWallet } = useWalletContext();

  // Handle form submission (add your logic here)
  const handleSend = () => {
    try {
      invokeSnap({
        method: 'sendTransaction',
        params: {
          toAddress: recipientAddress,
          amount: amount.toString(),
          fee: '0',
        },
      }).then((res) => {
        onClose();
        setAmount("");
        setRecipientAddress('');

        const tx = res as Transaction;
        if (!tx) {
            toast.error('Operation rejected', {
              // position: toast.POSITION.TOP_RIGHT,
              autoClose: 4000,
            });
        } else {
          localStorage.setItem('Transactions', JSON.stringify(tx) )
            toast.success(`Sent ${tx.amount} DAG to ${recipientAddress}`, {
              // position: toast.POSITION.TOP_RIGHT,
              autoClose: 4000,
            });
        }
      });
    } catch (error: any) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] md:w-[500px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">Send DAG</h2>

        {/* Asset Field */}
        {/* <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">Asset</label>
          <input
            type="text"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="DAG"
            readOnly
          />
        </div> */}

        {/* Amount Field */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
          />
        </div>

        {/* Recipient Address Field */}
        <div className="mb-8">
          <label className="block text-sm text-gray-600 mb-2">Recipient Address</label>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="Recipient address"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={amount === 0 || recipientAddress === ''}
          className="w-full bg-secondary text-white py-3 rounded-2xl hover:bg-secondary/80 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendModal;
