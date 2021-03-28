import utils from '../src/utils.js';

const whoAskedTriggers = ['didntask', 'didnotask', 'didiask', 'whoask', 'dontrememberask'];
const idkTriggers = ['idk', 'idontknow'];

const init = (client) => {
  client.on('message', async (message) => {
    if (message.author.bot) return;

    const guildData = await utils.getGuild(message.guild.id);

    const newMessage = message.content.toLowerCase().replace(/'/g, '').replace(/ +/g, '');

    if (guildData.disabledCategories) if (guildData.disabledCategories.includes('reactions')) return;

    if (guildData.blacklist) if (guildData.blacklist.includes(message.channel.id)) return;

    if (message.content === '🤡') {
      message.channel.send('https://youtu.be/LT8OZPlJfGE');

      return;
    }

    if (newMessage.includes('catareyouok') || newMessage.includes('catyouok') || newMessage.includes('youokcat') || newMessage.includes('youokaycat')) {
      if (Math.random() > 0.99) message.channel.send('im totally fine, only the server room is on fire, thats all! :blush:');
      else if (Math.random() > 0.9) message.channel.send('im not an actual bot and being kept in a basement by my owner send help');
      else message.channel.send('im doing fine thanks for asking');

      return;
    }

    if (!guildData.childfriendly) whoAskedTriggers.every((trigger) => {
      if (newMessage.includes(trigger)) {
        message.channel.send({ files: ['https://media.discordapp.net/attachments/667108351381078030/734813157260001423/image0.jpg'] });

        return false;
      }

      return true;
    });

    idkTriggers.every((trigger) => {
      if (newMessage.includes(trigger)) {
        message.channel.send({ files: ['https://i.imgur.com/sitoEzI.png'] });

        return false;
      }

      return true;
    });

    if (message.content.toLowerCase().includes('perhaps')) {
      message.channel.send({ files: ['https://i.kym-cdn.com/photos/images/facebook/001/462/400/978.jpg'] });

      return;
    }

    if (message.content.toLowerCase().includes('lol')) {
      message.channel.send('lol thats so funny xd');

      return;
    }

    if (message.content.toLowerCase() === 'pls snipe' || message.content.toLowerCase() === 'pls editsnipe') {
      message.channel.send('sniper detected, quickly, hide!');

      return;
    }

    if (message.content.toLowerCase().includes('no u')) {
      message.channel.send('no u');

      return;
    }

    if (newMessage.includes('combatlog')) {
      message.channel.send('ocla tabygo*');

      return;
    }

    if (newMessage.includes('smh')) {
      if (!message.content.toLowerCase().includes('smh my head')) {
        message.channel.send('smh my head*');

        return;
      }
    }

    if (!guildData.childfriendly) if (newMessage.includes('gay')) {
      message.channel.send('gae*');

      return;
    }

    if (message.content.toLowerCase().includes('cat') && (message.content.toLowerCase().includes('is') && !(message.content.toLowerCase().includes('not') || message.content.toLowerCase().includes('nt') || message.content.toLowerCase().includes('n\'t'))) && (message.content.toLowerCase().includes('bad') || message.content.toLowerCase().includes('gae') || message.content.toLowerCase().includes('annoying'))) {
      message.channel.send('you can say what you want but you are the one getting mad at a bot thinking that it will change something lol');

      return;
    }

    if (newMessage.includes('shut')) {
      message.channel.send('no nerd');

      return;
    }
  });
};

export default init;
