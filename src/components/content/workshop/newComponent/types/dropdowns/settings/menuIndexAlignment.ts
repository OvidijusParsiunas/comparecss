import { ActionsDropdownMouseEventCallbackEvent } from '../../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../../../../../../../consts/dropdownMenuAlignment.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';

export class MenuIndexAlignment {

  private static getCounterAlignment(alignment: DROPDOWN_MENU_INDEX_ALIGNMENT): DROPDOWN_MENU_INDEX_ALIGNMENT {
    return alignment === DROPDOWN_MENU_INDEX_ALIGNMENT.ABOVE ? DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW : DROPDOWN_MENU_INDEX_ALIGNMENT.ABOVE;
  }

  private static setOtherSubcomponentAlignment(alignment: DROPDOWN_MENU_INDEX_ALIGNMENT, otherSubcomponent: SubcomponentProperties): void {
    const counterAlignment = MenuIndexAlignment.getCounterAlignment(alignment);
    otherSubcomponent.customFeatures.dropdown.indexAlignment = counterAlignment;
  }

  private static setZIndex(newAlignment: string, subcomponentProperties: SubcomponentProperties): void {
    const newIndex = newAlignment === 'Above' ? 1 : -1;
    subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT].zIndex = newIndex;
  }

  private static changeSubcomponentAlignment(event: ActionsDropdownMouseEventCallbackEvent, newMenuAlignment: string,
      menuSubcomponent: SubcomponentProperties, otherSubcomponent: SubcomponentProperties): void {
    const { triggeredOptionName, subcomponentProperties: currentSubcomponent, isCustomFeatureResetTriggered } = event;
    const newSubcomponentAlignment = triggeredOptionName as DROPDOWN_MENU_INDEX_ALIGNMENT;
    MenuIndexAlignment.setZIndex(newMenuAlignment, menuSubcomponent);
    MenuIndexAlignment.setOtherSubcomponentAlignment(newSubcomponentAlignment, otherSubcomponent);
    if (isCustomFeatureResetTriggered) currentSubcomponent.customFeatures.dropdown.indexAlignment = newSubcomponentAlignment;
  }

  private static changeFromMenuSubcomponent(event: ActionsDropdownMouseEventCallbackEvent): void {
    const menuSubcomponent = event.subcomponentProperties;
    const buttonSubcomponent = menuSubcomponent.seedComponent.linkedComponents.base.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    MenuIndexAlignment.changeSubcomponentAlignment(event, event.triggeredOptionName, menuSubcomponent, buttonSubcomponent);
  }

  private static changeFromButtonSubcomponent(event: ActionsDropdownMouseEventCallbackEvent): void {
    const buttonSubcomponent = event.subcomponentProperties;
    const menuSubcomponent = buttonSubcomponent.seedComponent.linkedComponents.auxiliary[0].coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const newMenuAlignment = MenuIndexAlignment.getCounterAlignment(event.triggeredOptionName as DROPDOWN_MENU_INDEX_ALIGNMENT);
    MenuIndexAlignment.changeSubcomponentAlignment(event, newMenuAlignment, menuSubcomponent, menuSubcomponent);
  }

  public static change(event: ActionsDropdownMouseEventCallbackEvent): void {
    const currentComponent = event.subcomponentProperties.seedComponent;
    if (currentComponent.type === COMPONENT_TYPES.DROPDOWN_MENU) {
      MenuIndexAlignment.changeFromMenuSubcomponent(event);
    } else {
      MenuIndexAlignment.changeFromButtonSubcomponent(event);
    }
  }
}
