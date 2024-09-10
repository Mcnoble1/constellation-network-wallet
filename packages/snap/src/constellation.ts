/* eslint-disable jsdoc/require-jsdoc */
import { dag4 } from '@stardust-collective/dag4';
import { transferByNetwork } from './dag4js';
import { Asset, Balance, NetworkInfo, WalletSnapState } from './types';
import { SnapState } from './state';
import { convertUnitsToToken } from './utils';

const CONSTELLATION_PROXY = 'https://constellation-snap-api.glitch.me';

// configuration
dag4.di.useFetchHttpClient(fetch);

export async function getCurrentMetamaskAccount(): Promise<string> {
  const accounts = (await ethereum.request({
    method: 'eth_requestAccounts',
  })) as string[];
  return accounts[0] ?? '';
}

export function connectToNetwork(networkName: string) {
  if (networkName.toLowerCase() === 'testnet') {
    dag4.account.connect({
      networkVersion: '2.0',
      testnet: true,
    });
  } else if (networkName.toLowerCase() === 'mainnet') {
    dag4.account.connect({
      networkVersion: '2.0',
      testnet: false,
    });
  } else if (networkName.toLowerCase() === 'integrationnet') {
    dag4.account.connect(
      {
        id: 'integration2',
        networkVersion: '2.0',
        beUrl: 'https://be-integrationnet.constellationnetwork.io',
        l0Url: 'https://l0-lb-integrationnet.constellationnetwork.io',
        l1Url: 'https://l1-lb-integrationnet.constellationnetwork.io',
      },
      false,
    );
  }

  let dag4NetworkInfo = dag4.network.getNetwork();

  return {
    id: dag4NetworkInfo.id,
    beUrl: dag4NetworkInfo.beUrl,
    l0Url: dag4NetworkInfo.l0Url,
    l1Url: dag4NetworkInfo.l1Url,
    lbUrl: dag4NetworkInfo.lbUrl,
    testnet: dag4NetworkInfo.testnet,

    name: networkName,
  } as NetworkInfo;
}

export async function login(evmAddress: string) {
  const entropy = await snap.request({
    method: 'snap_getEntropy',
    params: {
      version: 1,
      salt: evmAddress,
    },
  });
  const pk = entropy.substring(2);
  dag4.account.loginPrivateKey(pk);
}

export async function getAccount() {
  const wallet = await SnapState.getState();
  return wallet;
}

export async function createAccount(network: string = 'testnet') {
  let wallet = await getAccount();
  if (wallet === null) {
    const evmAddress = await getCurrentMetamaskAccount();
    await login(evmAddress);

    // create wallet state
    wallet = {
      account: { evmAddress, address: dag4.account.address },
      config: {
        network: network,
      },
    } as WalletSnapState;
    await SnapState.updateState(wallet);
  }

  return wallet;
}

export async function updateAccount(wallet: WalletSnapState) {
  return await SnapState.updateState(wallet);
}

export async function getBalance(network: string): Promise<Balance> {
  const res = {
    balance: 0,
    balanceUsd: 0,
  } as Balance;

  const wallet = await getAccount();
  if (wallet) {
    connectToNetwork(network);

    let balance = await _getAddressBalance(wallet.account.address);
    const dagPrice = await getDAGPrice();

    // TODO: need to calculate total balance
    res.balance = convertUnitsToToken(balance.toString());
    res.balanceUsd = (dagPrice * Number(res.balance)).toString();
  }

  return res;
}

export async function transferDag(toAddress: string, amount: string, fee: string) {
  const wallet = await getAccount();
  if (wallet) {
    connectToNetwork(wallet.config.network);

    const pk = await getPrivateKey();
    dag4.account.loginPrivateKey(pk);

    const pendingTx = await transferByNetwork(dag4.network, toAddress, Number(amount), Number(fee));
    return pendingTx;
  }

  return null;
}

export async function getPrivateKey() {
  const evmAddress = await getCurrentMetamaskAccount();

  const entropy = await snap.request({
    method: 'snap_getEntropy',
    params: {
      version: 1,
      salt: evmAddress,
    },
  });

  const pk = entropy.substring(2);
  return pk;
}

async function _getAddressBalance(address: string) {
  let balance = '0';
  try {
    const getAddressBalanceRes = await dag4.network.getAddressBalance(address);
    balance = getAddressBalanceRes.balance.toString();
  } catch (error) {
    try {
      // try to get from api
      const addrBalanceRes = await fetch(`${dag4.network.config().beUrl}/addresses/${address}/balance`);
      const addrBalanceData = await addrBalanceRes.json();
      balance = addrBalanceData.data.balance;
    } catch (error) {}
  }

  return balance;
}

async function getDAGPrice() {
  const url = `${CONSTELLATION_PROXY}/price?cmcId=2868`;
  const res = await fetch(url);
  if (res.status !== 200) {
    throw new Error(`Status ${res.status}`);
  }

  const data = await res.json();
  return data?.quote.USD.price || 0;
}
