console.clear();

require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { Guilds, GuildMessages } = GatewayIntentBits;

const client = new Client({
  intents: [Guilds, GuildMessages],
});

client.events = new Collection();
client.subCommands = new Collection();
client.commands = new Collection();

const { loadAllEvents } = require("../Handlers/eventLoader");
loadAllEvents(client);

client.login(process.env.TOKEN);
