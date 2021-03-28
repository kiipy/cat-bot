import { MessageEmbed } from 'discord.js';

const categories = ['fun', 'reactions'];

export default {
  name: 'categories',
  description: 'Lists all categories.',
  async execute(message) {
    message.channel.send(new MessageEmbed()
      .setColor('#246c54')
      .setTitle('Categories')
      .setDescription(categories
        .map(category => `- ${category}`)
        .join('\n'))
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL())
    );

    return true;
  }
};
