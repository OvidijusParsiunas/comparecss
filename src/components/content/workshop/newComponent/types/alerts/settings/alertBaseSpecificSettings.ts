import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';
import { AnimationPreview } from '../../shared/settings/animationPreview';

export class AlertBaseSpecificSettings {

  private static readonly ALERT_BASE_SPECIFIC_SETTINGS: SubcomponentSpecificSettings = {
    [WORKSHOP_TOOLBAR_OPTION_TYPES.PADDING]: {
      [SETTING_NAMES.LEFT]: { scale: [0, 100] },
    },
    [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE]: {
      [SETTING_NAMES.WIDTH]: { scale: [100, 700] },
      [SETTING_NAMES.HEIGHT]: { scale: [30, 200] },
    },
    [WORKSHOP_TOOLBAR_OPTION_TYPES.CLOSE_ANIMATION]: {
      [SETTING_NAMES.DISMISS]: {
        actionsDropdownMouseEvents: AnimationPreview.EXIT_ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS,
      },
    },
  };

  public static set(component: WorkshopComponent): void {
    component.coreSubcomponentRefs.base.subcomponentSpecificSettings = AlertBaseSpecificSettings.ALERT_BASE_SPECIFIC_SETTINGS;
  }
}
