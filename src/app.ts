/* Uncomment this if you wanna use types smh */
// import { Telegraf } from "telegraf";
const Telegraf = require("telegraf");
import * as dotenv from "dotenv";
dotenv.config();

if (process.env.BOT_TOKEN === undefined) {
  throw new TypeError("BOT_TOKEN must be provided!");
}

const bot = new Telegraf.Telegraf(process.env.BOT_TOKEN);

bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username;
});

const RESPONSE_CHANCE = 0.01;
const RESPONSES = [
  "oof",
  "pog",
  "poggers",
  "poggers moment",
  "yeet",
  "nice",
  "lit",
  "omg this",
  "😂",
  "pogchamp",
  "rip",
  "sheeeeeeeesh",
  "julia who??"
];

bot.on("message", (ctx) => {
  if (Math.random() <= RESPONSE_CHANCE) {
    const response = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
    ctx.reply(response, { reply_to_message_id: ctx.message.message_id });
  }
});

bot.launch().then(() => {
  console.log("Started bot");
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
