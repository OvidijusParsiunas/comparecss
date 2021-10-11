import { CustomCss, CustomFeatures, CustomStaticFeatures, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import JSONUtils from '../../generic/jsonUtils';

type CopyableSubcomponentProperties = CustomCss | CustomFeatures | CustomStaticFeatures;

export class CopySubcomponents {

  // copying property values instead of the objects containing them because their references are assigned via addUpdateOtherCssProperties method
  // in the InterconnectedSettings class when creating/copying a subcomponent, hence they cannot be directly overwritten
  private static copyProperties(newCustomCss: CopyableSubcomponentProperties = {}, customCssBeingCopied: CopyableSubcomponentProperties = {}): void {
    Object.keys(newCustomCss).forEach((pseudoCssClass) => {
      newCustomCss[pseudoCssClass] = JSONUtils.deepCopy(customCssBeingCopied[pseudoCssClass]);
    });
  }

  private static copyStaticAndDefaultProperties(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    CopySubcomponents.copyProperties(newSubcomponent.customStaticFeatures, subcomponentBeingCopied.customStaticFeatures);
    CopySubcomponents.copyProperties(newSubcomponent.defaultCss, subcomponentBeingCopied.defaultCss);
    CopySubcomponents.copyProperties(newSubcomponent.defaultCustomFeatures, subcomponentBeingCopied.defaultCustomFeatures);
    CopySubcomponents.copyProperties(newSubcomponent.defaultCustomStaticFeatures, subcomponentBeingCopied.defaultCustomStaticFeatures);
  }

  private static copySubcomponentProperties(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    CopySubcomponents.copyProperties(newSubcomponent.customCss, subcomponentBeingCopied.customCss);
    CopySubcomponents.copyProperties(newSubcomponent.customFeatures, subcomponentBeingCopied.customFeatures);
    CopySubcomponents.copyStaticAndDefaultProperties(newSubcomponent, subcomponentBeingCopied);
  }

  private static copySyncedSubcomponentProperties(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    newSubcomponent.customCss = subcomponentBeingCopied.customCss;
    newSubcomponent.customFeatures = subcomponentBeingCopied.customFeatures;
    CopySubcomponents.copyStaticAndDefaultProperties(newSubcomponent, subcomponentBeingCopied);
  }

  private static setInSyncComponent(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    const originalComponentThisIsSyncedTo = subcomponentBeingCopied.seedComponent.sync.componentThisIsSyncedTo;
    newSubcomponent.seedComponent.sync.componentThisIsSyncedTo = originalComponentThisIsSyncedTo;
    newSubcomponent.seedComponent.componentStatus = originalComponentThisIsSyncedTo.componentStatus;
    originalComponentThisIsSyncedTo.sync.componentsSyncedToThis.add(newSubcomponent.seedComponent);
  }

  private static copySyncedComponent(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties, isComponentInSync: number): void {
    if (isComponentInSync === 0) CopySubcomponents.setInSyncComponent(newSubcomponent, subcomponentBeingCopied);
    CopySubcomponents.copySyncedSubcomponentProperties(newSubcomponent, subcomponentBeingCopied);
  }

  public static copy(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    const isComponentInSync = subcomponentBeingCopied.seedComponent.sync.syncComponentReferences
      .findIndex((reference) => reference.sync.componentThisIsSyncedTo);
    if (isComponentInSync > -1) {
      CopySubcomponents.copySyncedComponent(newSubcomponent, subcomponentBeingCopied, isComponentInSync);
    }else {
      CopySubcomponents.copySubcomponentProperties(newSubcomponent, subcomponentBeingCopied); 
    }
  }
}
