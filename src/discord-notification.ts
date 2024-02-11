import {Client, GatewayIntentBits} from "discord.js";
import {NotificationServiceType} from "./types/notification.type";
const {
  DISCORD_NOTIFICATION_USER,
  DISCORD_APP_TOKEN
} = process.env;

export const discordNotificationService: NotificationServiceType = (() => {
  const client = new Client({ intents: [GatewayIntentBits.DirectMessages] });
  return {
    connect: async () => {
      await client.login(DISCORD_APP_TOKEN)
    },
    disconnect: async () => {
      await client.destroy();
    },
    notify: async (message: string) => {
      const user = await client.users.fetch(DISCORD_NOTIFICATION_USER as string);
      console.log(user);
      await user.send(message);
    }
  }
})();
