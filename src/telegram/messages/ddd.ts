import { BlockchainData } from '../../web3/multicall';
import { Calculations } from '../../web3/calculations';
import { convertSecondsToTime } from '../../utils/misc';
import {
  abbreviateAddress,
  formatNumberWithSuffix,
  numFor,
  numFor2,
} from '../../utils/formats';

export const dddMsg = (data: BlockchainData, calcs: Calculations): string => {
  const msg: string = `
🎟️ <b><a href="https://dripnetwork.io/dapp/ddd">Drip Drop Draw</a></b> 🎟️
    
<i><u>Current</u></i> (<b>${convertSecondsToTime(
    data.dddCurrentRoundTimeRemaining
  )}</b> remaining)
Round: <b>${numFor.format(data.dddCurrentRound)}</b>
Players: <b>${numFor.format(calcs.dddCurrentRoundTotalPlayers)}</b>
Tickets: <b>${numFor.format(
    calcs.dddCurrentRoundTotalTickets
  )}</b> - odds <b>1</b> in <b>${Math.floor(calcs.dddOdds)}</b> ticket(s)
Biggest Sacrifice: <b>${abbreviateAddress(
    calcs.dddBiggestSacrificer
  )}</b> (<b>${numFor.format(calcs.dddBiggestSacrifice)}</b>)
Biggest Deposit: <b>${abbreviateAddress(
    calcs.dddBiggestDepositor
  )}</b> (<b>${numFor.format(calcs.dddBiggestDeposit)}</b>)
    
Vault: <b>${formatNumberWithSuffix(data.dddVaultDripBalance)}</b>
Roll Over: <b>${formatNumberWithSuffix(calcs.dddRollOver)}</b>
Prize Pool: <b>${formatNumberWithSuffix(data.dddPrizePoolBalance)}</b>
1st Place Prize: <b>${formatNumberWithSuffix(calcs.dddFirstPrize)}</b>
Runner Up Prize: <b>${formatNumberWithSuffix(calcs.dddRunnerUpPrize)}</b>
Biggest Sac/Dep Prize: <b>${formatNumberWithSuffix(calcs.dddBiggestPrize)}</b>
    
<i><u>Totals</u></i>
Tickets Bought: <b>${formatNumberWithSuffix(calcs.dddTotalPaidTickets)}</b>
Free Tickets: <b>${formatNumberWithSuffix(calcs.dddTotalFreeTicketsAwarded)}</b>
Free Tickets Claimed: <b>${calcs.dddTotalFreeTicketsClaimed}</b>
Drip Won: <b>${formatNumberWithSuffix(calcs.dddTotalPrizes)}</b>
Sent to Faucet: <b>${formatNumberWithSuffix(calcs.dddTotalSentToFaucet)}</b>
Sent to Vault: <b>${formatNumberWithSuffix(calcs.dddTotalSentToVault)}</b>

<i><u>RNG/Marketing Wallet</u></i>
BNB: <b>${formatNumberWithSuffix(
    data.dddMarketingWbnbBalance
  )}</b> (<b>$${numFor2.format(calcs.dddMarketingWbnbValue)}</b>)
BUSD: <b>${formatNumberWithSuffix(
    data.dddMarketingBusdBalance
  )}</b> (<b>$${numFor2.format(calcs.dddMarketingBusdValue)}</b>)
DRIP: <b>${formatNumberWithSuffix(
    data.dddMarketingDripBalance
  )}</b> (<b>$${numFor2.format(calcs.dddMarketingDripValue)}</b>)
`;

  return msg;
};
