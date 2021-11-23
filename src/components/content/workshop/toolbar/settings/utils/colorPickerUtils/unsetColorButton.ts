import { UNSET_COLOR_BUTTON_DISPLAYED_STATE, UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX } from '../../../../../../../consts/unsetColotButtonDisplayed';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { Subcomponent } from '../../../../../../..//interfaces/workshopComponent';

export class UnsetColorButton {

  private static isCssPropertyNotAvailable(settingProperty: string, workshopComponentCss: WorkshopComponentCss): boolean {
    return !workshopComponentCss || !workshopComponentCss[settingProperty];
  }

  private static isExistingCssPropertyNotInherited(settingProperty: string, workshopComponentCss: WorkshopComponentCss): boolean {
    return (workshopComponentCss?.[settingProperty] && workshopComponentCss[settingProperty] !== CSS_PROPERTY_VALUES.INHERIT);
  }

  private static isClickColorInherited(settingProperty: string, subcomponent: Subcomponent): boolean {
    if (subcomponent.activeCssPseudoClassesDropdownItem === CSS_PSEUDO_CLASSES.CLICK) {
      const workshopComponentCssClick: WorkshopComponentCss = subcomponent.customCss[CSS_PSEUDO_CLASSES.CLICK];
      const workshopComponentCssHover: WorkshopComponentCss = subcomponent.customCss[CSS_PSEUDO_CLASSES.HOVER];
      const workshopComponentCssDefault: WorkshopComponentCss = subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
      return UnsetColorButton.isExistingCssPropertyNotInherited(settingProperty, workshopComponentCssClick)
        || (UnsetColorButton.isCssPropertyNotAvailable(settingProperty, workshopComponentCssClick)
            && ((UnsetColorButton.isCssPropertyNotAvailable(settingProperty, workshopComponentCssHover)
                && UnsetColorButton.isExistingCssPropertyNotInherited(settingProperty, workshopComponentCssDefault))
              || UnsetColorButton.isExistingCssPropertyNotInherited(settingProperty, workshopComponentCssHover)));
    }
    return false;
  }

  private static isHoverColorInherited(settingProperty: string, subcomponent: Subcomponent): boolean {
    if (subcomponent.activeCssPseudoClassesDropdownItem === CSS_PSEUDO_CLASSES.HOVER) {
      const workshopComponentCssHover: WorkshopComponentCss = subcomponent.customCss[CSS_PSEUDO_CLASSES.HOVER];
      const workshopComponentDefault: WorkshopComponentCss = subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
      return UnsetColorButton.isExistingCssPropertyNotInherited(settingProperty, workshopComponentCssHover)
        || (UnsetColorButton.isCssPropertyNotAvailable(settingProperty, workshopComponentCssHover)
          && workshopComponentDefault[settingProperty] !== CSS_PROPERTY_VALUES.INHERIT);
    }
    return false;
  }

  private static isUnsetColorButtonStateTrue(settingProperty: string, subcomponent: Subcomponent): boolean {
    const workshopComponentCss: WorkshopComponentCss = subcomponent.customCss[subcomponent.activeCssPseudoClassesDropdownItem];
    if (workshopComponentCss?.[settingProperty]) {
      const unsetColorButtonStatePropertyValue =  workshopComponentCss[settingProperty + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX];
      if (unsetColorButtonStatePropertyValue) return unsetColorButtonStatePropertyValue === UNSET_COLOR_BUTTON_DISPLAYED_STATE.DISPLAY;
      return workshopComponentCss[settingProperty] !== CSS_PROPERTY_VALUES.INHERIT;
    }
    return false;
  }

  public static isUnsetColorButtonDisplayed(settingSpec: any, subcomponent: Subcomponent): boolean {
    return settingSpec.unsetColorButtonAvailable && 
      (UnsetColorButton.isUnsetColorButtonStateTrue(settingSpec.cssProperty, subcomponent)
      || (UnsetColorButton.isHoverColorInherited(settingSpec.cssProperty, subcomponent)
        || UnsetColorButton.isClickColorInherited(settingSpec.cssProperty, subcomponent))
      || (settingSpec.customFeatureObjectKeys && settingSpec.default !== CSS_PROPERTY_VALUES.UNSET));
  }
}
