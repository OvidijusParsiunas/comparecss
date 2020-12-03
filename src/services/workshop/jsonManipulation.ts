export default class JSONManipulation {

  static deepCopy<T>(object: T): T {
    return JSON.parse(JSON.stringify(object));
  }  
}
