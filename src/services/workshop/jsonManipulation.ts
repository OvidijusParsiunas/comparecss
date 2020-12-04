export default class JSONManipulation {

  static deepCopy<T>(object: Exclude<T, string>): T {
    return JSON.parse(JSON.stringify(object));
  }
}
