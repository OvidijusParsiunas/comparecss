import { UpdateOtherCssProperties, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { LAYER_SECTION_DIVISOR } from '../../../../../../../consts/layerSectionDivisor';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';

export class CardBaseSpecificSettings {

  private static getLeftPositionProperties(subcomponentProperties: SubcomponentProperties): UpdateOtherCssProperties {
    const { customCss, customFeatures } = subcomponentProperties;
    return {
      cssProperty: 'left',
      customCss,
      customFeatures,
      isScaleNegativeToPositive: true,
      divisor: LAYER_SECTION_DIVISOR,
    };
  }

  private static setInterconnectedSettings(component: WorkshopComponent): void {
    const baseSubcomponent = component.subcomponents[component.coreSubcomponentNames.base];
    component.interconnectedSettings = [{
      updateOtherCssProperties: baseSubcomponent.subcomponentSpecificSettings[WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_WIDTH][SETTING_NAMES.WIDTH].updateOtherCssProperties,
      dependantChildrenTypes: new Set([SUBCOMPONENT_TYPES.AVATAR, SUBCOMPONENT_TYPES.BUTTON]),
      updateOtherCssPropertiesObjGenerator: CardBaseSpecificSettings.getLeftPositionProperties,
    }];
  }

  private static getCardBaseSpecificSettings(): SubcomponentSpecificSettings {
    return {
      [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_WIDTH]: {
        [SETTING_NAMES.WIDTH]: {
          scale: [170, 700],
          updateOtherCssProperties: [],
        },
      },
    };
  }

  private static setSubcomponentSpecificSettings(component: WorkshopComponent): void {
    const baseSubcomponent = component.subcomponents[component.coreSubcomponentNames.base];
    baseSubcomponent.subcomponentSpecificSettings = CardBaseSpecificSettings.getCardBaseSpecificSettings();
  }

  public static set(component: WorkshopComponent): void {
    CardBaseSpecificSettings.setSubcomponentSpecificSettings(component);
    CardBaseSpecificSettings.setInterconnectedSettings(component);
  }
}
