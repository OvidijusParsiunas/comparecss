import { Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SETTINGS_TYPES } from '../../../../../../../consts/settingsTypes.enum';

export class TriggerFuncs {

  private static setWidthViaRange(subcomponent: Subcomponent, cssProperty: string): void {
    if (cssProperty === 'width') {
      subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].height = subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].width;
    }
  }

  public static setTriggerFuncOnItemSettingChange(iconBaseComponent: WorkshopComponent): void {
    iconBaseComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.RANGE]: TriggerFuncs.setWidthViaRange,
    };
  }
}
