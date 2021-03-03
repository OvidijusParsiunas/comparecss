import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import SharedUtils from './sharedUtils';

export default class ActionsDropdownUtils {
  
  // potential race condition with border setting where range sets the select value and select may set it to something incorrect
  public static updateSettings(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, customCssActiveMode } = subcomponentProperties;
    const { cssProperty } = settingToBeUpdatedSpec;
    if (cssProperty && !customCss[customCssActiveMode][cssProperty]) {
      settingToBeUpdatedSpec.tempCustomCssObject = {
        [cssProperty]: SharedUtils.getActiveModeCssPropertyValue(customCss, customCssActiveMode, cssProperty) };
    }
  }
}
