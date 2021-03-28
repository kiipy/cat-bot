import utils from '../utils.js';

const categories = ['fun', 'reactions'];

export default {
  name: 'togglecategory',
  description: 'Toggles one of the categories. This will enable or disable the functions that belong to the category.',
  usage: `<${categories.join('/')}>`,
  permission: 'ADMINISTRATOR',
  async execute(message, args) {
    const category = args[0];

    if (!categories.some((module1) => category === module1)) {
      message.channel.send(`That category doesn't exist! The available categories are: ${categories.join(', ')}`);

      return;
    }

    const guildData = await utils.getGuild(message.guild.id);

    var newGuildData = guildData;

    if (newGuildData.disabledCategories) {
      if (newGuildData.disabledCategories.includes(category)) newGuildData.disabledCategories = newGuildData.disabledCategories.filter((item) => item !== category);
      else newGuildData.disabledCategories.push(category);
    } else newGuildData.disabledCategories = [category];

    message.channel.send(`Category ${category} has been ${newGuildData.disabledCategories.includes(category) ? 'disabled' : 'enabled'}.`);

    await utils.setGuild(message.guild.id, newGuildData);

    return true;
  }
};
