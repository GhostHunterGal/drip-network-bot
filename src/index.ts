import { sendDripMsgs } from './telegram/send-telegram.js';

export const handler = async (event: any) => {
  try {
    await sendDripMsgs();
    const response = {
      statusCode: 200,
      body: JSON.stringify('Drip Telegram messages sent.'),
    };
    return response;
  } catch (error) {
    console.error(error);
  }
};
