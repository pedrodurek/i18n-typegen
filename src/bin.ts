import inquirer from 'inquirer';
import { getQuestion } from './questions';
import { addScriptToPackageFile, generateConfig } from './init';
import meow from 'meow';
import { writeTypes } from './generate';

const cli = meow(
  `
	Usage
	  $ i18n-typegen <action>

	Options
	  --config, -c  Path name of the YAML config file

	Examples
	  $ i18n-typegen generate --config i18ngen.yml
`,
  {
    flags: {
      config: {
        type: 'string',
        alias: 'c',
        default: 'i18ngen.yml',
      },
    },
  },
);

const [cmd] = cli.input;

switch (cmd) {
  case 'init':
    inquirer.prompt(getQuestion()).then(({ script, config, ...rest }) => {
      addScriptToPackageFile(script, config);
      generateConfig(config, rest);
    });
    break;
  case 'generate':
  case undefined:
    writeTypes(cli.flags.config);
    break;
  default:
    console.log('Invalid argument');
}
