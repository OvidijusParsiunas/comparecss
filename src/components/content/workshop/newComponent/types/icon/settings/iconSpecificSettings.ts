import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';

export class IconSpecificSettings {

  private static changeIcon(subcomponentProperties: SubcomponentProperties, newName: string): void {
    const { icon } = subcomponentProperties.customStaticFeatures;
    icon.isComponentDisplayed = false;
    icon.name = newName;
    setTimeout(() => {
      icon.isComponentDisplayed = true;
    });
  }

  private static readonly ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS: ActionsDropdownMouseEventCallbacks = {
    mouseEnterOptionCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      IconSpecificSettings.changeIcon(event.subcomponentProperties, event.triggeredOptionName);
    },
    mouseLeaveDropdownCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      IconSpecificSettings.changeIcon(event.subcomponentProperties, event.triggeredOptionName);
    },
    mouseClickOptionCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      if (event.isCustomFeatureResetTriggered) IconSpecificSettings.changeIcon(event.subcomponentProperties, event.triggeredOptionName);
    },
  };

  private static readonly ICON_BASE_SPECIFIC_SETTINGS: SubcomponentSpecificSettings = {
    [WORKSHOP_TOOLBAR_OPTION_TYPES.ICON]: {
      [SETTING_NAMES.TYPE]: {
        actionsDropdownMouseEvents: IconSpecificSettings.ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS,
      },
    },
  };

  public static set(component: WorkshopComponent): void {
    component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].subcomponentSpecificSettings = IconSpecificSettings.ICON_BASE_SPECIFIC_SETTINGS;
  }
}
