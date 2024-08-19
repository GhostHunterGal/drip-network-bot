import { NODE_ENDPOINT } from '../utils/env-vars.js';
import { createPublicClient, fallback, http } from 'viem';
import { bsc, pulsechain } from 'viem/chains';

const chainStack = http(NODE_ENDPOINT);
const ankr = http('https://rpc.ankr.com/bsc');
const publicNode = http('https://pulsechain.publicnode.com');

export const bscClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: bsc,
  transport: fallback([chainStack, ankr]),
});

export const plsClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: pulsechain,
  transport: fallback([http(), publicNode]),
});
