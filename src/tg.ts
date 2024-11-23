import {
  Bot,
  webhookCallback,
} from "https://deno.land/x/grammy@v1.32.0/mod.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import {
  getResponse,
  REALISTIC_THINKING_TIME_MS,
  shouldRespond,
} from "./arb.ts";

export const bot = new Bot(Deno.env.get("BOT_TOKEN") ?? "");

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
    const response = getResponse();
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
    if (shouldRespond()) {
      const response = getResponse();
      setTimeout(() => {
        ctx.reply(response, { reply_to_message_id: ctx.message.message_id });
      }, REALISTIC_THINKING_TIME_MS);
    }
  }
});

if (Deno.env.get("USE_WEBHOOK") == "true") {
  const app = new Application(); // or whatever you're using

  app.use(webhookCallback(bot, "oak"));
} else {
  bot.start();
}
