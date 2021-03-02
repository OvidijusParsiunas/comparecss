import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { CustomFeatures } from '../../../../../../../interfaces/workshopComponent';

export default class CustomFeaturesUtils {

  public static getObjectContainingActiveOption(customFeatures: CustomFeatures, customFeatureObjectKeys: string[]): WorkshopComponentCss {
    return (customFeatureObjectKeys[2] && customFeatures[customFeatureObjectKeys[0]][customFeatureObjectKeys[1]])
      || (customFeatureObjectKeys[1] && customFeatures[customFeatureObjectKeys[0]]);
  }
}
