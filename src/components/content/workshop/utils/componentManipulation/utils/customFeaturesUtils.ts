import { CustomFeatures, CustomStaticFeatures, Subcomponent } from '../../../../../../interfaces/workshopComponent';

export class CustomFeaturesUtils {

  private static getObject(customFeatureObjectKeys: string[], customFeaturesObject: unknown): unknown {
    if (customFeatureObjectKeys.length === 1) return customFeaturesObject;
    return CustomFeaturesUtils.getObject(customFeatureObjectKeys.slice(1), customFeaturesObject[customFeatureObjectKeys[0]])
  }

  public static getObjectContainingCustomFeature(customFeatureObjectKeys: string[], customFeatures: CustomFeatures): unknown {
    return CustomFeaturesUtils.getObject(customFeatureObjectKeys.slice(1), customFeatures);
  }

  private static traverseCustomFeatureValueObject(customFeatureObjectKeys: string[], customFeatures: CustomFeatures|CustomStaticFeatures,
      newValue?: unknown): unknown {
    if (newValue !== undefined) {
      if (customFeatureObjectKeys.length === 1) {
        return customFeatures[customFeatureObjectKeys[0]] = newValue;
      }
    } else {
      if (customFeatureObjectKeys.length === 0) {
        return customFeatures;
      }
    }
    const innerCustomFeaturesObject = customFeatures[customFeatureObjectKeys[0]];
    const newCustomFeatureObjectKeysArray = customFeatureObjectKeys.slice(1, customFeatureObjectKeys.length);
    return CustomFeaturesUtils.traverseCustomFeatureValueObject(newCustomFeatureObjectKeysArray, innerCustomFeaturesObject, newValue);
  }

  public static getCustomFeatureValue(customFeatureObjectKeys: string[], customFeatures: CustomFeatures|CustomStaticFeatures): unknown {
    return CustomFeaturesUtils.traverseCustomFeatureValueObject(customFeatureObjectKeys.slice(1, customFeatureObjectKeys.length), customFeatures);
  }

  public static setCustomFeatureValue(customFeatureObjectKeys: string[], subcomponent: Subcomponent|CustomFeatures, newValue: unknown): void {
    const keys = customFeatureObjectKeys;
    CustomFeaturesUtils.traverseCustomFeatureValueObject(keys.slice(1, keys.length), subcomponent[keys[0]], newValue);
  }
}
