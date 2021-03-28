import fetch from 'node-fetch';

var selfies = [];

const generateSelfies = async () => {
  return fetch('https://www.reddit.com/r/catselfies.json?limit=100&sort=random&t=all')
    .then((response) => response.json())
    .then((json) => json.data.children.map(value => value.data.url))
    .then((freshSelfies) => selfies = freshSelfies.filter((url) => !url.includes('gallery')))
    .catch(console.error);
};

generateSelfies();

export default {
  name: 'selfie',
  description: 'Gives you a cat selfie.',
  category: 'fun',
  async execute(message) {
    if (selfies.length === 0) await generateSelfies();

    const selfieIndex = selfies.length * Math.random() | 0;

    const selfie = selfies[selfieIndex];

    selfies.splice(selfieIndex, 1);

    message.channel.send(selfie);

    return true;
  }
};
