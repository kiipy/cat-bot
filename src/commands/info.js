import { MessageEmbed } from 'discord.js';
import moment from 'moment';

export default {
  name: 'info',
  description: 'Gives info about Cat Bot.',
  async execute(message) {
    const client = message.client;

    const servers = (await client.shard.fetchClientValues('guilds.cache.size').catch(console.error)).reduce((a, b) => a + b, 0);
    const users = (await client.shard.fetchClientValues('users.cache.size').catch(console.error)).reduce((a, b) => a + b, 0);
    const shards = client.shard.count;
    const since = message.guild.member(client.user).joinedAt;

    message.channel.send(new MessageEmbed()
      .setColor('#246c54')
      .setTitle('Info')
      .addField('Servers:', `${servers} server${servers === 1 ? '' : 's'}.`)
      .addField('Users:', `${users} user${users === 1 ? '' : 's'}.`)
      .addField('Shard count:', `${shards} shard${shards === 1 ? '' : 's'}.`)
      .addField('Active here since:', `${moment(since).format('MMMM Do YYYY')}.`)
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL())
    );

    return true;
  }
};
