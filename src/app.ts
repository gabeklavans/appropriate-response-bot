import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";
dotenv.config();

if (process.env.BOT_TOKEN === undefined) {
  throw new TypeError("BOT_TOKEN must be provided!");
}

const bot = new Telegraf(process.env.BOT_TOKEN);
const RESPONSE_CHANCE = 0.01;

bot.start((ctx) => ctx.reply("Hello"));
bot.help((ctx) => ctx.reply("Help message"));

bot.on("message", (ctx) => {
  if (Math.random() > RESPONSE_CHANCE) {
    ctx.reply("oof", { reply_to_message_id: ctx.message.message_id });
  }
});

bot.launch().then(() => {
  console.log("Started bot");
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
