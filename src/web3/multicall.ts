import { bscClient, plsClient } from './client';
import { contracts, erc20Abi } from './contracts';
import { formatEther, formatUnits, parseEther } from 'viem';
import axios from 'axios';

export interface BlockchainData {
  bnbPrice: number;
  busdPrice: number;
  totalDripWallets: number;
  totalDripSupply: number;
  dripVaultDripBalance: number;
  dripBusdReserves: number[];
  dripBusdLpSupply: number;
  fountainDripBalance: number;
  fountainWbnbBalance: number;
  fountainRatio: number;
  dropsLpSupply: number;
  faucetWallets: number;
  gardenLpBalance: number;
  totalReservoirWallets: number;
  totalLockedDrops: number;
  reservoirDropsSupply: number;
  reservoirDividendPoolBalance: number;
  reservoirTotalWithdrawn: number;
  dddCurrentRound: number;
  dddCurrentRoundTimeRemaining: number;
  dddPrizePoolBalance: number;
  dddCurrentPrizes: number[];
  dddTotalLotteryInfo: number[];
  dddVaultDripBalance: number;
  dddMarketingWbnbBalance: number;
  dddMarketingBusdBalance: number;
  dddMarketingDripBalance: number;
  dddRoundInfo: any;
  dEaDDripBalance: number;
  kitchenSinkDripBalance: number;
  wdripDripBalance: number;
  faucetDripBalance: number;
  dripDripBalance: number;
  br34pWbnbReserves: number[];
  wdripWbnbSlot0: any;
  wdripWplsReserves: number[];
  wplsPrice: number;
}

