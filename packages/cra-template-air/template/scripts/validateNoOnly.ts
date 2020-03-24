import glob from 'glob';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

const onlyPattern = /(?:describe\.only|it\.only|test\.only)/gm;
const files = glob
  .sync('**/*.test.?(j|t)s?(x)', { cwd: path.join(__dirname, '../src/__tests__') })
  .map((file) => path.join(__dirname, '../src/__tests__', file));

let shouldError = false;
const badFiles: string[] = [];
const badPatterns: string[] = [];

for (const file of files) {
  const fileContent = fs.readFileSync(file, { encoding: 'utf8' });
  const fileHasPattern = fileContent.match(onlyPattern);

  if (fileHasPattern && fileHasPattern.length) {
    shouldError = true;
    for (const pattern of fileHasPattern) {
      badFiles.push(file);
      badPatterns.push(pattern);
    }
  }
}

if (shouldError) {
  // eslint-disable-next-line no-console
  console.error(
    [
      `${chalk.red('\nLooks like you left focused tests, I found these hits:')}`,
      `${badPatterns
        .map(
          (pattern, index) =>
            `- ${chalk.cyan(pattern)} \t${pattern.includes('describe') ? '' : '\t'}  in \t ${badFiles[index]}`
        )
        .join('\n')}`,
      `${chalk.cyan('Please remove all the focused tests!\n')}`
    ].join('\n')
  );
  process.exit(1);
}

process.exit(0);
