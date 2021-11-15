import { CustomCss, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import ComponentPreviewUtils from '../../../componentPreview/utils/componentPreviewUtils';
import { CSS_PROPERTY_VALUES } from '../../../../../../consts/cssPropertyValues.enum';
import SharedUtils from './sharedUtils';

// DOC: 7879
// the use of the auxiliary functionality and unset properties is mostly due to the fact that in firefox
// it has been identified that shadow values of 0px 0px 0px 0px still displays a partial shadow
export default class BoxShadowUtils {

  // must not be used to initialize box shadow custom css due to DOC: 7879
  private static readonly DEFAULT_BOX_SHADOW_PIXEL_VALUES = '0px 0px 0px 0px';
  private static readonly DEFAULT_BOX_SHADOW_UNSET_VALUE = CSS_PROPERTY_VALUES.UNSET;
  private static readonly DEFAULT_BOX_SHADOW_INHERITED_VALUE = CSS_PROPERTY_VALUES.INHERIT;
  private static readonly DEFAULT_BOX_SHADOW_COLOR_VALUE = '#000000';
  private static readonly DEFAULT_BOX_SHADOW_SETTINGS_RANGE_VALUE = '0';

  private static setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentproperties: SubcomponentProperties, colorPickerValue: string): void {
    if (!subcomponentproperties.auxiliaryPartialCss) {
      subcomponentproperties.auxiliaryPartialCss = {};
    }
    if (!subcomponentproperties.auxiliaryPartialCss[subcomponentproperties.activeCssPseudoClass]) {
      subcomponentproperties.auxiliaryPartialCss[subcomponentproperties.activeCssPseudoClass] = {};
    }
    subcomponentproperties.auxiliaryPartialCss[subcomponentproperties.activeCssPseudoClass]
      .boxShadow = `${BoxShadowUtils.DEFAULT_BOX_SHADOW_PIXEL_VALUES} ${colorPickerValue}`;
  }

  private static setZeroBoxShadowPropertiesToUnset(subcomponentproperties: SubcomponentProperties): void {
    const { customCss, activeCssPseudoClass } = subcomponentproperties;
    if (customCss[activeCssPseudoClass].boxShadow.startsWith(BoxShadowUtils.DEFAULT_BOX_SHADOW_PIXEL_VALUES)) {
      BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentproperties, customCss[activeCssPseudoClass]
        .boxShadow.split(' ').pop());
      customCss[activeCssPseudoClass].boxShadow = BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE;     
    }
  }

  private static overwriteInheritedBoxShadowProperty(customCss: CustomCss, activeCssPseudoClass: CSS_PSEUDO_CLASSES): void {
    customCss[activeCssPseudoClass].boxShadow = ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, customCss, 'boxShadow');
  }

  private static overwriteUnsetBoxShadowPropertiesToZero(customCss: CustomCss, auxiliaryPartialCss: CustomCss, activeCssPseudoClass: CSS_PSEUDO_CLASSES): void {
    if (customCss[activeCssPseudoClass].boxShadow === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      customCss[activeCssPseudoClass].boxShadow = auxiliaryPartialCss
        && auxiliaryPartialCss[activeCssPseudoClass] && auxiliaryPartialCss[activeCssPseudoClass].boxShadow
        ? auxiliaryPartialCss[activeCssPseudoClass].boxShadow : `${BoxShadowUtils.DEFAULT_BOX_SHADOW_PIXEL_VALUES} ${BoxShadowUtils.DEFAULT_BOX_SHADOW_COLOR_VALUE}`;
    }
  }

  private static overwriteValues(customCss: CustomCss, auxiliaryPartialCss: CustomCss, activeCssPseudoClass: CSS_PSEUDO_CLASSES): void {
    if (customCss[activeCssPseudoClass].boxShadow === BoxShadowUtils.DEFAULT_BOX_SHADOW_INHERITED_VALUE) {
      BoxShadowUtils.overwriteInheritedBoxShadowProperty(customCss, activeCssPseudoClass);
    }
    BoxShadowUtils.overwriteUnsetBoxShadowPropertiesToZero(customCss, auxiliaryPartialCss, activeCssPseudoClass);
  }

  public static updateBoxShadowRangeValue(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const {cssProperty, partialCss} = spec;
    const { customCss, activeCssPseudoClass, auxiliaryPartialCss } = subcomponentProperties;
    if (customCss[activeCssPseudoClass][cssProperty] === undefined) {
      const defaultValues = [ ...partialCss.fullDefaultValues ];
      defaultValues[partialCss.position] = rangeValue;
      customCss[activeCssPseudoClass][cssProperty] = defaultValues.join(' ');
    } else {
      BoxShadowUtils.overwriteValues(customCss, auxiliaryPartialCss, activeCssPseudoClass);
      const cssPropertyValues = customCss[activeCssPseudoClass][cssProperty].split(' ');
      cssPropertyValues[partialCss.position] = `${rangeValue}px`;
      customCss[activeCssPseudoClass][cssProperty] = cssPropertyValues.join(' ');
    }
    BoxShadowUtils.setZeroBoxShadowPropertiesToUnset(subcomponentProperties);
  }

  public static updateBoxShadowColorValue(hexColor: string, updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { cssProperty, partialCss } = updatedSettingSpec;
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    if (customCss[activeCssPseudoClass][cssProperty] === undefined) {
      const defaultValues = [ ...partialCss.fullDefaultValues ];
      defaultValues[partialCss.position] = hexColor;
      if (customCss[activeCssPseudoClass][cssProperty] === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
        BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentProperties, hexColor);
      } else {
        customCss[activeCssPseudoClass][cssProperty] = BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE;
      }
    } else if (customCss[activeCssPseudoClass][cssProperty] == BoxShadowUtils.DEFAULT_BOX_SHADOW_INHERITED_VALUE) {
      BoxShadowUtils.overwriteInheritedBoxShadowProperty(customCss, activeCssPseudoClass);
    } else if (customCss[activeCssPseudoClass][cssProperty] === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentProperties, hexColor);
    } else {
      const cssPropertyValues = customCss[activeCssPseudoClass][cssProperty].split(' ');
      cssPropertyValues[partialCss.position] = hexColor;
      customCss[activeCssPseudoClass][cssProperty] = cssPropertyValues.join(' ');
    }
  }

  public static setBoxShadowSettingsRangeValue(cssPropertyValue: string, settingsSpec: any): boolean {
    if (cssPropertyValue === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      settingsSpec.default = BoxShadowUtils.DEFAULT_BOX_SHADOW_SETTINGS_RANGE_VALUE;
      return true;
    }
    return false;
  }

  public static setBoxShadowSettingsColorValue(cssPropertyValue: string, settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { activeCssPseudoClass, auxiliaryPartialCss } = subcomponentProperties;
    if (cssPropertyValue === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(auxiliaryPartialCss, activeCssPseudoClass, settingToBeUpdatedSpec.cssProperty)
        || BoxShadowUtils.DEFAULT_BOX_SHADOW_COLOR_VALUE;
    }
    settingToBeUpdatedSpec.default = cssPropertyValue.split(' ')[settingToBeUpdatedSpec.partialCss.position];
  }

}
