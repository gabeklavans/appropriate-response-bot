import Fastify from "fastify";
import { webhookCallback } from "grammy";
import { bot } from "./bot";

const fastify = Fastify({
  logger: { level: "debug" },
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const path = process.env.SERVER_DOMAIN ?? "::";

if (process.env.NODE_ENV === "production") {
  fastify.post(
    `/${process.env.WEBHOOK_SECRET}`,
    webhookCallback(bot, "fastify")
  );
}

fastify.listen(
  {
    port,
    path,
  },
  async (err) => {
    if (err) {
      fastify.log.fatal(err);
      process.exit(1);
    }

    if (process.env.NODE_ENV === "production") {
      await bot.api.setWebhook(
        `${process.env.SERVER_URL}/${process.env.WEBHOOK_SECRET}`
      );
    }
  }
);
