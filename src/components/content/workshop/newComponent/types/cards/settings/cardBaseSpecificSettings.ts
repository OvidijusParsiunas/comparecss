import { UpdateOtherCssProperties, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { LAYER_SECTION_DIVISOR } from '../../../../../../../consts/layerSectionDivisor';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';
import { AnimationPreview } from '../../shared/settings/animationPreview';

export class CardBaseSpecificSettings {

  public static readonly CARD_BASE_GENERIC_COMPONENTS: SubcomponentSpecificSettings = {
    [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_WIDTH]: {
      [SETTING_NAMES.WIDTH]: {
        scale: [170, 700],
        updateOtherCssProperties: [],
      },
    },
  };
  private static readonly CARD_BASE_SPECIFIC_COMPONENTS: SubcomponentSpecificSettings = {
    [WORKSHOP_TOOLBAR_OPTION_TYPES.CLOSE_ANIMATION]: {
      [SETTING_NAMES.DISMISS]: {
        actionsDropdownMouseEvents: AnimationPreview.EXIT_ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS,
      },
    },
  };

  private static setSettingsOnBaseSubcomponent(component: WorkshopComponent): void {
    component.baseSubcomponent.subcomponentSpecificSettings = {
      ...CardBaseSpecificSettings.CARD_BASE_GENERIC_COMPONENTS, ...CardBaseSpecificSettings.CARD_BASE_SPECIFIC_COMPONENTS };
  }

  // this is no longer used, but is kept as an exemplar for future cssProperty interconnected settings
  private static getLeftPositionProperties(subcomponent: Subcomponent): UpdateOtherCssProperties {
    const { customCss, customFeatures } = subcomponent;
    return {
      cssProperty: 'left',
      customCss,
      customFeatures,
      isScaleNegativeToPositive: true,
      divisor: LAYER_SECTION_DIVISOR,
    };
  }

  // this is no longer used, but is kept as an exemplar for future cssProperty interconnected settings
  private static setInterconnectedSettings(component: WorkshopComponent): void {
    component.interconnectedSettings = [{
      updateOtherCssProperties: component.baseSubcomponent.subcomponentSpecificSettings[WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_WIDTH][SETTING_NAMES.WIDTH].updateOtherCssProperties,
      dependantChildrenTypes: new Set([SUBCOMPONENT_TYPES.IMAGE, SUBCOMPONENT_TYPES.BUTTON]),
      updateOtherCssPropertiesObjGenerator: CardBaseSpecificSettings.getLeftPositionProperties,
    }];
  }

  public static set(component: WorkshopComponent): void {
    CardBaseSpecificSettings.setSettingsOnBaseSubcomponent(component);
    // CardBaseSpecificSettings.setInterconnectedSettings(component);
  }
}
