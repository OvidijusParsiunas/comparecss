import { Subcomponent } from '../../../../../../../interfaces/workshopComponent';
import SharedUtils from '../sharedUtils';

export class UpdateRange {

  private static updateColorValueInCustomFeatureProperties(rangeValue: string, spec: any, subcomponent: Subcomponent): void {
    const keys = spec.colorValueCustomFeatureObjectKeys;
    const colorValue = SharedUtils.getCustomFeatureValue(keys, subcomponent[keys[0]]) as string;
    const alphaHexStringValue = SharedUtils.convertAlphaDecimalToHexString(rangeValue as unknown as number / spec.smoothingDivisible);
    const newColorvalue = `${colorValue.substring(0, colorValue.length - alphaHexStringValue.length)}${alphaHexStringValue}`;
    SharedUtils.setCustomFeatureValue(keys, subcomponent, newColorvalue);
  }

  protected static updateRangeCustomFeature(rangeValue: string, spec: any, subcomponent: Subcomponent, lastSelectedValueObjectKeys?: string[]): void {
    const { smoothingDivisible, postfix, customFeatureObjectKeys } = spec;
    const newRangeValue = `${rangeValue as unknown as number / smoothingDivisible}${postfix}`;
    SharedUtils.setCustomFeatureValue(lastSelectedValueObjectKeys || customFeatureObjectKeys, subcomponent, newRangeValue);
    if (spec.colorValueCustomFeatureObjectKeys) {
      UpdateRange.updateColorValueInCustomFeatureProperties(rangeValue, spec, subcomponent);
    }
  }

  protected static parseString(value: string, smoothingDivisible: number): number {
    return Number.parseFloat(value) * smoothingDivisible;
  }

  protected static updateCustomCss(rangeValue: string, spec: any, subcomponent: Subcomponent): number {
    const { cssProperty, smoothingDivisible, postfix } = spec;
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    const realRangeValue = Math.round(rangeValue as unknown as number / smoothingDivisible);
    customCss[activeCssPseudoClassesDropdownItem][cssProperty] = `${realRangeValue}${postfix}`;
    return realRangeValue;
  }

  public static getCustomFeatureStringRangeValue(customFeatureObjectKeys: string[], subcomponent: Subcomponent): string {
    return SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponent[customFeatureObjectKeys[0]]) as string;
  }

  public static getCustomFeatureRangeNumberValue(spec: any, subcomponent: Subcomponent): number {
    const { customFeatureObjectKeys, smoothingDivisible } = spec;
    const customFeatureValue = UpdateRange.getCustomFeatureStringRangeValue(customFeatureObjectKeys, subcomponent);
    return UpdateRange.parseString(customFeatureValue as string, smoothingDivisible);
  }
}
