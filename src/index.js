if (process.env.NODE_ENV !== "production") require("dotenv").config();

const Discord = require("discord.js");

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES], partials: ["CHANNEL"] });

const PREFIX = "!";

client.once("ready", () => {
  console.log(`${client.user.tag} is online`);
});

client.on("messageCreate", (message) => {
  if (!message.author.bot && message.content.toLowerCase().trim().startsWith(`${PREFIX}coinflip`)) {
    message.channel
      .send("Flipping...")
      .then((message) => {
        setTimeout(() => {
          const rand = Math.random() > 0.5;
          message.edit(`It's ${rand ? "heads" : "tails"}!`);
        }, 1000);
      })
      .catch(console.error);
  }
});

client.login(process.env.TOKEN);

process.on("unhandledException", console.error);
process.on("unhandledRejection", console.error);
