import { CustomFeatures } from '../../../../../../../interfaces/workshopComponent';

export default class CustomFeaturesUtils {

  private static get(customFeatureObjectKeys: string[], customFeaturesObject: unknown): unknown {
    if (customFeatureObjectKeys.length === 1) return customFeaturesObject;
    return CustomFeaturesUtils.get(customFeatureObjectKeys.slice(1), customFeaturesObject[customFeatureObjectKeys[0]])
  }

  public static getObjectContainingActiveOption(customFeatureObjectKeys: string[], customFeatures: CustomFeatures): unknown {
    return CustomFeaturesUtils.get(customFeatureObjectKeys.slice(1), customFeatures);
  }
}
