import { dag4 } from '@stardust-collective/dag4';
import {
  TransactionV2,
  txEncode,
  KeyStore,
  AddressLastRefV2,
  AddressLastRef,
} from '@stardust-collective/dag4-keystore';
import { PendingTx, GlobalDagNetwork } from '@stardust-collective/dag4-network';
import { DAG_DECIMALS } from '@stardust-collective/dag4-core';
import { customAlphabet } from 'nanoid';
import { BigNumber } from 'bignumber.js';

export class MyKeyStore extends KeyStore {
  prepareTx(
    amount: number,
    toAddress: string,
    fromAddress: string,
    lastRef: AddressLastRef | AddressLastRefV2,
    fee = 0,
    version = '1.0',
  ) {
    if (toAddress === fromAddress) {
      throw new Error('KeyStore :: An address cannot send a transaction to itself');
    }

    //Normalize to integer and only preserve 8 decimals of precision
    amount = Math.floor(new BigNumber(amount).multipliedBy(1e8).toNumber());
    fee = Math.floor(new BigNumber(fee).multipliedBy(1e8).toNumber());

    if (amount < 1e-8) {
      throw new Error(`KeyStore :: Send amount must be greater than 1e-8, you're sending ${amount}`);
    }

    if (fee < 0) {
      throw new Error('KeyStore :: Send fee must be greater or equal to zero');
    }

    let tx, encodedTx;
    if (version === '1.0') {
      tx = txEncode.getTx(amount, toAddress, fromAddress, lastRef as AddressLastRef, fee);
      tx.setEncodedHashReference();
      encodedTx = tx.getEncoded(false);
    } else {
      // replace with custom salt
      // tx = txEncode.getTxV2(amount, toAddress, fromAddress, lastRef as AddressLastRefV2, fee);
      const nanoid = customAlphabet('1234567890', 16);
      const salt = new BigNumber(nanoid());
      tx = new TransactionV2({
        amount,
        fee,
        toAddress,
        fromAddress,
        lastTxRef: lastRef as AddressLastRefV2,
        salt,
      });

      encodedTx = tx.getEncoded();
    }

    const serializedTx = txEncode.kryoSerialize(encodedTx, version === '1.0');

    const hash = this.sha256(Buffer.from(serializedTx, 'hex'));

    if (version === '1.0') {
      tx.setSignatureBatchHash(hash);
    }

    return {
      tx: tx.getPostTransaction(),
      hash,
      rle: encodedTx,
    };
  }
}

export async function transferByNetwork(
  network: GlobalDagNetwork | MetagraphTokenNetwork,
  toAddress: string,
  amount: number,
  fee = 0,
  autoEstimateFee = false,
): Promise<PendingTx> {
  let normalizedAmount = Math.floor(new BigNumber(amount).multipliedBy(DAG_DECIMALS).toNumber());
  const lastRef: any = await network.getAddressLastAcceptedTransactionRef(dag4.account.address);

  if (fee === 0 && autoEstimateFee) {
    const tx = await network.getPendingTransaction(lastRef.prevHash || lastRef.hash);

    if (tx) {
      const addressObj = await network.getAddressBalance(dag4.account.address);

      //Check to see if sending max amount
      if (addressObj.balance === normalizedAmount) {
        amount -= DAG_DECIMALS;
        normalizedAmount--;
      }

      fee = DAG_DECIMALS;
    }
  }

  // replace keystone
  const keystore = new MyKeyStore();
  const tx = await keystore.generateTransactionV2(amount, toAddress, dag4.account.keyTrio, lastRef as any, fee);
  const txHash = await network.postTransaction(tx);

  if (txHash) {
    return {
      timestamp: Date.now(),
      hash: txHash,
      amount: amount,
      receiver: toAddress,
      fee,
      sender: dag4.account.address,
      ordinal: lastRef.ordinal,
      pending: true,
      status: 'POSTED',
    };
  }

  return {} as PendingTx;
}
