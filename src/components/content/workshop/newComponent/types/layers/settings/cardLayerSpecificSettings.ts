import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';

export class CardLayerSpecificSettings {

  private static readonly CARD_LAYER_BASE_SPECIFIC_SETTINGS: SubcomponentSpecificSettings = {
    [WORKSHOP_TOOLBAR_OPTION_TYPES.SHADOW_VERTICAL]: {
      [SETTING_NAMES.Y_OFFSET]: { scale: [0, 100] },
    },
  };

  public static set(component: WorkshopComponent): void {
    component.baseSubcomponent.subcomponentSpecificSettings = CardLayerSpecificSettings.CARD_LAYER_BASE_SPECIFIC_SETTINGS;
  }
}
