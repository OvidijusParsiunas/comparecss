import { CustomFeaturesUtils } from '../../../../utils/componentManipulation/utils/customFeaturesUtils';
import { BORDER_WIDTH_CSS_PROPERTY_ALIAS } from '../../../../../../../consts/borderWidthAlias';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { Subcomponent } from '../../../../../../../interfaces/workshopComponent';
import SharedUtils from '../sharedUtils';

export class UpdateRange {

  private static updateColorValueInCustomFeatureProperties(rangeValue: string, spec: any, subcomponent: Subcomponent): void {
    const keys = spec.colorValueCustomFeatureObjectKeys;
    const colorValue = CustomFeaturesUtils.getCustomFeatureValue(keys, subcomponent[keys[0]]) as string;
    const alphaHexStringValue = SharedUtils.convertAlphaDecimalToHexString(rangeValue as unknown as number / spec.smoothingDivisible);
    const newColorvalue = `${colorValue.substring(0, colorValue.length - alphaHexStringValue.length)}${alphaHexStringValue}`;
    CustomFeaturesUtils.setCustomFeatureValue(keys, subcomponent, newColorvalue);
  }

  protected static updateRangeCustomFeature(rangeValue: string, spec: any, subcomponent: Subcomponent, lastSelectedValueObjectKeys?: string[]): void {
    const { smoothingDivisible, postfix, customFeatureObjectKeys } = spec;
    const newRangeValue = `${rangeValue as unknown as number / smoothingDivisible}${postfix}`;
    CustomFeaturesUtils.setCustomFeatureValue(lastSelectedValueObjectKeys || customFeatureObjectKeys, subcomponent, newRangeValue);
    if (spec.colorValueCustomFeatureObjectKeys) {
      UpdateRange.updateColorValueInCustomFeatureProperties(rangeValue, spec, subcomponent);
    }
  }

  protected static parseString(value: string, smoothingDivisible: number): number {
    return Number.parseFloat(value) * smoothingDivisible;
  }

  protected static updateOtherBorderProperties(subcomponent: Subcomponent, rangeValue?: string): void {
    const newRangeValue = rangeValue || subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT][BORDER_WIDTH_CSS_PROPERTY_ALIAS];
    const { [CSS_PSEUDO_CLASSES.DEFAULT]: defaultCss } = subcomponent.customCss;
    defaultCss.borderTopWidth = newRangeValue;
    defaultCss.borderRightWidth = newRangeValue;
    defaultCss.borderBottomWidth = newRangeValue;
  }

  protected static updateCustomCss(rangeValue: string, spec: any, subcomponent: Subcomponent): number {
    const { cssProperty, smoothingDivisible, postfix } = spec;
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    const realRangeValue = Math.round(rangeValue as unknown as number / smoothingDivisible);
    const realRangeValueStr = `${realRangeValue}${postfix}`;
    customCss[activeCssPseudoClassesDropdownItem][cssProperty] = realRangeValueStr;
    if (cssProperty === BORDER_WIDTH_CSS_PROPERTY_ALIAS) UpdateRange.updateOtherBorderProperties(subcomponent, realRangeValueStr);
    return realRangeValue;
  }

  public static getCustomFeatureStringRangeValue(customFeatureObjectKeys: string[], subcomponent: Subcomponent): string {
    return CustomFeaturesUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponent[customFeatureObjectKeys[0]]) as string;
  }

  public static getCustomFeatureRangeNumberValue(spec: any, subcomponent: Subcomponent): number {
    const { customFeatureObjectKeys, smoothingDivisible } = spec;
    const customFeatureValue = UpdateRange.getCustomFeatureStringRangeValue(customFeatureObjectKeys, subcomponent);
    return UpdateRange.parseString(customFeatureValue as string, smoothingDivisible);
  }
}
