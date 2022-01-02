import { CustomCss, CustomFeatures, CustomStaticFeatures, Subcomponent } from '../../../../../../interfaces/workshopComponent';
import { SyncChildComponentUtils } from '../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { PreventDeepCopy } from '../../../../../../interfaces/preventDeepCopy';
import { CustomFeaturesUtils } from '../utils/customFeaturesUtils';
import JSONUtils from '../../generic/jsonUtils';

type CopyableSubcomponentProperties = CustomCss | CustomFeatures | CustomStaticFeatures;

export class CopySubcomponents {

  private static copyExclusiveProperty(targetCopyableProperties: CopyableSubcomponentProperties,
      copyablePropertiesBeingCopied: CopyableSubcomponentProperties, objectKey: string): void {
    const targetObject = targetCopyableProperties[objectKey];
    const copyableKeys = (targetObject as PreventDeepCopy).preventDeepCopy.copyableKeys;
    const copyableObject = copyablePropertiesBeingCopied[objectKey];
    (copyableKeys || []).forEach((copyableKeys) => {
      if (copyableKeys.value) {
        const customTargetValue = CustomFeaturesUtils.getCustomFeatureValue(copyableKeys.value, copyableObject);
        CustomFeaturesUtils.setCustomFeatureValue(copyableKeys.value.slice(1), targetObject, customTargetValue);
      } else if (copyableKeys.object) {
        // this has never been tested so some recalibration may be requried
        const customTargetObject = CustomFeaturesUtils.getObjectContainingCustomFeature(copyableKeys.object, copyableObject);
        CustomFeaturesUtils.setCustomFeatureValue(copyableKeys.object.slice(1), targetObject, customTargetObject);
      }
    })
  }

  // copying property values instead of the objects containing them because their references are assigned via addUpdateOtherCssProperties method
  // in the InterconnectedSettings class when creating/copying a subcomponent, hence they cannot be directly overwritten
  private static copyProperties(targetCopyableProperties: CopyableSubcomponentProperties = {},
      copyablePropertiesBeingCopied: CopyableSubcomponentProperties = {}): void {
    Object.keys(targetCopyableProperties).forEach((objectKey) => {
      if (!copyablePropertiesBeingCopied[objectKey]) return;
      if ((copyablePropertiesBeingCopied[objectKey] as PreventDeepCopy).preventDeepCopy) {
        CopySubcomponents.copyExclusiveProperty(targetCopyableProperties, copyablePropertiesBeingCopied, objectKey);
      } else {
        targetCopyableProperties[objectKey] = JSONUtils.deepCopy(copyablePropertiesBeingCopied[objectKey]);
      }
    });
  }

  private static copyStaticAndDefaultProperties(newSubcomponent: Subcomponent, subcomponentBeingCopied: Subcomponent): void {
    CopySubcomponents.copyProperties(newSubcomponent.customStaticFeatures, subcomponentBeingCopied.customStaticFeatures);
    CopySubcomponents.copyProperties(newSubcomponent.defaultCss, subcomponentBeingCopied.defaultCss);
    CopySubcomponents.copyProperties(newSubcomponent.defaultCustomFeatures, subcomponentBeingCopied.defaultCustomFeatures);
    CopySubcomponents.copyProperties(newSubcomponent.defaultCustomStaticFeatures, subcomponentBeingCopied.defaultCustomStaticFeatures);
  }

  private static copySubcomponentProperties(newSubcomponent: Subcomponent, subcomponentBeingCopied: Subcomponent): void {
    CopySubcomponents.copyProperties(newSubcomponent.customCss, subcomponentBeingCopied.customCss);
    CopySubcomponents.copyProperties(newSubcomponent.customFeatures, subcomponentBeingCopied.customFeatures);
    CopySubcomponents.copyStaticAndDefaultProperties(newSubcomponent, subcomponentBeingCopied);
  }

  private static copySyncedSubcomponentProperties(newSubcomponent: Subcomponent, subcomponentBeingCopied: Subcomponent): void {
    newSubcomponent.customCss = subcomponentBeingCopied.customCss;
    newSubcomponent.customFeatures = subcomponentBeingCopied.customFeatures;
    CopySubcomponents.copyStaticAndDefaultProperties(newSubcomponent, subcomponentBeingCopied);
  }

  private static setInSyncComponent(newSubcomponent: Subcomponent, subcomponentBeingCopied: Subcomponent): void {
    const originalComponentThisIsSyncedTo = subcomponentBeingCopied.seedComponent.sync.componentThisIsSyncedTo;
    newSubcomponent.seedComponent.sync.componentThisIsSyncedTo = originalComponentThisIsSyncedTo;
    newSubcomponent.seedComponent.componentStatus = originalComponentThisIsSyncedTo.componentStatus;
    originalComponentThisIsSyncedTo.sync.componentsSyncedToThis.add(newSubcomponent.seedComponent);
  }

  private static copySyncedComponent(newSubcomponent: Subcomponent, subcomponentBeingCopied: Subcomponent): void {
    // if the synced component is the seed - overwrite its sync property values
    if (subcomponentBeingCopied.seedComponent.sync.componentThisIsSyncedTo) CopySubcomponents.setInSyncComponent(newSubcomponent, subcomponentBeingCopied);
    CopySubcomponents.copySyncedSubcomponentProperties(newSubcomponent, subcomponentBeingCopied);
  }

  public static copy(newSubcomponent: Subcomponent, subcomponentBeingCopied: Subcomponent): void {
    const inSyncComponent = SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(subcomponentBeingCopied.seedComponent);
    if (inSyncComponent) {
      CopySubcomponents.copySyncedComponent(newSubcomponent, subcomponentBeingCopied);
    } else {
      CopySubcomponents.copySubcomponentProperties(newSubcomponent, subcomponentBeingCopied); 
    }
  }
}
