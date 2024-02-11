import {Client, GatewayIntentBits} from "discord.js";
import {NotificationProviderType} from "./types/notification-provider.type";

const {
  DISCORD_NOTIFICATION_USER,
  DISCORD_APP_TOKEN
} = process.env;
const DISCORD_MESSAGE_CHAR_LIMIT = 2000;

const client = new Client({ intents: [GatewayIntentBits.DirectMessages] });

export const parseDiscordMessages = (messages: string[]): string[] => {
  return messages.reduce((acc, next) => {
    if (next.length > DISCORD_MESSAGE_CHAR_LIMIT) {
      console.error(`Exception: Message extends character limit: ${next}`);
      return [...acc];
    }
    if (!acc.length) {
      acc.push(`${next}`);
      return [...acc];
    }
    const nextNewLine = `\n${next}`;
    const lastMessageIndex = Math.max(0, acc.length - 1);
    if ((acc[lastMessageIndex]?.length || 0) + nextNewLine.length > DISCORD_MESSAGE_CHAR_LIMIT) {
      acc.push(next);
    } else {
      acc[lastMessageIndex] += nextNewLine;
    }
    return [...acc];
  }, [] as string[]);
};

export const notifyDiscordMessages = async (messages: string[]): Promise<void> => {
  const parsedMessages = parseDiscordMessages(messages);
  const user = await client.users.fetch(DISCORD_NOTIFICATION_USER as string);
  await Promise.all(parsedMessages.map(message => user.send(message)));
};

export const connect = async (): Promise<void> => {
  await client.login(DISCORD_APP_TOKEN);
}
export const disconnect = async (): Promise<void> => client.destroy();

export const discordNotificationProvider: NotificationProviderType = {
  connect,
  disconnect,
  notify: notifyDiscordMessages,
}
