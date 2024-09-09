import { BigNumber } from 'bignumber.js';
import { DAG_DECIMALS } from '@stardust-collective/dag4-core';

export function capitalize(str: string) {
  return str ? str.charAt(0).toUpperCase() + str.substring(1) : str;
}

export function convertUnitsToToken(numberStr: string) {
  return new BigNumber(numberStr).multipliedBy(DAG_DECIMALS).toString();
}
