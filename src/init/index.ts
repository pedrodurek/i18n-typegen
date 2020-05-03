import { resolve } from 'path';
import { readSync, writeSync } from '../utils/file-system';
import detectIndent from 'detect-indent';
import YAML from 'yamljs';

export const addScriptToPackageFile = (
  scriptName: string,
  configName: string,
) => {
  const path = resolve(process.cwd(), 'package2.json');
  // const path = resolve(process.cwd(), 'package.json');
  const content = readSync(path);
  const { indent } = detectIndent(content);

  const result = JSON.parse(content);
  if (!result.scripts) {
    result.scripts = {};
  }

  result.scripts[scriptName] = `i18n-typegen --config ${configName}`;
  writeSync(path, JSON.stringify(result, null, indent));
};

type Config = {
  resources: string;
  output: string;
};

export const generateConfig = (configPath: string, config: Config) => {
  const path = resolve(process.cwd(), configPath);
  writeSync(path, YAML.stringify(config));
};
