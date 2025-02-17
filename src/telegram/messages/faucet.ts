import { BlockchainData } from '../../web3/multicall.js';
import { formatNumberWithSuffix } from '../../utils/formats.js';

export const faucetMsg = (data: BlockchainData): string => {
  const msg: string = `
💦 <b><a href="https://dripnetwork.io/dapp/faucet">Faucet</a></b> 💦 
    
Wallets: <b>${formatNumberWithSuffix(data.faucetWallets)}</b>
Tax Vault Supply: <b>${formatNumberWithSuffix(data.dripVaultDripBalance)}</b>
`;

  return msg;
};
