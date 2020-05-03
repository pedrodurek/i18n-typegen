import { writeFileSync, readFileSync, statSync } from 'fs';

export const writeSync = (filepath: string, content: string) =>
  writeFileSync(filepath, content);

export const readSync = (filepath: string) => readFileSync(filepath, 'utf-8');

export const fileExists = (filePath: string) => {
  try {
    return statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
};
