import { BlockchainData } from '../../web3/multicall';
import { Calculations } from '../../web3/calculations';
import {
  formatNumberWithSuffix,
  numFor2,
  numFor3,
  numFor6,
} from '../../utils/formats';

export const liquidityMsg = (
  data: BlockchainData,
  calcs: Calculations
): string => {
  const msg: string = `
🌊 <b>Liquidity Pools</b> 🌊

Liquidity $ Value: 1 = (A*C)*2
LP $ Price: 3 = 1/2
DRIP $ Price: D = (A/B)*C
    
<i><u><a href="https://dripnetwork.io/dapp/swap">Fountain (DEX)</a></u></i>
1. Liquidity: <b>$${formatNumberWithSuffix(calcs.fountainLiquidity)}</b>
2. DROPS LP Total Supply: <b>${formatNumberWithSuffix(data.dropsLpSupply)}</b>
3. DROPS LP Price: (<b>${numFor3.format(
    calcs.dropsBnbPrice
  )}</b> BNB) <b>$${numFor2.format(calcs.dropsPrice)}</b>

(A) BNB Supply: <b>${formatNumberWithSuffix(data.fountainWbnbBalance)}</b>
(B) DRIP Supply: <b>${formatNumberWithSuffix(data.fountainDripBalance)}</b>
(C) BNB Price: <b>$${formatNumberWithSuffix(data.bnbPrice)}</b>
(D) DRIP Price: (<b>${numFor6.format(
    data.fountainRatio
  )}</b> BNB) <b>$${numFor3.format(calcs.dripFountainPrice)}</b>

<i><u><a href="https://pancakeswap.finance/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0x20f663CEa80FaCE82ACDFA3aAE6862d246cE0333">Pancakeswap (PCS)</a></u></i>
1. Liquidity: <b>$${formatNumberWithSuffix(calcs.dripBusdLiquidity)}</b>
2. DRIP/BUSD LP Total Supply: <b>${formatNumberWithSuffix(
    data.dripBusdLpSupply
  )}</b>
3. DRIP/BUSD LP Price: <b>$${numFor2.format(calcs.dripBusdLpPrice)}</b>

(A) BUSD Supply: <b>${formatNumberWithSuffix(calcs.dripBusdReserve1)}</b>
(B) DRIP Supply: <b>${formatNumberWithSuffix(calcs.dripBusdReserve0)}</b>
(C) BUSD Price: <b>$${numFor2.format(data.busdPrice)}</b>
(D) DRIP Price: (<b>${numFor3.format(
    calcs.dripBusdRatio
  )}</b> BUSD) <b>$${numFor3.format(calcs.dripBusdPrice)}</b>
`;

  return msg;
};
