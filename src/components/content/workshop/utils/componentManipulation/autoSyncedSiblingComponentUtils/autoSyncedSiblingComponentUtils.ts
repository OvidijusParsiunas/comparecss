import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import JSONUtils from '../../generic/jsonUtils';

export class AutoSyncedSiblingComponentUtils {

  public static copySiblingSubcomponent(siblingSubcomponentProperties: SubcomponentProperties,
      newSubcomponentProperties: SubcomponentProperties, withRefs = true): void {
    const { customCss, defaultCss, customFeatures, defaultCustomFeatures } = siblingSubcomponentProperties;
    if (withRefs) {
      newSubcomponentProperties.customCss = customCss;
      newSubcomponentProperties.defaultCss = defaultCss;
      newSubcomponentProperties.customFeatures = customFeatures;
      newSubcomponentProperties.defaultCustomFeatures = defaultCustomFeatures; 
    } else {
      newSubcomponentProperties.customCss = JSONUtils.deepCopy(customCss);
      newSubcomponentProperties.defaultCss = JSONUtils.deepCopy(defaultCss);
      newSubcomponentProperties.customFeatures = JSONUtils.deepCopy(customFeatures);
      newSubcomponentProperties.defaultCustomFeatures = JSONUtils.deepCopy(defaultCustomFeatures);  
    }
  }
}