export const getBlockchainData = async () => {
  const results = await bscClient.multicall({
    contracts: [
      {
        ...contracts.chainlinkBnb,
        functionName: 'latestAnswer',
      },
      {
        ...contracts.chainlinkBusd,
        functionName: 'latestAnswer',
      },
      {
        ...contracts.drip,
        functionName: 'players',
      },
      {
        address: contracts.drip.address,
        abi: erc20Abi,
        functionName: 'totalSupply',
      },
      {
        address: contracts.drip.address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [contracts.dripVault.address],
      },
      {
        ...contracts.dripBusd,
        functionName: 'getReserves',
      },
      {
        address: contracts.dripBusd.address,
        abi: erc20Abi,
        functionName: 'totalSupply',
      },
      {
        ...contracts.fountain,
        functionName: 'tokenBalance',
      },
      {
        ...contracts.fountain,
        functionName: 'bnbBalance',
      },
      {
        ...contracts.fountain,
        functionName: 'getTokenToBnbInputPrice',
        args: [parseEther('1')],
      },
      {
        address: contracts.fountain.address,
        abi: erc20Abi,
        functionName: 'totalSupply',
      },
      {
        ...contracts.faucet,
        functionName: 'total_users',
      },
      {
        ...contracts.garden,
        functionName: 'getBalance',
      },
      {
        ...contracts.reservoir,
        functionName: 'players',
      },
      {
        ...contracts.reservoir,
        functionName: 'lockedTokenBalance',
      },
      {
        ...contracts.reservoir,
        functionName: 'totalTokenBalance',
      },
      {
        ...contracts.reservoir,
        functionName: 'dividendBalance',
      },
      {
        ...contracts.reservoir,
        functionName: 'totalWithdrawn',
      },
      {
        ...contracts.ddd,
        functionName: 'currentRound',
      },
      {
        ...contracts.ddd,
        functionName: 'getRoundTimeRemaining',
      },
      {
        ...contracts.ddd,
        functionName: 'getCurrentPrizePool',
      },
      {
        ...contracts.ddd,
        functionName: 'getCurrentPrizes',
      },
      {
        ...contracts.ddd,
        functionName: 'lotteryInfo',
      },
      {
        address: contracts.drip.address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [contracts.ddd.address],
      },
      {
        address: contracts.busd.address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [contracts.dddMarketing.address],
      },
      {
        address: contracts.drip.address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [contracts.dddMarketing.address],
      },
      {
        address: contracts.drip.address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [contracts.dEaD.address],
      },
      {
        address: contracts.drip.address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [contracts.kitchenSink.address],
      },
      {
        address: contracts.drip.address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [contracts.wdrip.address],
      },
      {
        address: contracts.drip.address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [contracts.faucet.address],
      },
      {
        address: contracts.drip.address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [contracts.drip.address],
      },
      {
        ...contracts.br34pWbnb,
        functionName: 'getReserves',
      },
      {
        ...contracts.wdripWbnb,
        functionName: 'slot0',
      },
    ],
  });

  const dddMarketingWbnbBalance = await bscClient.getBalance({
    address: contracts.dddMarketing.address,
  });

  const dddRoundInfo = await bscClient.readContract({
    ...contracts.ddd,
    functionName: 'roundsInfo',
    args: [results[18].result as bigint],
  });

  const plsResults = await plsClient.multicall({
    contracts: [
      {
        ...contracts.wdripWpls,
        functionName: 'getReserves',
      },
    ],
  });

  const response = await axios.get(
    `https://api.geckoterminal.com/api/v2/simple/networks/pulsechain/token_price/0xa1077a294dde1b09bb078844df40758a5d0f9a27`
  );

  const tokenPrices = response.data.data.attributes.token_prices;
  const wplsPrice = tokenPrices['0xa1077a294dde1b09bb078844df40758a5d0f9a27'];

  const data = {
    bnbPrice: Number(formatUnits(results[0].result as bigint, 8)),
    busdPrice: Number(formatUnits(results[1].result as bigint, 8)),
    totalDripWallets: Number(results[2].result),
    totalDripSupply: Number(formatEther(results[3].result as bigint)),
    dripVaultDripBalance: Number(formatEther(results[4].result as bigint)),
    dripBusdReserves: (results[5].result as bigint[]).map((value) =>
      Number(formatEther(value))
    ),
    dripBusdLpSupply: Number(formatEther(results[6].result as bigint)),
    fountainDripBalance: Number(formatEther(results[7].result as bigint)),
    fountainWbnbBalance: Number(formatEther(results[8].result as bigint)),
    fountainRatio: Number(formatEther(results[9].result as bigint)),
    dropsLpSupply: Number(formatEther(results[10].result as bigint)),
    faucetWallets: Number(results[11].result),
    gardenLpBalance: Number(formatEther(results[12].result as bigint)),
    totalReservoirWallets: Number(results[13].result),
    totalLockedDrops: Number(formatEther(results[14].result as bigint)),
    reservoirDropsSupply: Number(formatEther(results[15].result as bigint)),
    reservoirDividendPoolBalance: Number(
      formatEther(results[16].result as bigint)
    ),
    reservoirTotalWithdrawn: Number(formatEther(results[17].result as bigint)),
    dddCurrentRound: Number(results[18].result),
    dddCurrentRoundTimeRemaining: Number(results[19].result),
    dddPrizePoolBalance: Number(formatEther(results[20].result as bigint)),
    dddCurrentPrizes: (results[21].result as bigint[]).map((value) =>
      Number(formatEther(value))
    ),
    dddTotalLotteryInfo: (results[22].result as bigint[]).map((value, index) =>
      index <= 3 ? Number(value) : Number(formatEther(value))
    ),
    dddVaultDripBalance: Number(formatEther(results[23].result as bigint)),
    dddMarketingWbnbBalance: Number(
      formatEther(dddMarketingWbnbBalance as bigint)
    ),
    dddMarketingBusdBalance: Number(formatEther(results[24].result as bigint)),
    dddMarketingDripBalance: Number(formatEther(results[25].result as bigint)),
    dddRoundInfo: dddRoundInfo.map((value, index) => {
      if (index <= 5) {
        return value;
      } else if (index === 6 || index === 7) {
        return Number(value);
      } else if (index === 9) {
        const [
          dddBiggestSacrifice,
          dddBiggestDeposit,
          ,
          ,
          ,
          ,
          ,
          dddBiggestSacrificer,
          dddBiggestDepositor,
        ] = value as readonly [
          bigint,
          bigint,
          `0x${string}`,
          `0x${string}`,
          `0x${string}`,
          `0x${string}`,
          `0x${string}`,
          `0x${string}`,
          `0x${string}`
        ];

        return [
          dddBiggestSacrifice,
          dddBiggestDeposit,
          dddBiggestSacrificer,
          dddBiggestDepositor,
        ];
      }
    }),
    dEaDDripBalance: Number(formatEther(results[26].result as bigint)),
    kitchenSinkDripBalance: Number(formatEther(results[27].result as bigint)),
    wdripDripBalance: Number(formatEther(results[28].result as bigint)),
    faucetDripBalance: Number(formatEther(results[29].result as bigint)),
    dripDripBalance: Number(formatEther(results[30].result as bigint)),
    br34pWbnbReserves: (results[31].result as bigint[]).map((value, index) =>
      index === 0 ? Number(formatUnits(value, 8)) : Number(formatEther(value))
    ),
    wdripWbnbSlot0: (results[32].result as bigint[]).map((value, index) => {
      if (index === 0) {
        return value;
      } else {
        return value;
      }
    }),
    wdripWplsReserves: (plsResults[0].result as unknown as bigint[]).map(
      (value) => Number(formatEther(value))
    ),
    wplsPrice: Number(wplsPrice),
  };

  return data;
};
