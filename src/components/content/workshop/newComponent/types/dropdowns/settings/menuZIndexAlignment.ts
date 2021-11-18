import { ActionsDropdownMouseEventCallbackEvent } from '../../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { DROPDOWN_MENU_Z_INDEX_ALIGNMENT } from '../../../../../../../consts/dropdownMenuAlignment.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { Subcomponent } from '../../../../../../../interfaces/workshopComponent';

export class MenuZIndexAlignment {

  private static getCounterAlignment(alignment: DROPDOWN_MENU_Z_INDEX_ALIGNMENT): DROPDOWN_MENU_Z_INDEX_ALIGNMENT {
    return alignment === DROPDOWN_MENU_Z_INDEX_ALIGNMENT.ABOVE ? DROPDOWN_MENU_Z_INDEX_ALIGNMENT.BELOW : DROPDOWN_MENU_Z_INDEX_ALIGNMENT.ABOVE;
  }

  // if current subcomponent is menu then the other is button, when it is button then it is menu
  private static setOtherSubcomponentZIndexAlignmentCustomFeature(alignment: DROPDOWN_MENU_Z_INDEX_ALIGNMENT, otherSubcomponent: Subcomponent): void {
    const counterAlignment = MenuZIndexAlignment.getCounterAlignment(alignment);
    otherSubcomponent.customFeatures.dropdown.zIndexAlignment = counterAlignment;
  }

  private static setZIndex(newAlignment: string, subcomponent: Subcomponent): void {
    const newZIndex = newAlignment === DROPDOWN_MENU_Z_INDEX_ALIGNMENT.ABOVE ? 1 : -1;
    subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].zIndex = newZIndex;
  }

  private static changeAlignment(event: ActionsDropdownMouseEventCallbackEvent, newMenuAlignment: string,
      menuSubcomponent: Subcomponent, otherSubcomponent: Subcomponent): void {
    const { triggeredItemName, subcomponent: currentSubcomponent, isCustomFeatureResetTriggered } = event;
    MenuZIndexAlignment.setZIndex(newMenuAlignment, menuSubcomponent);
    const otherSubcomponentAlignment = triggeredItemName as DROPDOWN_MENU_Z_INDEX_ALIGNMENT;
    MenuZIndexAlignment.setOtherSubcomponentZIndexAlignmentCustomFeature(otherSubcomponentAlignment, otherSubcomponent);
    if (isCustomFeatureResetTriggered) currentSubcomponent.customFeatures.dropdown.zIndexAlignment = otherSubcomponentAlignment;
  }

  private static changeViaMenuComponent(event: ActionsDropdownMouseEventCallbackEvent): void {
    const menuSubcomponent = event.subcomponent;
    const buttonSubcomponent = menuSubcomponent.seedComponent.linkedComponents.base.baseSubcomponent;
    MenuZIndexAlignment.changeAlignment(event, event.triggeredItemName, menuSubcomponent, buttonSubcomponent);
  }

  private static changeViaButtonComponent(event: ActionsDropdownMouseEventCallbackEvent): void {
    const buttonSubcomponent = event.subcomponent;
    const menuSubcomponent = buttonSubcomponent.seedComponent.linkedComponents.auxiliary[0].baseSubcomponent;
    const newMenuAlignment = MenuZIndexAlignment.getCounterAlignment(event.triggeredItemName as DROPDOWN_MENU_Z_INDEX_ALIGNMENT);
    MenuZIndexAlignment.changeAlignment(event, newMenuAlignment, menuSubcomponent, menuSubcomponent);
  }

  public static change(event: ActionsDropdownMouseEventCallbackEvent): void {
    const currentComponent = event.subcomponent.seedComponent;
    if (currentComponent.type === COMPONENT_TYPES.DROPDOWN_MENU) {
      MenuZIndexAlignment.changeViaMenuComponent(event);
    } else {
      MenuZIndexAlignment.changeViaButtonComponent(event);
    }
  }
}
