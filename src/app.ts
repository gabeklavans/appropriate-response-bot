/* Uncomment this if you wanna use types smh */
import { Telegraf } from "telegraf";
// const Telegraf = require("telegraf");
import * as dotenv from "dotenv";
import { Message, Update } from "typegram";
dotenv.config();

if (process.env.BOT_TOKEN === undefined) {
  throw new TypeError("BOT_TOKEN must be provided!");
}

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.getMe().then((botInfo) => {
  (bot as any).options.username = botInfo.username;
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
  "julia who??",
  "someday Emily will too",
  "so true, bestie",
  "swond",
  "OK, I failed at that.",
  "you must not be talking about women",
  "immigrants,, they get the job done"
];

bot.start((ctx) => {
  ctx.reply("You'll be hearing from me.")
});

bot.on("message", (ctx) => {
  const isMention = (ctx.message as any).entities ? (ctx.message as any).entities[0].type === 'mention' : false;

  if (isMention) {
    // got mentioned, figure out whether to reply to sender or the sender's replied message
    const repliedMsgId = (ctx.message as Update.New & Update.NonChannel & Message.TextMessage).reply_to_message?.message_id;
    const response = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
    if (repliedMsgId) {
      // reply to reply
      ctx.reply(response, { reply_to_message_id: repliedMsgId });
    } else {
      // reply to sender
      ctx.reply(response, { reply_to_message_id: ctx.message.message_id })
    }
  } else {
    // just a normal message, decide to randomly respond
    if (Math.random() <= RESPONSE_CHANCE) {
      const response = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
      setTimeout(() => {
        ctx.reply(response, { reply_to_message_id: ctx.message.message_id });
      }, 420);
    }
  }

});

bot.launch().then(() => {
  console.log("Started bot");
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
