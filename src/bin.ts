import inquirer from 'inquirer';
// import path from 'path';
// import { generateOutput } from './generate/generateTypes';
import { getQuestion } from './questions';
import { addScriptToPackageFile, generateConfig } from './init';

const cmd = process.argv[2];

const setup = () => {
  inquirer.prompt(getQuestion()).then(({ script, config, ...rest }) => {
    // const test = YAML.stringify(answer);
    addScriptToPackageFile(script, config);
    generateConfig(config, rest);
    // const url = path.resolve(__dirname, answer.resources);
    // import(url).then((result) => generateOutput(result.default));
  });
};

switch (cmd) {
  case 'init':
    setup();
    break;
  case 'generate':
    break;
  default:
    console.log('Invalid argument');
}
