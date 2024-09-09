import React, { useState } from "react";

const NetworkDropdown = () => {
  const [network, setNetwork] = useState("Testnet");

  return (
    <div>
      <label className="block text-lg font-semibold text-gray-700 mb-2">Network</label>
      <select
        className="block w-full p-3 text-lg bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={network}
        onChange={(e) => setNetwork(e.target.value)}
      >
        <option>Mainnet</option>
        <option>Testnet</option>
        <option>Integrationnet</option>
        <option>LocalNet</option>
      </select>
    </div>
  );
};

export default NetworkDropdown;
