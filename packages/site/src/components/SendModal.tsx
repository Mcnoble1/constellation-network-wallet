import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const SendModal = ({ onClose }) => {
  // State for amount and recipient address
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  // Handle form submission (add your logic here)
  const handleSend = () => {
    if (amount && recipientAddress) {
      // Logic for sending the transaction
      console.log("Sending", amount, "DAG to", recipientAddress);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] md:w-[500px] relative">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Send DAG</h2>

        {/* Asset Field */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">Asset</label>
          <input
            type="text"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="DAG"
            readOnly
          />
        </div>

        {/* Amount Field */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
          className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendModal;
