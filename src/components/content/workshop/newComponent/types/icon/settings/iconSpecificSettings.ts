import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';

export class IconSpecificSettings {

  private static changeIcon(subcomponent: Subcomponent, newName: string): void {
    const { icon } = subcomponent.customStaticFeatures;
    icon.isComponentDisplayed = false;
    icon.name = newName;
    setTimeout(() => {
      icon.isComponentDisplayed = true;
    });
  }

  private static readonly ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS: ActionsDropdownMouseEventCallbacks = {
    mouseEnterItemCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      IconSpecificSettings.changeIcon(event.subcomponent, event.triggeredItemName);
    },
    mouseLeaveDropdownCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      IconSpecificSettings.changeIcon(event.subcomponent, event.triggeredItemName);
    },
    mouseClickItemCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      if (event.isCustomFeatureResetTriggered) IconSpecificSettings.changeIcon(event.subcomponent, event.triggeredItemName);
    },
  };

  private static readonly ICON_BASE_SPECIFIC_SETTINGS: SubcomponentSpecificSettings = {
    [WORKSHOP_TOOLBAR_OPTION_TYPES.ICON]: {
      [SETTING_NAMES.BASIC_ICON]: {
        actionsDropdownMouseEvents: IconSpecificSettings.ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS,
      },
    },
  };

  public static set(component: WorkshopComponent): void {
    component.baseSubcomponent.subcomponentSpecificSettings = IconSpecificSettings.ICON_BASE_SPECIFIC_SETTINGS;
  }
}
