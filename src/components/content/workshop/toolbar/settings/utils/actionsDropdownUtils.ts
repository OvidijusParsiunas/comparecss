import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import SharedUtils from './sharedUtils';

export default class ActionsDropdownUtils {
  
  // potential race condition with border setting where range sets the select value and select may set it to something incorrect
  public static updateSettings(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    const { cssProperty } = settingToBeUpdatedSpec;
    if (cssProperty && !customCss[activeCustomCssMode][cssProperty]) {
      settingToBeUpdatedSpec.tempCustomCssObject = {
        [cssProperty]: SharedUtils.getActiveModeCssPropertyValue(customCss, activeCustomCssMode, cssProperty) };
    }
  }
}
