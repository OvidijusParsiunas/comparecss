import { UNSET_COLOR_BUTTON_DISPLAYED_STATE, UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX } from '../../../../../../../consts/unsetColotButtonDisplayed';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentProperties } from '../../../../../../..//interfaces/workshopComponent';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';

export class UnsetColorButton {

  private static isCssPropertyNotAvailable(settingProperty: string, workshopComponentCss: WorkshopComponentCss): boolean {
    return !workshopComponentCss || !workshopComponentCss[settingProperty];
  }

  private static isExistingCssPropertyNotInherited(settingProperty: string, workshopComponentCss: WorkshopComponentCss): boolean {
    return (workshopComponentCss?.[settingProperty] && workshopComponentCss[settingProperty] !== CSS_PROPERTY_VALUES.INHERIT);
  }

  private static isClickColorInherited(settingProperty: string, subcomponentProperties: SubcomponentProperties): boolean {
    if (subcomponentProperties.activeCssPseudoClass === CSS_PSEUDO_CLASSES.CLICK) {
      const workshopComponentCssClick: WorkshopComponentCss = subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.CLICK];
      const workshopComponentCssHover: WorkshopComponentCss = subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.HOVER];
      const workshopComponentCssDefault: WorkshopComponentCss = subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
      return UnsetColorButton.isExistingCssPropertyNotInherited(settingProperty, workshopComponentCssClick)
        || (UnsetColorButton.isCssPropertyNotAvailable(settingProperty, workshopComponentCssClick)
            && ((UnsetColorButton.isCssPropertyNotAvailable(settingProperty, workshopComponentCssHover)
                && UnsetColorButton.isExistingCssPropertyNotInherited(settingProperty, workshopComponentCssDefault))
              || UnsetColorButton.isExistingCssPropertyNotInherited(settingProperty, workshopComponentCssHover)));
    }
    return false;
  }

  private static isHoverColorInherited(settingProperty: string, subcomponentProperties: SubcomponentProperties): boolean {
    if (subcomponentProperties.activeCssPseudoClass === CSS_PSEUDO_CLASSES.HOVER) {
      const workshopComponentCssHover: WorkshopComponentCss = subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.HOVER];
      const workshopComponentDefault: WorkshopComponentCss = subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
      return UnsetColorButton.isExistingCssPropertyNotInherited(settingProperty, workshopComponentCssHover)
        || (UnsetColorButton.isCssPropertyNotAvailable(settingProperty, workshopComponentCssHover)
          && workshopComponentDefault[settingProperty] !== CSS_PROPERTY_VALUES.INHERIT);
    }
    return false;
  }

  private static isUnsetColorButtonStateTrue(settingProperty: string, subcomponentProperties: SubcomponentProperties): boolean {
    const workshopComponentCss: WorkshopComponentCss = subcomponentProperties.customCss[subcomponentProperties.activeCssPseudoClass];
    if (workshopComponentCss?.[settingProperty]) {
      const unsetColorButtonStatePropertyValue =  workshopComponentCss[settingProperty + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX];
      return (!unsetColorButtonStatePropertyValue && workshopComponentCss[settingProperty] !== CSS_PROPERTY_VALUES.INHERIT)
        || (unsetColorButtonStatePropertyValue && unsetColorButtonStatePropertyValue === UNSET_COLOR_BUTTON_DISPLAYED_STATE.DISPLAY);
    }
    return false;
  }

  public static isUnsetColorButtonDisplayed(settingSpec: any, subcomponentProperties: SubcomponentProperties): boolean {
    return settingSpec.unsetColorButtonAvailable && 
      (UnsetColorButton.isUnsetColorButtonStateTrue(settingSpec.cssProperty, subcomponentProperties)
      || (UnsetColorButton.isHoverColorInherited(settingSpec.cssProperty, subcomponentProperties)
        || UnsetColorButton.isClickColorInherited(settingSpec.cssProperty, subcomponentProperties))
      || (settingSpec.customFeatureObjectKeys && settingSpec.default !== CSS_PROPERTY_VALUES.UNSET));
  }
}
