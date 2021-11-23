import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import ComponentPreviewUtils from '../../../componentPreview/utils/componentPreviewUtils';
import { CustomCss, Subcomponent } from '../../../../../../interfaces/workshopComponent';
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

  private static setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponent: Subcomponent, colorPickerValue: string): void {
    if (!subcomponent.auxiliaryPartialCss) {
      subcomponent.auxiliaryPartialCss = {};
    }
    if (!subcomponent.auxiliaryPartialCss[subcomponent.activeCssPseudoClassesDropdownItem]) {
      subcomponent.auxiliaryPartialCss[subcomponent.activeCssPseudoClassesDropdownItem] = {};
    }
    subcomponent.auxiliaryPartialCss[subcomponent.activeCssPseudoClassesDropdownItem]
      .boxShadow = `${BoxShadowUtils.DEFAULT_BOX_SHADOW_PIXEL_VALUES} ${colorPickerValue}`;
  }

  private static setZeroBoxShadowPropertiesToUnset(subcomponent: Subcomponent): void {
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    if (customCss[activeCssPseudoClassesDropdownItem].boxShadow.startsWith(BoxShadowUtils.DEFAULT_BOX_SHADOW_PIXEL_VALUES)) {
      BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponent, customCss[activeCssPseudoClassesDropdownItem]
        .boxShadow.split(' ').pop());
      customCss[activeCssPseudoClassesDropdownItem].boxShadow = BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE;     
    }
  }

  private static overwriteInheritedBoxShadowProperty(customCss: CustomCss, activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES): void {
    customCss[activeCssPseudoClassesDropdownItem].boxShadow = ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClassesDropdownItem, customCss, 'boxShadow');
  }

  private static overwriteUnsetBoxShadowPropertiesToZero(customCss: CustomCss, auxiliaryPartialCss: CustomCss, activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES): void {
    if (customCss[activeCssPseudoClassesDropdownItem].boxShadow === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      customCss[activeCssPseudoClassesDropdownItem].boxShadow = auxiliaryPartialCss
        && auxiliaryPartialCss[activeCssPseudoClassesDropdownItem] && auxiliaryPartialCss[activeCssPseudoClassesDropdownItem].boxShadow
        ? auxiliaryPartialCss[activeCssPseudoClassesDropdownItem].boxShadow : `${BoxShadowUtils.DEFAULT_BOX_SHADOW_PIXEL_VALUES} ${BoxShadowUtils.DEFAULT_BOX_SHADOW_COLOR_VALUE}`;
    }
  }

  private static overwriteValues(customCss: CustomCss, auxiliaryPartialCss: CustomCss, activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES): void {
    if (customCss[activeCssPseudoClassesDropdownItem].boxShadow === BoxShadowUtils.DEFAULT_BOX_SHADOW_INHERITED_VALUE) {
      BoxShadowUtils.overwriteInheritedBoxShadowProperty(customCss, activeCssPseudoClassesDropdownItem);
    }
    BoxShadowUtils.overwriteUnsetBoxShadowPropertiesToZero(customCss, auxiliaryPartialCss, activeCssPseudoClassesDropdownItem);
  }

  public static updateBoxShadowRangeValue(rangeValue: string, spec: any, subcomponent: Subcomponent): void {
    const {cssProperty, partialCss} = spec;
    const { customCss, activeCssPseudoClassesDropdownItem, auxiliaryPartialCss } = subcomponent;
    if (customCss[activeCssPseudoClassesDropdownItem][cssProperty] === undefined) {
      const defaultValues = [ ...partialCss.fullDefaultValues ];
      defaultValues[partialCss.position] = rangeValue;
      customCss[activeCssPseudoClassesDropdownItem][cssProperty] = defaultValues.join(' ');
    } else {
      BoxShadowUtils.overwriteValues(customCss, auxiliaryPartialCss, activeCssPseudoClassesDropdownItem);
      const cssPropertyValues = customCss[activeCssPseudoClassesDropdownItem][cssProperty].split(' ');
      cssPropertyValues[partialCss.position] = `${rangeValue}px`;
      customCss[activeCssPseudoClassesDropdownItem][cssProperty] = cssPropertyValues.join(' ');
    }
    BoxShadowUtils.setZeroBoxShadowPropertiesToUnset(subcomponent);
  }

  public static updateBoxShadowColorValue(hexColor: string, updatedSettingSpec: any, subcomponent: Subcomponent): void {
    const { cssProperty, partialCss } = updatedSettingSpec;
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    if (customCss[activeCssPseudoClassesDropdownItem][cssProperty] === undefined) {
      const defaultValues = [ ...partialCss.fullDefaultValues ];
      defaultValues[partialCss.position] = hexColor;
      if (customCss[activeCssPseudoClassesDropdownItem][cssProperty] === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
        BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponent, hexColor);
      } else {
        customCss[activeCssPseudoClassesDropdownItem][cssProperty] = BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE;
      }
    } else if (customCss[activeCssPseudoClassesDropdownItem][cssProperty] == BoxShadowUtils.DEFAULT_BOX_SHADOW_INHERITED_VALUE) {
      BoxShadowUtils.overwriteInheritedBoxShadowProperty(customCss, activeCssPseudoClassesDropdownItem);
    } else if (customCss[activeCssPseudoClassesDropdownItem][cssProperty] === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponent, hexColor);
    } else {
      const cssPropertyValues = customCss[activeCssPseudoClassesDropdownItem][cssProperty].split(' ');
      cssPropertyValues[partialCss.position] = hexColor;
      customCss[activeCssPseudoClassesDropdownItem][cssProperty] = cssPropertyValues.join(' ');
    }
  }

  public static setBoxShadowSettingsRangeValue(cssPropertyValue: string, settingsSpec: any): boolean {
    if (cssPropertyValue === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      settingsSpec.default = BoxShadowUtils.DEFAULT_BOX_SHADOW_SETTINGS_RANGE_VALUE;
      return true;
    }
    return false;
  }

  public static setBoxShadowSettingsColorValue(cssPropertyValue: string, settingToBeUpdatedSpec: any, subcomponent: Subcomponent): void {
    const { activeCssPseudoClassesDropdownItem, auxiliaryPartialCss } = subcomponent;
    if (cssPropertyValue === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(auxiliaryPartialCss, activeCssPseudoClassesDropdownItem, settingToBeUpdatedSpec.cssProperty)
        || BoxShadowUtils.DEFAULT_BOX_SHADOW_COLOR_VALUE;
    }
    settingToBeUpdatedSpec.default = cssPropertyValue.split(' ')[settingToBeUpdatedSpec.partialCss.position];
  }

}
