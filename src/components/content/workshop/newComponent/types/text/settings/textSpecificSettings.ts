import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';

export class TextSpecificSettings {

  private static readonly TEXT_BASE_SPECIFIC_SETTINGS: SubcomponentSpecificSettings = {
    [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_SIZE]: {
      [SETTING_NAMES.WIDTH]: { scale: [0, 1000] },
    },
  };

  private static setSubcomponentSpecificSettings(textComponent: WorkshopComponent): void {
    textComponent.coreSubcomponentRefs.base.subcomponentSpecificSettings = TextSpecificSettings.TEXT_BASE_SPECIFIC_SETTINGS;
  }


  public static set(component: WorkshopComponent): void {
    TextSpecificSettings.setSubcomponentSpecificSettings(component);
  }
}
