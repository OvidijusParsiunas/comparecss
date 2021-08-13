import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';
import { IconBase } from '../generators/base';

export class IconSpecificSettings {

  private static readonly ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS: ActionsDropdownMouseEventCallbacks = {
    mouseEnterOptionCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      IconBase.changeIconFunc(event.subcomponentProperties, event.triggeredOptionName);
    },
    mouseLeaveDropdownCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      IconBase.changeIconFunc(event.subcomponentProperties, event.triggeredOptionName);
    },
  };

  private static readonly ICON_BASE_SPECIFIC_SETTINGS: SubcomponentSpecificSettings = {
    [WORKSHOP_TOOLBAR_OPTION_TYPES.ICON]: {
      [SETTING_NAMES.TYPE]: {
        actionsDropdownMouseEvents: IconSpecificSettings.ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS,
      },
    },
  }

  private static setSubcomponentSpecificSettings(component: WorkshopComponent): void {
    const baseSubcomponent = component.coreSubcomponentRefs.base;
    baseSubcomponent.subcomponentSpecificSettings = IconSpecificSettings.ICON_BASE_SPECIFIC_SETTINGS;
  }

  public static set(component: WorkshopComponent): void {
    IconSpecificSettings.setSubcomponentSpecificSettings(component);
  }
}
