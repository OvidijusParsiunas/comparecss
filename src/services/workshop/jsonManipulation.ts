export default class JSONManipulation {

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

  static deepCopy<T>(object: Exclude<T, string>): T  {
    return this.createNewObject(object) as T;
  }
}
