import fetch from 'node-fetch';

var memes = [];

const generateMemes = async () => {
  return fetch('https://www.reddit.com/r/catmemes.json?limit=100&sort=random&t=all')
    .then((response) => response.json())
    .then((json) => json.data.children.map(value => value.data.url))
    .then((freshMemes) => memes = freshMemes.filter((url) => !url.includes('gallery')))
    .catch(console.error);
};

generateMemes();

export default {
	name: 'meme',
	description: 'Gives you a cat meme.',
  category: 'fun',
  async execute(message) {
    if (memes.length === 0) await generateMemes();

    const memeIndex = memes.length * Math.random() | 0;

    const meme = memes[memeIndex];

    memes.splice(memeIndex, 1);

    message.channel.send(meme);

    return true;
  }
};
