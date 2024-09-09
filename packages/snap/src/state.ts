import { WalletSnapState } from './types';

export class SnapState {
  public static async updateState(snapState: WalletSnapState) {
    const state = await snap.request({
      method: 'snap_manageState',
      params: {
        operation: 'update',
        newState: JSON.parse(JSON.stringify(snapState)),
      },
    });

    return state !== null ? (JSON.parse(state['key'] as string) as WalletSnapState) : null;
  }

  public static async getState() {
    const state = await snap.request({
      method: 'snap_manageState',
      params: { operation: 'get' },
    });

    return state as WalletSnapState;
  }

  public static async clearState() {
    await snap.request({
      method: 'snap_manageState',
      params: { operation: 'clear' },
    });
  }
}
