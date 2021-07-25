export class StringUtils {

  private static splitStringIntoWords(subjectString: string): string[] {
    return subjectString.trim().split(/\s+/);
  }

  public static getFirstWordInString(subjectString: string): string {
    return StringUtils.splitStringIntoWords(subjectString)[0];
  }
}
