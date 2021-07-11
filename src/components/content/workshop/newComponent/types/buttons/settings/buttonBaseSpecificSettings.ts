import { UpdateOtherCssProperties, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';

export class ButtonBaseSpecificSettings {

  private static getLeftPositionProperties(subcomponentProperties: SubcomponentProperties): UpdateOtherCssProperties {
    const { customFeatures } = subcomponentProperties;
    return {
      customFeatures,
      customFeatureKeys: ['animations', 'stationary', 'fade', 'duration'],
      postfix: 's',
    };
  }

  private static setInterconnectedSettings(component: WorkshopComponent): void {
    const baseSubcomponent = component.subcomponents[component.coreSubcomponentNames.base];
    component.interconnectedSettings = [{
      updateOtherCssProperties: baseSubcomponent.subcomponentSpecificSettings[WORKSHOP_TOOLBAR_OPTION_TYPES.BUTTON_ANIMATIONS].Fade.updateOtherCssProperties,
      dependantChildrenTypes: new Set([SUBCOMPONENT_TYPES.TEXT]),
      updateOtherCssPropertiesObjGenerator: ButtonBaseSpecificSettings.getLeftPositionProperties,
    }];
  }

  private static getButtonBaseSpecificSettings(): SubcomponentSpecificSettings {
    return {
      [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE]: {
        'width': { scale: [0, 250] },
        'height': { scale: [0, 250] },
      },
      [WORKSHOP_TOOLBAR_OPTION_TYPES.BUTTON_ANIMATIONS]: {
        'Fade': {
          updateOtherCssProperties: [],
        },
      },
    };
  }

  private static setSubcomponentSpecificSettings(component: WorkshopComponent): void {
    const baseSubcomponent = component.subcomponents[component.coreSubcomponentNames.base];
    baseSubcomponent.subcomponentSpecificSettings = ButtonBaseSpecificSettings.getButtonBaseSpecificSettings();
  }

  public static set(component: WorkshopComponent): void {
    ButtonBaseSpecificSettings.setSubcomponentSpecificSettings(component);
    ButtonBaseSpecificSettings.setInterconnectedSettings(component);
  }
}
