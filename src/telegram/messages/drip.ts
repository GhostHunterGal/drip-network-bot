import { BlockchainData } from '../../web3/multicall.js';
import { Calculations } from '../../web3/calculations.js';
import {
  formatNumberWithSuffix,
  numFor2,
  numFor3,
  numFor9,
} from '../../utils/formats.js';

export const dripMsg = (data: BlockchainData, calcs: Calculations): string => {
  const msg = `
💧 <b><a href="https://dripnetwork.io/">Drip Network</a></b> 💧
    
Fountain: <b>$${numFor3.format(calcs.dripFountainPrice)}</b>
DRIP/BUSD: <b>$${numFor3.format(calcs.dripBusdPrice)}</b>
WDRIP/WBNB: <b>$${numFor3.format(calcs.wdripWbnbPrice)}</b>
WDRIP/WPLS: <b>$${numFor3.format(calcs.wdripWplsPrice)}</b>
DRIPX/WBNB: <b>$${numFor9.format(calcs.dripxWbnbPrice)}</b>
DROPS LP: <b>$${numFor2.format(calcs.dropsPrice)}</b>
DRIP/BUSD LP: <b>$${numFor2.format(calcs.dripBusdLpPrice)}</b>
BR34P PCS V1: <b>$${numFor2.format(calcs.br34pWbnbPrice)}</b>
DDD Ticket: <b>$${numFor2.format(1)}</b>
    
<i><u>Totals</u></i>
Wallets: <b>${formatNumberWithSuffix(data.totalDripWallets)}</b>
Supply: <b>${formatNumberWithSuffix(data.totalDripSupply)}</b>
Liquidity Supply: <b>${formatNumberWithSuffix(calcs.lpDripBalance)}</b>
Liquid in Wallets: <b>${formatNumberWithSuffix(calcs.liquidDripBalance)}</b>
Tax Vault: <b>${formatNumberWithSuffix(data.dripVaultDripBalance)}</b>
DDD Vault: <b>${formatNumberWithSuffix(data.dddVaultDripBalance)}</b>
Kitchen Sink: <b>${formatNumberWithSuffix(data.kitchenSinkDripBalance)}</b>
`;

  return msg;
};
