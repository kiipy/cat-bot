import { MessageEmbed } from 'discord.js';

export default {
  name: 'vote',
  description: 'Gives a link to vote for Cat Bot.',
  execute(message) {
    message.channel.send(new MessageEmbed()
      .setColor('#246c54')
      .setTitle('Vote')
      .setDescription('Voting for the server gives you a role and access to a channel if you have joined it.')
      .addField('Bot Vote Link', '<https://top.gg/bot/734129942526165032/vote>')
      .addField('Server Vote Link:', '<https://top.gg/servers/785870616372183111/vote>')
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL()));

    return true;
  }
};
