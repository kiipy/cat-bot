import utils from '../utils.js';

export default {
  name: 'prefix',
  description: 'Sets the prefix of the bot.',
  usage: '<prefix>',
  permission: 'ADMINISTRATOR',
  async execute(message, args) {
    const guildData = await utils.getGuild(message.guild.id);
    
    message.channel.send('Prefix updated.');

    var newGuildData = guildData;

    newGuildData.prefix = args.join(' ');

    await utils.setGuild(message.guild.id, newGuildData);

    return true;
  }
};
