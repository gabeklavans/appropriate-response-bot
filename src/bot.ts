import * as dotenv from "dotenv";
dotenv.config();
import { Bot } from "grammy";

if (!process.env.BOT_TOKEN) {
  throw new TypeError("BOT_TOKEN must be provided!");
}

export const bot = new Bot(process.env.BOT_TOKEN);

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
  "immigrants,, they get the job done",
  "you must not be talking about *women*",
  "OR SHE",
];

bot.command("start", (ctx) => {
  ctx.reply("You'll be hearing from me.");
});

bot.on("message", (ctx) => {
  const isMention = ctx.message.entities
    ? ctx.message.entities[0].type === "mention"
    : false;

  if (isMention) {
    // got mentioned, figure out whether to reply to sender or the sender's replied message
    const repliedMsgId = ctx.message.reply_to_message?.message_id;
    const response = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
    if (repliedMsgId) {
      // reply to reply
      ctx.reply(response, { reply_to_message_id: repliedMsgId });
    } else {
      // reply to sender
      ctx.reply(response, {
        reply_to_message_id: ctx.message.message_id,
      });
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

if (process.env.NODE_ENV !== "production") {
  bot.start();
}
