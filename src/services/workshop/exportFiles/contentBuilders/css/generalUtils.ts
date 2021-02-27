import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';

export default class GeneralUtils {

  private static camelToKebabCase(propertyString: string): string {
    return propertyString.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
  }

  public static buildCssString(cssModeProperties: WorkshopComponentCss): string {
    return Object.keys(cssModeProperties).map((key) => `  ${this.camelToKebabCase(key)}: ${cssModeProperties[key]};`).join('\r\n');
  }

  public static areArraysEqual(arrayA: unknown[], arrayB: unknown[]): boolean {
    if (arrayA === arrayB) return true;
    if (arrayA == null || arrayB == null) return false;
    if (arrayA.length !== arrayB.length) return false;
    for (let i = 0; i < arrayA.length; i += 1) {
      if (arrayA[i] !== arrayB[i]) return false;
    }
    return true;
  }
}
