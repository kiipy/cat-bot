import { MessageEmbed } from 'discord.js';
import Pagination from 'discord-paginationembed';

import utils from '../utils.js';

const { yes } = global.config;

export default {
  name: 'help',
  description: 'Lists all commands.',
  async execute(message) {
    const guildData = await utils.getGuild(message.guild.id);
    
    const client = message.client;

    const embeds = [];

    var commands = Array.from(client.commands, ([name, value]) => ({ name, value }))
      .map(command => command.value)
      .filter(command => !command.hidden);
    
    if (guildData.disabledCategories) commands = commands.filter(command => !guildData.disabledCategories.includes(command.category));

    for (var i = 0; i < commands.length / 5; i++) {
      const embed = new MessageEmbed();

      [...commands]
        .splice(i * 5, 5)
        .forEach(command => 
          embed.addField(`${guildData.prefix}${command.name}`, command.description));

      embeds.push(embed);
    }

    return new Pagination.Embeds()
      .setArray(embeds)
      .setAuthorizedUsers([message.author.id])
      .setChannel(message.channel)
      .setPageIndicator(true)
      .setColor('#246c54')
      .setTitle('Help')
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL())
      .setDisabledNavigationEmojis(['delete'])
      .build()
      .then(async () => await message.react(yes))
      .catch(error => {
        const missing = message.channel.permissionsFor(client.user).missing([ "ADD_REACTIONS", "MANAGE_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "SEND_MESSAGES" ]);

        if (missing.length) message.channel.send(`I need ${missing.join(', ')} for this command!`);
        else console.error(error);

        return false;
      });
  }
};
