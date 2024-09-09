import React, { useState } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react"; // Install qrcode.react package
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ReceiveModal = ({ onClose }) => {
  const address = "0x123...789"; // Address to be displayed as QR code
  const [useCanvas, setUseCanvas] = useState(false); // Toggle between SVG and Canvas QR code

  // Function to copy the address to the clipboard
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    alert("Address copied to clipboard!");
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
        <h2 className="text-2xl font-bold text-center mb-6">Receive DAG</h2>

        {/* QR Code Display */}
        <div className="flex justify-center mb-6">
          {useCanvas ? (
            <QRCodeCanvas value={address} size={200} />
          ) : (
            <QRCodeSVG value={address} size={200} />
          )}
        </div>

        {/* DAG Address Display */}
        <p className="text-center text-sm text-gray-600 mb-6">{address}</p>

        {/* Copy Address Button */}
        <button
          onClick={copyAddress}
          className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition mb-4"
        >
          Copy Address
        </button>

        {/* Toggle QR Code Type */}
        <div className="text-center">
          <button
            onClick={() => setUseCanvas(!useCanvas)}
            className="text-blue-500 hover:underline"
          >
            {useCanvas ? "Switch to SVG QR Code" : "Switch to Canvas QR Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiveModal;
