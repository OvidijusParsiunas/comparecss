import { CustomFeaturesUtils } from '../../../../utils/componentManipulation/utils/customFeaturesUtils';
import { Subcomponent } from '../../../../../../../interfaces/workshopComponent';

export default class GeneralUtils {

  public static getTriggeredOptionName(subcomponent: Subcomponent, settingSpec: any): string {
    const { customFeatureObjectKeys, cssProperty } = settingSpec;
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    return customFeatureObjectKeys
      ? CustomFeaturesUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponent[customFeatureObjectKeys[0]])
      : customCss[activeCssPseudoClassesDropdownItem][cssProperty];
  }
}
