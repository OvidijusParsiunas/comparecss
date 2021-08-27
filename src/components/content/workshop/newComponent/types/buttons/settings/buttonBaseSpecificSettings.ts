import { UpdateOtherCssProperties, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';

export class ButtonBaseSpecificSettings {

  private static readonly MENU_BASE_SPECIFIC_COMPONENTS: SubcomponentSpecificSettings = {
    [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE]: {
      [SETTING_NAMES.WIDTH]: { scale: [0, 250] },
      [SETTING_NAMES.HEIGHT]: { scale: [0, 250] },
    },
    [WORKSHOP_TOOLBAR_OPTION_TYPES.BUTTON_ANIMATIONS]: {
      [SETTING_NAMES.FADE]: {
        updateOtherCssProperties: [],
      },
    },
  };

  private static setSettingsOnBaseSubcomponent(component: WorkshopComponent): void {
    const baseSubcomponent = component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    baseSubcomponent.subcomponentSpecificSettings = ButtonBaseSpecificSettings.MENU_BASE_SPECIFIC_COMPONENTS;
  }

  private static getFadeAnimationDurationProperties(subcomponentProperties: SubcomponentProperties): UpdateOtherCssProperties {
    const { customFeatures } = subcomponentProperties;
    return {
      customFeatures,
      customFeatureKeys: ['animations', 'stationary', 'fade', 'duration'],
      postfix: 's',
    };
  }

  private static setInterconnectedSettings(component: WorkshopComponent): void {
    const baseSubcomponent = component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    component.interconnectedSettings = [{
      updateOtherCssProperties: baseSubcomponent.subcomponentSpecificSettings[WORKSHOP_TOOLBAR_OPTION_TYPES.BUTTON_ANIMATIONS]
        [SETTING_NAMES.FADE].updateOtherCssProperties,
      dependantChildrenTypes: new Set([SUBCOMPONENT_TYPES.TEXT, SUBCOMPONENT_TYPES.ICON]),
      updateOtherCssPropertiesObjGenerator: ButtonBaseSpecificSettings.getFadeAnimationDurationProperties,
    }];
  }

  public static set(component: WorkshopComponent): void {
    ButtonBaseSpecificSettings.setSettingsOnBaseSubcomponent(component);
    ButtonBaseSpecificSettings.setInterconnectedSettings(component);
  }
}
