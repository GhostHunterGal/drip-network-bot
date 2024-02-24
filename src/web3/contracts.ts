import { parseAbi } from 'viem';

export const erc20Abi = parseAbi([
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function totalSupply() view returns (uint256)',
]);

const chainlinkAbi = parseAbi([
  'function latestAnswer() view returns (int256)',
]);

const lpAbi = parseAbi([
  'function getReserves() view returns (uint112, uint112, uint32)',
  'function slot0() view returns (uint160, int24, uint16, uint16, uint16, uint32, bool)',
]);

export const contracts = {
  chainlinkBnb: {
    address: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
    abi: chainlinkAbi,
  },
  chainlinkBusd: {
    address: '0xcBb98864Ef56E9042e7d2efef76141f15731B82f',
    abi: chainlinkAbi,
  },
  busd: {
    address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    abi: erc20Abi,
  },
  wbnb: {
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    abi: erc20Abi,
  },
  drip: {
    address: '0x20f663CEa80FaCE82ACDFA3aAE6862d246cE0333',
    abi: parseAbi(['function players() view returns (uint256)']),
  },
  dripBusd: {
    address: '0xa0feB3c81A36E885B6608DF7f0ff69dB97491b58',
    abi: lpAbi,
  },
  fountain: {
    address: '0x4Fe59AdcF621489cED2D674978132a54d432653A',
    abi: parseAbi([
      'function tokenBalance() view returns (uint256)',
      'function bnbBalance() view returns (uint256)',
      'function getTokenToBnbInputPrice(uint256) view returns (uint256)',
    ]),
  },
  faucet: {
    address: '0xFFE811714ab35360b67eE195acE7C10D93f89D8C',
    abi: parseAbi(['function total_users() view returns (uint256)']),
  },
  dripVault: {
    address: '0xBFF8a1F9B5165B787a00659216D7313354D25472',
    abi: [],
  },
  ddd: {
    address: '0xDdB33A6613FBd73A3b9c39a04Cc15738E38da370',
    abi: parseAbi([
      'function currentRound() view returns (uint256)',
      'function getRoundTimeRemaining() view returns (uint256)',
      'function getCurrentPrizePool() view returns (uint256)',
      'function getCurrentPrizes() view returns (uint256, uint256, uint256, uint256)',
      'function lotteryInfo() view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256)',
      'function roundsInfo(uint256) view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256, (uint256, uint256, address, address, address, address, address, address, address), (uint256, uint256, uint256), bool, uint256)',
    ]),
  },
  dddMarketing: {
    address: '0xD0cAb75C9B9eb4b0661a9d1eBfBC00ca5E026E1B',
    abi: [],
  },
  reservoir: {
    address: '0xB486857fac4254A7ffb3B1955EE0C0A2B2ca75AB',
    abi: parseAbi([
      'function players() view returns (uint256)',
      'function lockedTokenBalance() view returns (uint256)',
      'function totalTokenBalance() view returns (uint256)',
      'function dividendBalance() view returns (uint256)',
      'function totalWithdrawn() view returns (uint256)',
    ]),
  },
  garden: {
    address: '0x685BFDd3C2937744c13d7De0821c83191E3027FF',
    abi: parseAbi(['function getBalance() view returns (uint256)']),
  },
  dEaD: {
    address: '0x000000000000000000000000000000000000dEaD',
    abi: [],
  },
  kitchenSink: {
    address: '0x19593aF864D255726f26324cd2ab868ECeea796e',
    abi: [],
  },
  wdrip: {
    address: '0xF30224eB7104aca47235beb3362E331Ece70616A',
    abi: [],
  },
  br34pWbnb: {
    address: '0x70e882efa9beA28262d4873e65d5f65E9B2bABa6',
    abi: lpAbi,
  },
  wdripWbnb: {
    address: '0x41e3149918f8EFeE8Ef6f47CF45D4CE580F837cB',
    abi: lpAbi,
  },
  wdripWpls: {
    address: '0x7091580d383d7c0a3ac0017adb5f8a549d9784cd',
    abi: lpAbi,
  },
  wdripDripx: {
    address: '0x54A7A21906E6bBb4C1320D69E65888ce19CaAa1A',
    abi: lpAbi,
  },
} as const;
