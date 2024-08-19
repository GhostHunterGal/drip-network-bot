import { BlockchainData } from '../../web3/multicall.js';
import { Calculations } from '../../web3/calculations.js';
import {
  formatNumberWithSuffix,
  numFor2,
  numFor3,
} from '../../utils/formats.js';

export const reservoirMsg = (
  data: BlockchainData,
  calcs: Calculations
): string => {
  const msg: string = `
🪙 <b><a href="https://dripnetwork.io/dapp/reservoir">Reservoir</a></b> 🪙 
    
Wallets: <b>${formatNumberWithSuffix(data.totalReservoirWallets)}</b>
DROPS LP Supply: <b>${formatNumberWithSuffix(data.reservoirDropsSupply)}</b>
Dividend Pool: <b>${formatNumberWithSuffix(
    data.reservoirDividendPoolBalance
  )}</b>
Locked DROPS LP: <b>${formatNumberWithSuffix(data.totalLockedDrops)}</b>
Rewards: <b>${formatNumberWithSuffix(data.reservoirTotalWithdrawn)}</b>
DROPS LP Price: (<b>${numFor3.format(
    calcs.dropsBnbPrice
  )}</b> BNB) <b>$${numFor2.format(calcs.dropsPrice)}</b>
`;

  return msg;
};
