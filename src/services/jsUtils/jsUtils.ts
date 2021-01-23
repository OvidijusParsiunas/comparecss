export default class JsUtils {

  public static getKeyByValue(object: unknown, value: unknown): string {
    return Object.keys(object).find(key => object[key] === value);
  }
}
