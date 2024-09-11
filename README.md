# Constellation Network MetaMask Snap

This repository demonstrates how to develop a MetaMask Snap for the **Constellation Network** using stardust collective's **DAG4.js** and **Metamask Snap API and SDK**. The Snap allows users to create and manage Constellation DAG accounts, view balances, send/receive DAG, and sign transactions—all within MetaMask. Future features will include support for Metagraph tokens and message signing.

## Snaps is Pre-release Software

To interact with your Snap, you will need to install [MetaMask Flask](https://metamask.io/flask/), a developer-focused MetaMask distribution that allows access to Snaps' upcoming features.

## Getting Started

### Cloning the Repository

Clone the repository and set up the development environment:

```bash
git clone https://github.com/mcnoble1/constellation-network-wallet.git
cd constellation-network-wallet
yarn install
```

### Running the Snap Locally
```
yarn start
```
This command will compile the Snap and serve it locally so that it can be loaded into MetaMask Flask.

### How to Use
- Install MetaMask Flask from [here](https://metamask.io/flask/).
- Start the Snap development server with yarn start.
- Enter http://localhost:8000 to view the companion dapp and Install the Snap by clicking "Connect".
- Approve the permissions required by the Constellation Network Snap.
- You can now interact with your DAG account in MetaMask using the Snap's functions, such as creating an account, viewing balances, and sending DAG tokens.

### Features
- DAG Account Creation: Automatically creates a Constellation Network (DAG) account using DAG4.js and BIP44/BIP32 entropy.
- Send/Receive DAG: Easily send and receive DAG tokens through MetaMask.
- View Balance: Check your DAG account balance within MetaMask.
- Sign Transactions: Sign transactions securely using MetaMask.
