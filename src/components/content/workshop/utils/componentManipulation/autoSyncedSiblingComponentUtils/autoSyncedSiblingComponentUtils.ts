import { SiblingChildComponentsAutoSynced, SiblingComponentTypes } from '../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { SyncChildComponentUtils } from '../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { CustomDynamicProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../consts/horizontalAlignmentSections';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import JSONUtils from '../../generic/jsonUtils';

type TraverseAllSiblingComponentsCallback = (component: WorkshopComponent, siblingComponentTypes: SiblingComponentTypes, componentType?: COMPONENT_TYPES) => void;

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

  public static getParentLayerSiblingChildComponentsAutoSyncedObject(component: WorkshopComponent): SiblingChildComponentsAutoSynced {
    return component.parentLayer?.subcomponent.seedComponent.sync.siblingChildComponentsAutoSynced;
  }

  private static traverseAllSiblingComponents(callback: TraverseAllSiblingComponentsCallback, inSyncComponent: WorkshopComponent,
      siblingComponentTypes: SiblingComponentTypes, componentType?: COMPONENT_TYPES,): void {
    const { alignmentSectionToComponents } = inSyncComponent.parentLayer;
    Object.keys(alignmentSectionToComponents).forEach((alignmentSection: HORIZONTAL_ALIGNMENT_SECTIONS) => {
      alignmentSectionToComponents[alignmentSection].forEach((component) => {
        callback(component, siblingComponentTypes, componentType);
      });
    });
  }

  private static copySiblingComponentSyncableTraversalCallback(targetComponent: WorkshopComponent,
      siblingComponentTypes: SiblingComponentTypes): void {
    AutoSyncedSiblingComponentUtils.copySiblingCustomDynamicProperties(
      targetComponent.baseSubcomponent, siblingComponentTypes[targetComponent.type].customDynamicProperties);
  }

  private static removeAutoSyncedSiblingSyncReferencesAndResyncTogether(component: WorkshopComponent,
      siblingComponentTypes: SiblingComponentTypes): void {
    component.sync.componentThisIsSyncedTo.sync.componentsSyncedToThis.delete(component);
    component.sync.componentThisIsSyncedTo = null;
    SyncChildComponentUtils.callFuncOnSyncableComponents(AutoSyncedSiblingComponentUtils.copySiblingComponentSyncableTraversalCallback,
      component, siblingComponentTypes);
    component.sync.syncExecutables?.off?.(component, true);
  }

  private static dereferenceAllSiblingComponentTypes(siblingComponentTypes: SiblingComponentTypes): void {
    Object.keys(siblingComponentTypes).forEach((componentType: COMPONENT_TYPES) => {
      const { customDynamicProperties } = siblingComponentTypes[componentType];
      SyncChildComponentUtils.dereferenceSubcomponent(customDynamicProperties);
    });
  }

  public static dereferenceAllChildComponentsAndResyncTogether(inSyncComponent: WorkshopComponent,
      siblingComponentTypes: SiblingComponentTypes): void {
    AutoSyncedSiblingComponentUtils.dereferenceAllSiblingComponentTypes(siblingComponentTypes);
    AutoSyncedSiblingComponentUtils.traverseAllSiblingComponents(AutoSyncedSiblingComponentUtils.removeAutoSyncedSiblingSyncReferencesAndResyncTogether,
      inSyncComponent, siblingComponentTypes);
  }

  private static resyncSpecificChildComponentTypesTogether(component: WorkshopComponent,
      siblingComponentTypes: SiblingComponentTypes, componentType: COMPONENT_TYPES): void {
    const { customDynamicProperties } = siblingComponentTypes[componentType];
    if (component.sync.syncables.onSyncComponents.uniqueComponents[componentType]) {
      const targetComponent = component.sync.syncables.onSyncComponents.uniqueComponents[componentType];
      AutoSyncedSiblingComponentUtils.copySiblingCustomDynamicProperties(targetComponent.baseSubcomponent, customDynamicProperties);
    }
  }

  public static dereferenceSpecificChildComponentTypeAndResyncTogether(inSyncComponent: WorkshopComponent,
      siblingComponentTypes: SiblingComponentTypes, componentType: COMPONENT_TYPES): void {
    const { customDynamicProperties } = siblingComponentTypes[componentType];
    SyncChildComponentUtils.dereferenceSubcomponent(customDynamicProperties);
    AutoSyncedSiblingComponentUtils.traverseAllSiblingComponents(AutoSyncedSiblingComponentUtils.resyncSpecificChildComponentTypesTogether,
      inSyncComponent, siblingComponentTypes, componentType);
  }
}
