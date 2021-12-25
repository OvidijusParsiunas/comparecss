import { UpdateOtherCssProperties, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';

export class ButtonBaseSpecificSettings {

  private static generateButtonBaseSpecificSettings(): SubcomponentSpecificSettings {
    return {
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
  }

  private static setSettingsOnBaseSubcomponent(buttonComponent: WorkshopComponent): void {
    buttonComponent.baseSubcomponent.subcomponentSpecificSettings = ButtonBaseSpecificSettings.generateButtonBaseSpecificSettings();
  }

  private static getFadeAnimationDurationProperties(baseSubcomponent: Subcomponent): UpdateOtherCssProperties {
    const { customFeatures } = baseSubcomponent;
    return {
      customFeatures,
      customFeatureKeys: ['animations', 'stationary', 'fade', 'duration'],
      postfix: 's',
    };
  }

  private static setInterconnectedSettings(buttonComponent: WorkshopComponent): void {
    buttonComponent.interconnectedSettings = [{
      updateOtherCssProperties: buttonComponent.baseSubcomponent.subcomponentSpecificSettings[WORKSHOP_TOOLBAR_OPTION_TYPES.BUTTON_ANIMATIONS]
        [SETTING_NAMES.FADE].updateOtherCssProperties,
      dependantChildrenTypes: new Set([SUBCOMPONENT_TYPES.TEXT, SUBCOMPONENT_TYPES.ICON]),
      updateOtherCssPropertiesObjGenerator: ButtonBaseSpecificSettings.getFadeAnimationDurationProperties,
    }];
  }

  public static set(buttonComponent: WorkshopComponent): void {
    ButtonBaseSpecificSettings.setSettingsOnBaseSubcomponent(buttonComponent);
    ButtonBaseSpecificSettings.setInterconnectedSettings(buttonComponent);
  }
}
