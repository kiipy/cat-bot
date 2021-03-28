import { createWriteStream, existsSync, mkdirSync, readFile, readFileSync, unlink, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import moment from 'moment';
import shards from './shards.js';

const time = Date.now();

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

global.config = JSON.parse(readFileSync(join(__dirname, '../config.json')));

const writeStream = createWriteStream('latest.log');

const stdoutWrite = process.stdout.write;
const stderrWrite = process.stderr.write;

process.stdout.write = function () {
  writeStream.write.apply(writeStream, arguments);

  stdoutWrite.apply(process.stdout, arguments);

  return true;
};

process.stderr.write = function () {
  writeStream.write.apply(writeStream, arguments);

  stderrWrite.apply(process.stderr, arguments);

  return true;
};

['exit', 'uncaughtException', 'SIGINT', 'SIGHUP'].forEach(event => {
  process.on(event, error => {
    if (error) console.error(error);
    
    if (existsSync('latest.log')) {
      if (!existsSync('logs')) mkdirSync('logs');

      readFile('latest.log', (error, data) => {
        if (error) console.error(error);
        else writeFileSync(`logs/${moment().format('DD-MMM-YYYY-HH-mm-ss')}.log`, data);
      });

      unlink('latest.log', () => process.exit());
    } else process.exit();
  });
});

shards()
  .then(() => console.log(chalk.green(`Done! Cat Bot started in ${Date.now() - time}ms.`)))
  .catch(console.error);
