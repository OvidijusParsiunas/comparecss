import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import SharedUtils from '../sharedUtils';

export class UpdateRange {

  private static updateColorValueInCustomFeatureProperties(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const keys = spec.colorValueCustomFeatureObjectKeys;
    const colorValue = SharedUtils.getCustomFeatureValue(keys, subcomponentProperties[keys[0]]) as string;
    const alphaHexStringValue = SharedUtils.convertAlphaDecimalToHexString(rangeValue as unknown as number / spec.smoothingDivisible);
    const newColorvalue = `${colorValue.substring(0, colorValue.length - alphaHexStringValue.length)}${alphaHexStringValue}`;
    SharedUtils.setCustomFeatureValue(keys, subcomponentProperties, newColorvalue);
  }

  protected static updateRangeCustomFeature(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties, lastSelectedValueObjectKeys?: string[]): void {
    const { smoothingDivisible, postfix, customFeatureObjectKeys } = spec;
    const newRangeValue = `${rangeValue as unknown as number / smoothingDivisible}${postfix}`;
    SharedUtils.setCustomFeatureValue(lastSelectedValueObjectKeys || customFeatureObjectKeys, subcomponentProperties, newRangeValue);
    if (spec.colorValueCustomFeatureObjectKeys) {
      UpdateRange.updateColorValueInCustomFeatureProperties(rangeValue, spec, subcomponentProperties);
    }
  }

  protected static parseString(value: string, smoothingDivisible: number): number {
    return Number.parseFloat(value) * smoothingDivisible;
  }

  protected static updateCustomCss(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): number {
    const { cssProperty, smoothingDivisible, postfix } = spec;
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const realRangeValue = Math.round(rangeValue as unknown as number / smoothingDivisible);
    customCss[activeCssPseudoClass][cssProperty] = `${realRangeValue}${postfix}`;
    return realRangeValue;
  }

  public static getCustomFeatureStringRangeValue(customFeatureObjectKeys: string[], subcomponentProperties: SubcomponentProperties): string {
    return SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties[customFeatureObjectKeys[0]]) as string;
  }

  public static getCustomFeatureRangeNumberValue(spec: any, subcomponentProperties: SubcomponentProperties): number {
    const { customFeatureObjectKeys, smoothingDivisible } = spec;
    const customFeatureValue = UpdateRange.getCustomFeatureStringRangeValue(customFeatureObjectKeys, subcomponentProperties);
    return UpdateRange.parseString(customFeatureValue as string, smoothingDivisible);
  }
}
