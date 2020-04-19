import { Resource } from './types';

class GenerateKeys {
  #ns: string;
  #keys: string[]

  constructor(ns: string, obj: Resource) {
    this.#ns = ns;
    this.#keys = [];
    this.generateUnionKeys(obj, '')
  }

  private isEmptyOrPrimitive(input: Resource) {
    if (Array.isArray(input)) {
      return input.length === 0;
    }

    if (typeof input === 'object') {
      return Object.keys(input).length === 0;
    }

    return true;
  }

  private generateUnionKeys(obj: Resource, result: string) {
    Object.entries(obj).forEach(([key, value]) => {
      const newResult = result.length === 0 ? key : `${result}.${key}`;
      if (this.isEmptyOrPrimitive(value)) {
        this.#keys.push(newResult);
        return;
      }
      this.generateUnionKeys(value, newResult);
    });
  }

  public getNamespace() {
    return this.#ns;
  }

  public getTypedValue() {
    const result = this.#keys.join(`' | '`);
    return `'${result}'`;
  }

  public getTypedKeys() {
    const result = this.#keys.join(`' | '`);
    return `${this.#ns}: '${result}'`;
  }

  public getTypedArrayKeys() {
    const result = this.#keys.join(`' | '${this.#ns}:`);
    return `${this.#ns}: '${this.#ns}:${result}'`;
  }

}

export default GenerateKeys;