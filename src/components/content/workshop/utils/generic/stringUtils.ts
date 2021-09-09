export class StringUtils {

  private static splitStringIntoWords(string: string): string[] {
    return string.trim().split(/\s+/);
  }

  public static getFirstWordInString(string: string): string {
    return StringUtils.splitStringIntoWords(string)[0];
  }
}
