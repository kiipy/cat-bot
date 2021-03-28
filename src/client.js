import { dirname, join } from 'path';
import { Client } from 'discord.js';
import commands from './commands.js';
import { fileURLToPath } from 'url';
import reactions from './reactions.js';
import { readFileSync } from 'fs';
import utils from './utils.js';

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

global.config = JSON.parse(readFileSync(join(__dirname, '../config.json')));

const { productionToken, betaToken, mode } = global.config;

utils.init();

['uncaughtException', 'unhandledRejection'].forEach(event => process.on(event, console.error));

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.once('ready', () => {
  const activities = ['cat memes', 'monkey videos', 'updates', 'quality content'];
  var current = 0;

  (function statusChange() {
    client.user.setActivity(activities[current++ % activities.length], { type: 'STREAMING', url: 'https://www.twitch.tv/discord_cat_bot' });

    setTimeout(statusChange, 600000);
  })();

  commands(client);
  reactions(client);
});

client.on('error', console.error);
client.on('warn', console.warn);

client.login(mode === 'production' ? productionToken : mode === 'beta' ? betaToken : 'ERROR');
