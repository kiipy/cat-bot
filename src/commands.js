import Discord from 'discord.js';
import chalk from 'chalk';
import { join } from 'path';
import { readdirSync } from 'fs';
import utils from './utils.js';

const init = async (client) => {
  const { yes, no, owner } = global.config;

  const commandFiles = readdirSync(join(__dirname, 'commands'));

  client.commands = new Discord.Collection();

  for (const file of commandFiles) {
    const command = (await import(`./commands/${file}`)).default;

    chalk.debug(`Command ${file} loaded as ${command.name}.`);

    client.commands.set(command.name, command);
  }

  client.on('message', async (message) => {
    if (message.author.bot) return;

    if (message.channel.type === 'dm') return;

    const guildData = await utils.getGuild(message.guild.id);

    if (!message.content.startsWith(guildData.prefix)) return;

    const args = message.content.slice(guildData.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (client.commands.has(command)) {
      try {
        if (guildData.disabledCategories) if (guildData.disabledCategories.includes(client.commands.get(command).category)) return;

        const permission = client.commands.get(command).permission;

        if (permission !== undefined) {
          if (!message.member.hasPermission(permission)) {
            message.channel.send(`You don't have the permission ${permission} which is required for this command.`);

            await message.react(no);

            return;
          }
        }

        if (client.commands.get(command).ownerOnly) {
          if (message.author.id !== owner) {
            message.channel.send('You need to be the bot owner to run this command.');

            await message.react(no);

            return;
          }
        }

        const usage = client.commands.get(command).usage;

        var requiredArgs = 0;

        if (usage != undefined) {
          requiredArgs = usage.split(' ').length;
        }

        if (args.length >= requiredArgs) {
          const success = await client.commands.get(command).execute(message, args);

          if (success) await message.react(yes);
          else await message.react(no);
        } else {
          message.channel.send(`Usage: ${guildData.prefix}${command} ${usage}`);

          await message.react(no);
        }
      } catch (error) {
        console.error(error);

        message.channel.send('Oops... an error occurred whilst executing that command.');

        await message.react(no);
      }
    } else {
      message.channel.send(`That command couldn't be recognised. Type ${guildData.prefix}help for help.`);

      await message.react(no);
    }
  });
};

export default init;
