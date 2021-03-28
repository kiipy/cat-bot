import utils from '../utils.js';

export default {
  name: 'childfriendly',
  description: 'Toggles the child friendly mode for this server. Swearing is minimalised when this mode is enabled.',
  permission: 'ADMINISTRATOR',
  async execute(message) {
    const guildData = await utils.getGuild(message.guild.id);

    var newGuildData = guildData;

    if (newGuildData.childfriendly) newGuildData.childfriendly = false;
    else newGuildData.childfriendly = true;

    message.channel.send(`The server is ${newGuildData.childfriendly ? 'now in' : 'no longer in'} child friendly mode.`);

    await utils.setGuild(message.guild.id, newGuildData);

    return true;
  }
};
