import GenerateKeys from './generateKeys';

const normalizeContext = (context: GenerateKeys[], isArrayKeys: boolean) =>
  context.reduce(
    (acc, value) =>
      `${acc}\n  ${
        isArrayKeys ? value.getTypedArrayKeys() : value.getTypedKeys()
      };`,
    '',
  );

const renderType = (typeName: string, typeValue: string, isObj = true) =>
  isObj
    ? `\ntype ${typeName} = {${typeValue}\n};\n`
    : `\ntype ${typeName} = ${typeValue};\n`;

const getKeysContext = (context: GenerateKeys[]) => {
  const keys = normalizeContext(context, false);
  const arrayKeys = normalizeContext(context, true);
  const translationKey = context
    .find((value) => value.getNamespace() === 'translation')
    ?.getTypedValue();
  return (
    renderType('Keys', keys) +
    renderType('ArrayKeys', arrayKeys) +
    renderType('TranslationKey', translationKey, false)
  );
};

export const generateTemplate = (context: GenerateKeys[]) => `
import { UseTranslationOptions } from "react-i18next";
import { i18n } from "i18next";

declare module "react-i18next" {
  ${getKeysContext(context)}
  type DefaultNamespace = keyof Keys;

  // Array Helpers
  type Values<T extends object> = T[keyof T];
  type ArrayToUnion<T extends DefaultNamespace[]> = T[number];
  type ArrayValues<T extends DefaultNamespace[]> = Values<
    Pick<ArrayKeys, ArrayToUnion<T>>
  >;

  type TFunctionParams = DefaultNamespace | DefaultNamespace[] | undefined;

  type NamespaceValues<T extends TFunctionParams> = T extends DefaultNamespace[]
    ? ArrayValues<T>
    : T extends DefaultNamespace
    ? Keys[T]
    : TranslationKey;

  type DefaultTFunction<T extends TFunctionParams> = (
    key: NamespaceValues<T>
  ) => string;

  type DefaultUseTranslationResponse<T extends TFunctionParams> = [
    DefaultTFunction<T>,
    i18n,
    boolean
  ] & {
    t: DefaultTFunction<T>;
    i18n: i18n;
    ready: boolean;
  };

  function useTranslation<T extends TFunctionParams = undefined>(
    ns?: T,
    options?: UseTranslationOptions
  ): DefaultUseTranslationResponse<T>;
}
`;
