export default class JSONUtils {

  private static createNewObject(object: unknown): unknown {
    if (null == object || "object" != typeof object) {
      return object;
    }
    if (object instanceof Date) {
      const copy = new Date();
      copy.setTime(object.getTime());
      return copy;
    }
    if (object instanceof Array) {
      const copy = [];
      for (let i = 0, len = object.length; i < len; i++) {
        copy[i] = this.deepCopy(object[i]);
      }
      return copy;
    }
    if (object instanceof Set) {
      return new Set([...object]);
    }
    if (object instanceof Object) {
      const copy = {};
      for (const attr in object) {
        if (object.hasOwnProperty(attr)) copy[attr] = this.deepCopy(object[attr]);
      }
      return copy;
    }
    throw new Error("Unable to copy object! Its type isn't supported.");
  }

  public static deepCopy<T>(object: Exclude<T, string>): T  {
    return this.createNewObject(object) as T;
  }

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

  public static reverseMap(map: any): any {
    return Object.keys(map).reduce((accumulator, currentValue) =>
      Object.assign(accumulator, { [map[currentValue]]: currentValue }), {});
  }
}
