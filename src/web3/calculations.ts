import { BlockchainData } from './multicall';

export interface Calculations {
  dripBusdReserve0: number;
  dripBusdReserve1: number;
  dripBusdLiquidity: number;
  dripBusdLpPrice: number;
  dripBusdRatio: number;
  dripBusdPrice: number;
  fountainLiquidity: number;
  dripFountainPrice: number;
  dropsPrice: number;
  dropsBnbPrice: number;
  lpDripBalance: number;
  liquidDripBalance: number;
  dddRollOver: number;
  dddFirstPrize: number;
  dddRunnerUpPrize: number;
  dddBiggestPrize: number;
  dddTotalPaidTickets: number;
  dddTotalFreeTicketsAwarded: number;
  dddTotalFreeTicketsClaimed: number;
  dddTotalPrizes: number;
  dddTotalSentToFaucet: number;
  dddTotalSentToVault: number;
  dddMarketingWbnbValue: number;
  dddMarketingBusdValue: number;
  dddMarketingDripValue: number;
  dddCurrentRoundTotalTickets: number;
  dddCurrentRoundTotalPlayers: number;
  dddBiggestSacrifice: bigint;
  dddBiggestDeposit: bigint;
  dddBiggestSacrificer: `0x${string}`;
  dddBiggestDepositor: `0x${string}`;
  dddOdds: number;
  br34pWbnbPrice: number;
}

export const doCalcs = async (data: BlockchainData) => {
  const [dripBusdReserve0, dripBusdReserve1] = data.dripBusdReserves;

  const [dripBusdLiquidity, fountainLiquidity] = [
    dripBusdReserve1 * data.busdPrice * 2,
    data.fountainWbnbBalance * data.bnbPrice * 2,
  ];
  const [dripBusdLpPrice, dropsPrice] = [
    dripBusdLiquidity / data.dripBusdLpSupply,
    fountainLiquidity / data.dropsLpSupply,
  ];

  const dropsBnbPrice = dropsPrice / data.bnbPrice;

  const dripBusdRatio = dripBusdReserve1 / dripBusdReserve0;

  const [dripFountainPrice, dripBusdPrice] = [
    data.fountainRatio * data.bnbPrice,
    dripBusdRatio * data.busdPrice,
  ];

  const higherDripPrice = Math.max(dripFountainPrice, dripBusdPrice);

  const lpDripBalance = dripBusdReserve0 + data.fountainDripBalance;

  const liquidDripBalance =
    data.totalDripSupply -
    lpDripBalance -
    data.dripVaultDripBalance -
    data.dddVaultDripBalance -
    data.faucetDripBalance -
    data.dripDripBalance -
    data.dEaDDripBalance -
    data.kitchenSinkDripBalance -
    data.wdripDripBalance;

  const dddRollOver = data.dddVaultDripBalance - data.dddPrizePoolBalance;

  const [dddFirstPrize, dddRunnerUpPrize, dddBiggestPrize] =
    data.dddCurrentPrizes;

  const [
    dddTotalPaidTickets,
    dddTotalFreeTicketsAwarded,
    dddTotalFreeTicketsClaimed,
    ,
    dddTotalPrizes,
    dddTotalSentToVault,
    dddTotalSentToFaucet,
  ] = data.dddTotalLotteryInfo;

  const [dddMarketingWbnbValue, dddMarketingBusdValue, dddMarketingDripValue] =
    [
      data.dddMarketingWbnbBalance * data.bnbPrice,
      data.dddMarketingBusdBalance * data.busdPrice,
      data.dddMarketingDripBalance * higherDripPrice,
    ];

  const [
    ,
    ,
    ,
    ,
    ,
    ,
    dddCurrentRoundTotalTickets,
    dddCurrentRoundTotalPlayers,
    ,
    dddCurrentRoundWinnersAndBiggestDepositors,
    ,
    ,
    ,
  ] = data.dddRoundInfo;

  const [
    dddBiggestSacrifice,
    dddBiggestDeposit,
    dddBiggestSacrificer,
    dddBiggestDepositor,
  ] = dddCurrentRoundWinnersAndBiggestDepositors;

  const dddOdds = dddCurrentRoundTotalTickets / 5;

  const [br34pWbnbReserve0, br34pWbnbReserve1] = data.br34pWbnbReserves;
  const br34pWbnbRatio = br34pWbnbReserve1 / br34pWbnbReserve0;
  const br34pWbnbPrice = br34pWbnbRatio * data.bnbPrice;

  return {
    dripBusdReserve0: dripBusdReserve0,
    dripBusdReserve1: dripBusdReserve1,
    dripBusdLiquidity: dripBusdLiquidity,
    dripBusdLpPrice: dripBusdLpPrice,
    dripBusdRatio: dripBusdRatio,
    dripBusdPrice: dripBusdPrice,
    fountainLiquidity: fountainLiquidity,
    dripFountainPrice: dripFountainPrice,
    dropsPrice: dropsPrice,
    dropsBnbPrice: dropsBnbPrice,
    lpDripBalance: lpDripBalance,
    liquidDripBalance: liquidDripBalance,
    dddRollOver: dddRollOver,
    dddFirstPrize: dddFirstPrize,
    dddRunnerUpPrize: dddRunnerUpPrize,
    dddBiggestPrize: dddBiggestPrize,
    dddTotalPaidTickets: dddTotalPaidTickets,
    dddTotalFreeTicketsAwarded: dddTotalFreeTicketsAwarded,
    dddTotalFreeTicketsClaimed: dddTotalFreeTicketsClaimed,
    dddTotalPrizes: dddTotalPrizes,
    dddTotalSentToFaucet: dddTotalSentToFaucet,
    dddTotalSentToVault: dddTotalSentToVault,
    dddMarketingWbnbValue: dddMarketingWbnbValue,
    dddMarketingBusdValue: dddMarketingBusdValue,
    dddMarketingDripValue: dddMarketingDripValue,
    dddCurrentRoundTotalTickets: dddCurrentRoundTotalTickets,
    dddCurrentRoundTotalPlayers: dddCurrentRoundTotalPlayers,
    dddBiggestSacrifice: dddBiggestSacrifice,
    dddBiggestDeposit: dddBiggestDeposit,
    dddBiggestSacrificer: dddBiggestSacrificer,
    dddBiggestDepositor: dddBiggestDepositor,
    dddOdds: dddOdds,
    br34pWbnbPrice: br34pWbnbPrice,
  };
};
