import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';

export class MenuBaseSpecificSettings {

  private static readonly MENU_BASE_SPECIFIC_COMPONENTS: SubcomponentSpecificSettings = {
    [WORKSHOP_TOOLBAR_OPTION_TYPES.MARGIN]: {
      [SETTING_NAMES.LEFT]: {
        scale: [-200, 200],
        updateOtherCssProperties: [],
      },
      [SETTING_NAMES.TOP]: {
        scale: [-200, 200],
        updateOtherCssProperties: [],
      },
      [SETTING_NAMES.RIGHT]: {
        scale: [-200, 200],
        updateOtherCssProperties: [],
      },
      [SETTING_NAMES.BOTTOM]: {
        scale: [-200, 200],
        updateOtherCssProperties: [],
      },
    },
  };

  public static set(component: WorkshopComponent): void {
    component.baseSubcomponent.subcomponentSpecificSettings = MenuBaseSpecificSettings.MENU_BASE_SPECIFIC_COMPONENTS;
  }
}
