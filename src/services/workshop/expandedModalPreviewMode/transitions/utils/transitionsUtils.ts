export default class TransitionsUtils {

  public static secondsStringToMillisecondsNumber(seconds: string): number {
    return parseFloat(seconds) * 1000;
  }
}
