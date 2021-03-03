import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import SharedUtils from './sharedUtils';

export default class ActionsDropdownUtils {
  
  public static updateSettings(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, customCssActiveMode } = subcomponentProperties;
    const { cssProperty } = settingToBeUpdatedSpec;
    if (cssProperty && !customCss[customCssActiveMode][cssProperty]) {
      settingToBeUpdatedSpec.tempCustomCssObject = {
        [cssProperty]: SharedUtils.getActiveModeCssPropertyValue(customCss, customCssActiveMode, cssProperty) };
    }
  }
}
