import { ActionsDropdownMouseEventCallbackEvent } from '../../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';

export class MenuPositionAlignment {

  private static getCounterAlignment(alignment: string): string {
    return alignment === 'Above' ? 'Below' : 'Above';
  }

  private static setOtherSubcomponentAlignment(alignment: string, otherSubcomponent: SubcomponentProperties): void {
    const counterAlignment = MenuPositionAlignment.getCounterAlignment(alignment);
    otherSubcomponent.customStaticFeatures.dropdownAlignment.position = counterAlignment;
  }

  private static setZIndex(newAlignment: string, subcomponentProperties: SubcomponentProperties): void {
    const newIndex = newAlignment === 'Above' ? 1 : -1;
    subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT].zIndex = newIndex;
  }

  public static changeSubcomponentAlignment(event: ActionsDropdownMouseEventCallbackEvent, newMenuAlignment: string,
      menuSubcomponent: SubcomponentProperties, otherSubcomponent: SubcomponentProperties): void {
    const { triggeredOptionName, subcomponentProperties: currentSubcomponent, isCustomFeatureResetTriggered } = event;
    MenuPositionAlignment.setZIndex(newMenuAlignment, menuSubcomponent);
    MenuPositionAlignment.setOtherSubcomponentAlignment(triggeredOptionName, otherSubcomponent);
    if (isCustomFeatureResetTriggered) currentSubcomponent.customStaticFeatures.dropdownAlignment.position = triggeredOptionName;
  }

  public static changeFromMenuSubcomponent(event: ActionsDropdownMouseEventCallbackEvent): void {
    const menuSubcomponent = event.subcomponentProperties;
    const buttonSubcomponent = menuSubcomponent.seedComponent.linkedComponents.base.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    MenuPositionAlignment.changeSubcomponentAlignment(event, event.triggeredOptionName, menuSubcomponent, buttonSubcomponent);
  }

  public static changeFromButtonSubcomponent(event: ActionsDropdownMouseEventCallbackEvent): void {
    const buttonSubcomponent = event.subcomponentProperties;
    const menuSubcomponent = buttonSubcomponent.seedComponent.linkedComponents.auxiliary[0].coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const newMenuAlignment = MenuPositionAlignment.getCounterAlignment(event.triggeredOptionName);
    MenuPositionAlignment.changeSubcomponentAlignment(event, newMenuAlignment, menuSubcomponent, menuSubcomponent);
  }

  public static change(event: ActionsDropdownMouseEventCallbackEvent): void {
    const currentComponent = event.subcomponentProperties.seedComponent;
    if (currentComponent.type === COMPONENT_TYPES.DROPDOWN_MENU) {
      MenuPositionAlignment.changeFromMenuSubcomponent(event);
    } else {
      MenuPositionAlignment.changeFromButtonSubcomponent(event);
    }
  }
}
