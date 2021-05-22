import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';

export default class CustomFeaturesUtils {

  public static getObjectContainingActiveOption(subcomponentProperties: SubcomponentProperties, customFeatureObjectKeys: string[]): WorkshopComponentCss {
    return (customFeatureObjectKeys[2] && subcomponentProperties[customFeatureObjectKeys[0]][customFeatureObjectKeys[1]])
      || (customFeatureObjectKeys[1] && subcomponentProperties[customFeatureObjectKeys[0]]);
  }
}
