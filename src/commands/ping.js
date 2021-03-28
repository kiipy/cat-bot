import { MessageEmbed } from 'discord.js';

export default {
  name: 'ping',
  description: 'Gets the current ping of Cat Bot.',
  execute(message) {
    const client = message.client;

    message.channel.send('Pong!').then((pingMessage) => pingMessage.edit(null, new MessageEmbed()
      .setColor('#246c54')
      .setTitle('Ping')
      .addField('Latency:', `${pingMessage.createdTimestamp - message.createdTimestamp} milliseconds.`)
      .addField('API Latency:', `${Math.round(client.ws.ping)} milliseconds.`)
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL())
    ));

    return true;
  }
};
