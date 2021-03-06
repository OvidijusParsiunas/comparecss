import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import SharedUtils from '../../utils/sharedUtils';

export default class GeneralUtils {

  public static getTriggeredOptionName(subcomponentProperties: SubcomponentProperties, settingSpec: any): string {
    const { customFeatureObjectKeys, cssProperty } = settingSpec;
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    return customFeatureObjectKeys
      ? SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties[customFeatureObjectKeys[0]])
      : customCss[activeCssPseudoClass][cssProperty];
  }
}
