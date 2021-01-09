export default class PartialCssCustomSettingsUtils {
  
  public static generateCustomPartialCssPropertyName(cssPropertyName: string, partialCssPosition: number): string {
    return cssPropertyName + partialCssPosition;
  }
}
