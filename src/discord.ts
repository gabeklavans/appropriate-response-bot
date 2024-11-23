import {
  createBot,
  DiscordInteractionContextType,
  DiscordMessageReferenceType,
  Intents,
  InteractionResponseTypes,
} from "discbot";
import { shouldRespond } from "./arb.ts";
import { getResponse } from "./arb.ts";

const ARB_SPAM_CHANNEL_ID = 1309728180738719935n;

const bot = createBot({
  token: Deno.env.get("DISCORD_BOT_TOKEN") ?? "",
  intents: Intents.MessageContent | Intents.Guilds | Intents.GuildMessages,
  desiredProperties: {
    message: {
      id: true,
      author: true,
      content: true,
      channelId: true,
    },
    user: {
      id: true,
      toggles: true, // includes the "bot" flag
      username: true,
    },
    interaction: {
      id: true,
      token: true,
      data: true,
    },
  },
  events: {
    ready: (data) => {
      bot.logger.info(`The shard ${data.shardId} is ready!`);
    },
    interactionCreate: async (interaction) => {
      if (interaction.data?.name == "ping") {
        try {
          await bot.helpers.sendInteractionResponse(
            interaction.id,
            interaction.token,
            {
              type: InteractionResponseTypes.ChannelMessageWithSource,
              data: { content: "pong" },
            },
          );
        } catch (error) {
          bot.logger.error(error);
        }
      }
    },
    messageCreate: async (message) => {
      bot.logger.debug(
        `Message with id ${message.id} has author @${message.author.username} and ${
          message.author.bot ? "is" : "isn't"
        } a bot.`,
      );
      if (!message.author.bot && shouldRespond()) {
        try {
          await bot.helpers.sendMessage(message.channelId, {
            content: getResponse(),
            messageReference: {
              type: DiscordMessageReferenceType.Default,
              messageId: message.id,
              failIfNotExists: true,
            },
          });
        } catch (error) {
          bot.logger.error(error);
        }
      }
    },
  },
});

bot.helpers.createGlobalApplicationCommand({
  name: "ping",
  description: "Try it",
  contexts: [
    DiscordInteractionContextType.Guild,
    DiscordInteractionContextType.PrivateChannel,
  ],
  options: [],
});

await bot.start();
