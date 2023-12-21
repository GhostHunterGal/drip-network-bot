import { SendMessageOptions } from 'node-telegram-bot-api';

export const opts = (msgThreadId?: number): SendMessageOptions => {
  return {
    message_thread_id: msgThreadId,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  };
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const convertSecondsToTime = (
  remainingRoundTimeInSeconds: number
): string => {
  const hours = Math.floor(remainingRoundTimeInSeconds / 3600);
  const minutes = Math.floor((remainingRoundTimeInSeconds % 3600) / 60);
  const seconds = remainingRoundTimeInSeconds % 60;

  return `${hours}h, ${minutes}m, ${seconds}s`;
};
