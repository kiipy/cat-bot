import utils from '../utils.js';

export default {
  name: 'blacklist',
  description: 'Toggles the blacklist for this channel. When a channel is blacklisted, Cat Bot will not react to messages sent there (it still reacts to commands, though).',
  permission: 'ADMINISTRATOR',
  async execute(message) {
    const guildData = await utils.getGuild(message.guild.id);

    var newGuildData = guildData;

    if (newGuildData.blacklist) {
      if (newGuildData.blacklist.includes(message.channel.id)) newGuildData.blacklist = newGuildData.blacklist.filter((item) => item !== message.channel.id);
      else newGuildData.blacklist.push(message.channel.id);
    } else newGuildData.blacklist = [message.channel.id];

    message.channel.send(`Channel <#${message.channel.id}> is now ${newGuildData.blacklist.includes(message.channel.id) ? '' : 'un'}blacklisted.`);

    await utils.setGuild(message.guild.id, newGuildData);

    return true;
  }
};
