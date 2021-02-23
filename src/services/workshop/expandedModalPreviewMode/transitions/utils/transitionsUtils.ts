export default class TransitionsUtils {

  public static secondsStringToMillisecondsNumber(seconds: string): number {
    return Number.parseFloat(seconds) * 1000;
  }
}
