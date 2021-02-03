import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../interfaces/workshopComponent';

export default class SubcomponentSpecificSettingsUtils {
  
  public static generatePartialCssPropertyName(cssPropertyName: string, partialCssPosition: number): string {
    return cssPropertyName + partialCssPosition;
  }

  public static setSubcomponentSpecificSettings(optionType: WORKSHOP_TOOLBAR_OPTION_TYPES,
      subcomponentSpecificSettings: SubcomponentSpecificSettings, settingsOptions: any): void {
    if (subcomponentSpecificSettings && subcomponentSpecificSettings[optionType]) {
      settingsOptions.forEach((setting) => {
        const cssPropertyName = setting.spec.partialCss
          ? SubcomponentSpecificSettingsUtils.generatePartialCssPropertyName(setting.spec.cssProperty, setting.spec.partialCss.position) : setting.spec.cssProperty;
        if (subcomponentSpecificSettings[optionType][cssPropertyName]) {
          setting.spec.scale = subcomponentSpecificSettings[optionType][cssPropertyName].scale;
        }
      });
    }
  }
}
