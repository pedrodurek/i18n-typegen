import YAML from 'yamljs';
import { resolve } from 'path';
import { Resource } from './types';
import GenerateKeys from './generateKeys';
import { generateTemplate } from './generateTypes';

const generateOutput = (obj: Resource) => {
  if (typeof obj !== 'string' && !Array.isArray(obj)) {
    const [lng] = Object.keys(obj);
    const result = Object.entries(obj[lng]).map(([key, value]) => {
      return new GenerateKeys(key, value);
    });
    return generateTemplate(result);
  }
  // throw error - invalid format
  return null;
};

export const writeTypes = async (configPath: string) => {
  const path = resolve(process.cwd(), configPath);
  const config = YAML.load(path);
  const url = resolve(process.cwd(), config.resources);
  const result = await import(url);
  generateOutput(result.default);
};
