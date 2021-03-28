import storage from 'node-persist';

var prefix;

storage.init();

const utils = {
  init: () => prefix = global.config.prefix,
  getGuild: async (guildId) => {
    const guildData = await storage.getItem(guildId);

    if (guildData) return guildData;
    else return { prefix: prefix, blacklist: [], disabledCategories: [] };
  },
  setGuild: async (guildId, guildData) => await storage.setItem(guildId, guildData),
};

export default utils;
