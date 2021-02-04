export default class SubcomponentSpecificSettingsUtils {
  
  public static generatePartialCssPropertyName(cssPropertyName: string, partialCssPosition: number): string {
    return cssPropertyName + partialCssPosition;
  }
}
