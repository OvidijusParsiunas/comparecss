import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class ButtonGroupSpecificSettings {

  public static readonly BUTTON_GROUP_BASE_GENERIC_COMPONENTS: SubcomponentSpecificSettings = {
    [WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER]: {
      [SETTING_NAMES.COLOR]: {
        updateOtherCssProperties: [{
          cssProperty: 'backgroundColor',
        }],
      },
      [SETTING_NAMES.RADIUS]: {
        // the border radius range should increase with the border width - however this is not happening right now
        // (default behaviour for all components)
        scale: [0, 176],
      },
    },
  };

  private static setSettingsOnBaseSubcomponent(buttonGroupComponent: WorkshopComponent): void {
    const buttonGroupBaseGenericComponents = { ...ButtonGroupSpecificSettings.BUTTON_GROUP_BASE_GENERIC_COMPONENTS };
    buttonGroupBaseGenericComponents[WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER][SETTING_NAMES.COLOR]
      .updateOtherCssProperties[0].customCss = buttonGroupComponent.baseSubcomponent.customCss;
    buttonGroupComponent.baseSubcomponent.subcomponentSpecificSettings = buttonGroupBaseGenericComponents;
  }

  public static set(buttonGroupComponent: WorkshopComponent): void {
    ButtonGroupSpecificSettings.setSettingsOnBaseSubcomponent(buttonGroupComponent);
  }
}
