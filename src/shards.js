import { ShardingManager } from 'discord.js';
import chalk from 'chalk';
import topggautoposter from 'topgg-autoposter';

const init = async () => {
  const { productionToken, betaToken, topggToken, mode } = global.config;

  const manager = new ShardingManager('src/client.js', { 
    token: mode === 'production' ? productionToken : mode === 'beta' ? betaToken : 'ERROR', 
    mode: 'worker'
  });

  if (mode === 'production') topggautoposter(topggToken, manager);

  manager.spawn();

  manager.on('shardCreate', (shard) => console.log(chalk.green(`Shard #${shard.id + 1} launched!`)));
}

export default init;
