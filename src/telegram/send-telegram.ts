import { CHAT_ID } from '../utils/env-vars.js';
import { bot } from './client.js';
import { getBlockchainData } from '../web3/multicall.js';
import { doCalcs } from '../web3/calculations.js';
import { dripMsg } from './messages/drip.js';
import { liquidityMsg } from './messages/liquidity.js';
import { faucetMsg } from './messages/faucet.js';
import { dddMsg } from './messages/ddd.js';
import { reservoirMsg } from './messages/reservoir.js';
import { gardenMsg } from './messages/garden.js';
import { opts, sleep } from '../utils/misc.js';

const messageDelay: number = 750;

const sendTelegramMsg = async (msg: string, topic?: number): Promise<void> => {
  try {
    await bot.sendMessage(CHAT_ID, msg, opts(topic));
  } catch (error) {
    console.error('❌ sendTelegramMsg() error!', error);
    throw error;
  }
};

export const sendDripMsgs = async (): Promise<void> => {
  const data = await getBlockchainData();
  const calcs = await doCalcs(data);

  const [
    dripMessage,
    liquidityMessage,
    faucetMessage,
    dddMessage,
    reservoirMessage,
    gardenMessage,
  ] = await Promise.all([
    dripMsg(data, calcs),
    liquidityMsg(data, calcs),
    faucetMsg(data),
    dddMsg(data, calcs),
    reservoirMsg(data, calcs),
    gardenMsg(data, calcs),
  ]);

  await sendTelegramMsg(gardenMessage, 16830);
  await sleep(messageDelay);
  await sendTelegramMsg(reservoirMessage, 16832);
  await sleep(messageDelay);
  await sendTelegramMsg(dddMessage, 16834);
  await sleep(messageDelay);
  await sendTelegramMsg(faucetMessage, 16836);
  await sleep(messageDelay);
  await sendTelegramMsg(liquidityMessage, 16838);
  await sleep(messageDelay);
  await sendTelegramMsg(dripMessage);
};
