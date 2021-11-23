import { Subcomponent } from '../../../../../../../interfaces/workshopComponent';
import SharedUtils from '../../utils/sharedUtils';

export default class GeneralUtils {

  public static getTriggeredOptionName(subcomponent: Subcomponent, settingSpec: any): string {
    const { customFeatureObjectKeys, cssProperty } = settingSpec;
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    return customFeatureObjectKeys
      ? SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponent[customFeatureObjectKeys[0]])
      : customCss[activeCssPseudoClassesDropdownItem][cssProperty];
  }
}
