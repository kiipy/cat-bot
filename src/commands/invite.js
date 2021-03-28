import { MessageEmbed } from 'discord.js';

export default {
  name: 'invite',
  description: 'Invite Cat Bot to your server or join our support server.',
  execute(message) {
    message.channel.send(new MessageEmbed()
      .setColor('#246c54')
      .setTitle('Invite')
      .addField('Bot Invite Link', '<https://discord.com/api/oauth2/authorize?client_id=734129942526165032&permissions=0&scope=bot>')
      .addField('Server Invite Link:', '<https://discord.gg/sbebxpDPSM>')
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL())
    );

    return true;
  }
};
