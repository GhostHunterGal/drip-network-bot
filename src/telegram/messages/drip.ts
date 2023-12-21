import { BlockchainData } from '../../web3/multicall';
import { Calculations } from '../../web3/calculations';
import { formatNumberWithSuffix, numFor2, numFor3 } from '../../utils/formats';

export const dripMsg = (data: BlockchainData, calcs: Calculations): string => {
  const msg = `
💧 <b><a href="https://dripnetwork.io/">Drip Network</a></b> 💧
    
<a href="https://dripnetwork.io/dapp/swap">Fountain</a>: <b>$${numFor3.format(
    calcs.dripFountainPrice
  )}</b>
<a href="https://pancakeswap.finance/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0x20f663CEa80FaCE82ACDFA3aAE6862d246cE0333">PCS</a>: <b>$${numFor3.format(
    calcs.dripBusdPrice
  )}</b>
<a href="https://dripnetwork.io/dapp/reservoir">DROPS LP</a>: <b>$${numFor2.format(
    calcs.dropsPrice
  )}</b>
<a href="https://theanimal.farm/dripliberation">DRIP/BUSD LP</a>: <b>$${numFor2.format(
    calcs.dripBusdLpPrice
  )}</b>
<a href="https://v1exchange.pancakeswap.finance/#/swap?outputCurrency=0xa86d305A36cDB815af991834B46aD3d7FbB38523">BR34P PCS V1</a>: <b>$${numFor2.format(
    calcs.br34pWbnbPrice
  )}</b>
<a href="https://dripnetwork.io/dapp/ddd">DDD Ticket</a>: <b>$${numFor2.format(
    1
  )}</b>
    
<i><u>Totals</u></i>
Wallets: <b>${formatNumberWithSuffix(data.totalDripWallets)}</b>
Supply: <b>${formatNumberWithSuffix(data.totalDripSupply)}</b>
Liquidity Supply: <b>${formatNumberWithSuffix(calcs.lpDripBalance)}</b>
Liquid in Wallets: <b>${formatNumberWithSuffix(calcs.liquidDripBalance)}</b>
Tax Vault: <b>${formatNumberWithSuffix(data.dripVaultDripBalance)}</b>
DDD Vault: <b>${formatNumberWithSuffix(data.dddVaultDripBalance)}</b>
`;

  return msg;
};
