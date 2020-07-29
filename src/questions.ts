export const getQuestion = () => [
  {
    type: 'input',
    name: 'resources' as const,
    message: 'Where is your resources file?',
    default: 'src/i18n/resources.ts',
    validate: (str: string) => str.length > 0,
  },
  {
    type: 'input',
    name: 'output' as const,
    message: 'Where to write the output?',
    default: 'src/i18n/types.ts',
    validate: (str: string) => str.length > 0,
  },
  {
    type: 'input',
    name: 'config' as const,
    message: 'How to name the config file?',
    default: 'i18ngen.yml',
    validate: (str: string) =>
      str.length > 0 && str.toLocaleLowerCase().endsWith('.yml'),
  },
  {
    type: 'input',
    name: 'script' as const,
    message: 'What script in package.json should run the i18ngen?',
    validate: (str: string) => str.length > 0,
  },
];
