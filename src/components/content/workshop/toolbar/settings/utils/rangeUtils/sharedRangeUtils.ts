import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import SharedUtils from '../sharedUtils';

export class SharedRangeUtils {

  private static updateColorValueInCustomFeatureProperties(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const keys = spec.colorValueCustomFeatureObjectKeys;
    const colorValue = SharedUtils.getCustomFeatureValue(keys, subcomponentProperties[keys[0]]) as string;
    const alphaHexStringValue = SharedUtils.convertAlphaDecimalToHexString(rangeValue as unknown as number / spec.smoothingDivisible);
    const newColorvalue = `${colorValue.substring(0, colorValue.length - alphaHexStringValue.length)}${alphaHexStringValue}`;
    SharedUtils.setCustomFeatureValue(keys, subcomponentProperties, newColorvalue);
  }

  public static updateRangeCustomFeature(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties, lastSelectedValueObjectKeys?: string[]): void {
    const { smoothingDivisible, postfix, customFeatureObjectKeys } = spec;
    const newRangeValue = `${rangeValue as unknown as number / smoothingDivisible}${postfix}`;
    SharedUtils.setCustomFeatureValue(lastSelectedValueObjectKeys || customFeatureObjectKeys, subcomponentProperties, newRangeValue);
    if (spec.colorValueCustomFeatureObjectKeys) {
      SharedRangeUtils.updateColorValueInCustomFeatureProperties(rangeValue, spec, subcomponentProperties);
    }
  }
  
  public static parseString(value: string, smoothingDivisible: number): number {
    return Number.parseFloat(value) * smoothingDivisible;
  }

  public static getCustomFeatureRangeNumberValue(spec: any, subcomponentProperties: SubcomponentProperties): number {
    const { customFeatureObjectKeys, smoothingDivisible } = spec;
    const customFeatureValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties[customFeatureObjectKeys[0]]);
    return SharedRangeUtils.parseString(customFeatureValue as string, smoothingDivisible);
  }

  public static updateCustomCss(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): number {
    const { cssProperty, smoothingDivisible, postfix } = spec;
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const realRangeValue = Math.round(rangeValue as unknown as number / smoothingDivisible);
    customCss[activeCssPseudoClass][cssProperty] = `${realRangeValue}${postfix}`;
    return realRangeValue;
  }
}
