import Discord from 'discord.js';
import chalk from 'chalk';
import { join } from 'path';
import { readdirSync } from 'fs';

export default {
  name: 'reloadcommands',
  description: 'Reloads all commands.',
  ownerOnly: true,
  hidden: true,
  async execute(message) {
    const client = message.client;

    const commandFiles = readdirSync(join(__dirname, 'commands'));

    client.commands = new Discord.Collection();

    for (const file of commandFiles) {
      const command = (await import(`./${file}?random=${Math.random()}`)).default;
  
      chalk.debug(`Command ${file} reloaded as ${command.name}.`);
  
      client.commands.set(command.name, command);
    }
    
    message.channel.send('ok sure');

    return true;
  }
};
