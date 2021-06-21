export class JsUtils {

  public static getKeyByValue(object: unknown, value: unknown): string {
    return Object.keys(object).find(key => object[key] === value);
  }

  public static addObjects<T>(object1Parent: T, object1Key: keyof T, object2: T[keyof T], toTheRight = true): void {
    if (toTheRight) {
      object1Parent[object1Key] = { ...object1Parent[object1Key], ...object2 };
    } else {
      object1Parent[object1Key] = { ...object2, ...object1Parent[object1Key] };
    }
  }
}
