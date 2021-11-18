import { ActionsDropdownMouseEventCallbackEvent } from '../../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../../../../../../../consts/dropdownMenuAlignment.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { Subcomponent } from '../../../../../../../interfaces/workshopComponent';

export class MenuIndexAlignment {

  private static getCounterAlignment(alignment: DROPDOWN_MENU_INDEX_ALIGNMENT): DROPDOWN_MENU_INDEX_ALIGNMENT {
    return alignment === DROPDOWN_MENU_INDEX_ALIGNMENT.ABOVE ? DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW : DROPDOWN_MENU_INDEX_ALIGNMENT.ABOVE;
  }

  private static setOtherSubcomponentAlignment(alignment: DROPDOWN_MENU_INDEX_ALIGNMENT, otherSubcomponent: Subcomponent): void {
    const counterAlignment = MenuIndexAlignment.getCounterAlignment(alignment);
    otherSubcomponent.customFeatures.dropdown.indexAlignment = counterAlignment;
  }

  private static setZIndex(newAlignment: string, subcomponent: Subcomponent): void {
    const newZIndex = newAlignment === 'Above' ? 1 : -1;
    subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].zIndex = newZIndex;
  }

  private static changeChildComponentAlignment(event: ActionsDropdownMouseEventCallbackEvent, newMenuAlignment: string,
      menuSubcomponent: Subcomponent, otherSubcomponent: Subcomponent): void {
    const { triggeredItemName, subcomponent: currentSubcomponent, isCustomFeatureResetTriggered } = event;
    const newSubcomponentAlignment = triggeredItemName as DROPDOWN_MENU_INDEX_ALIGNMENT;
    MenuIndexAlignment.setZIndex(newMenuAlignment, menuSubcomponent);
    MenuIndexAlignment.setOtherSubcomponentAlignment(newSubcomponentAlignment, otherSubcomponent);
    if (isCustomFeatureResetTriggered) currentSubcomponent.customFeatures.dropdown.indexAlignment = newSubcomponentAlignment;
  }

  private static changeFromMenuComponent(event: ActionsDropdownMouseEventCallbackEvent): void {
    const menuSubcomponent = event.subcomponent;
    const buttonSubcomponent = menuSubcomponent.seedComponent.linkedComponents.base.baseSubcomponent;
    MenuIndexAlignment.changeChildComponentAlignment(event, event.triggeredItemName, menuSubcomponent, buttonSubcomponent);
  }

  private static changeFromButtonComponent(event: ActionsDropdownMouseEventCallbackEvent): void {
    const buttonSubcomponent = event.subcomponent;
    const menuSubcomponent = buttonSubcomponent.seedComponent.linkedComponents.auxiliary[0].baseSubcomponent;
    const newMenuAlignment = MenuIndexAlignment.getCounterAlignment(event.triggeredItemName as DROPDOWN_MENU_INDEX_ALIGNMENT);
    MenuIndexAlignment.changeChildComponentAlignment(event, newMenuAlignment, menuSubcomponent, menuSubcomponent);
  }

  public static change(event: ActionsDropdownMouseEventCallbackEvent): void {
    const currentComponent = event.subcomponent.seedComponent;
    if (currentComponent.type === COMPONENT_TYPES.DROPDOWN_MENU) {
      MenuIndexAlignment.changeFromMenuComponent(event);
    } else {
      MenuIndexAlignment.changeFromButtonComponent(event);
    }
  }
}
