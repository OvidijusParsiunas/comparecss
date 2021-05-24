import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { CustomFeatures } from '../../../../../../../interfaces/workshopComponent';

export default class CustomFeaturesUtils {

  public static getObjectContainingActiveOption(customFeatureObjectKeys: string[], customFeatures: CustomFeatures): WorkshopComponentCss {
    return (customFeatureObjectKeys[3] && customFeatures[customFeatureObjectKeys[1]][customFeatureObjectKeys[2]])
      || (customFeatureObjectKeys[2] && customFeatures[customFeatureObjectKeys[1]]);
  }
}
