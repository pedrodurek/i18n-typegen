import inquirer from 'inquirer';
import path from 'path';
import GenerateKeys from './generate/generateKeys';
import { generateTemplate } from './generate/generateTypes';

const cmd = process.argv[2];

type Resource =
  | string
  | string[]
  | {
      [key: string]: Resource;
    };

const convert = (obj: Resource) => {
  if (typeof obj !== 'string' && !Array.isArray(obj)) {
    const [lng] = Object.keys(obj);
    const result = Object.entries(obj[lng]).map(
      ([key, value]) => new GenerateKeys(key, value),
    );
    console.log(generateTemplate(result));
  }
};

const setup = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'resources',
        message: 'Where is your resources file?:',
        default: 'i18n/resources.js',
        // default: "src/i18n/resources.ts",
        validate: (str: string) => str.length > 0,
      },
      {
        type: 'input',
        name: 'output',
        message: 'Where to write the output?:',
        default: 'src/i18n/types.ts',
        validate: (str: string) => str.length > 0,
      },
    ])
    .then((answer) => {
      const url = path.resolve(__dirname, answer.resources);
      import(url).then((result) => convert(result.default));
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
