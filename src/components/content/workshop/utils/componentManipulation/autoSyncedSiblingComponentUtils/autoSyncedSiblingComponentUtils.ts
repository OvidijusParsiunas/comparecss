import { SiblingChildComponentsAutoSynced, SiblingComponentTypes } from '../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { CustomDynamicProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import JSONUtils from '../../generic/jsonUtils';

export class AutoSyncedSiblingComponentUtils {

  public static copySiblingCustomDynamicProperties(targetProperties: CustomDynamicProperties,
      siblingroperties: CustomDynamicProperties, withRefs = true): void {
    const { customCss, defaultCss, customFeatures, defaultCustomFeatures } = siblingroperties;
    if (withRefs) {
      targetProperties.customCss = customCss;
      targetProperties.defaultCss = defaultCss;
      targetProperties.customFeatures = customFeatures;
      targetProperties.defaultCustomFeatures = defaultCustomFeatures; 
    } else {
      targetProperties.customCss = JSONUtils.deepCopy(customCss);
      targetProperties.defaultCss = JSONUtils.deepCopy(defaultCss);
      targetProperties.customFeatures = JSONUtils.deepCopy(customFeatures);
      targetProperties.defaultCustomFeatures = JSONUtils.deepCopy(defaultCustomFeatures);  
    }
  }

  public static copySiblingComponentSyncableTraversalCallback(targetComponent: WorkshopComponent,
      siblingComponentTypes: SiblingComponentTypes): void {
    AutoSyncedSiblingComponentUtils.copySiblingCustomDynamicProperties(
      targetComponent.baseSubcomponent, siblingComponentTypes[targetComponent.type].customDynamicProperties);
  }

  public static getParentLayerSiblingChildComponentsAutoSyncedObject(component: WorkshopComponent): SiblingChildComponentsAutoSynced {
    return component.parentLayer.subcomponent.seedComponent.sync.siblingChildComponentsAutoSynced;
  }
}
