import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';

export class ButtonGroupButtonSpecificSettings {

  public static readonly BUTTON_GENERIC_COMPONENTS: SubcomponentSpecificSettings = {
    [WORKSHOP_TOOLBAR_OPTION_TYPES.BUTTON_GROUP_BUTTON_BORDER]: {
      [SETTING_NAMES.DIVIDER_WIDTH]: {
        scale: [0, 8],
      },
    },
  };

  public static set(buttonComponent: WorkshopComponent): void {
    buttonComponent.baseSubcomponent.subcomponentSpecificSettings = ButtonGroupButtonSpecificSettings.BUTTON_GENERIC_COMPONENTS;
  }
}
