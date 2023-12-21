import { BlockchainData } from '../../web3/multicall';
import { Calculations } from '../../web3/calculations';
import { formatNumberWithSuffix, numFor2 } from '../../utils/formats';

export const gardenMsg = (
  data: BlockchainData,
  calcs: Calculations
): string => {
  const msg: string = `
🌱 <b><a href="https://dripnetwork.io/dapp/garden">Garden</a></b> 🌱

Total LP Locked: <b>${formatNumberWithSuffix(data.gardenLpBalance)}</b>
DRIP/BUSD LP Price: <b>$${numFor2.format(calcs.dripBusdLpPrice)}</b>
`;

  return msg;
};
