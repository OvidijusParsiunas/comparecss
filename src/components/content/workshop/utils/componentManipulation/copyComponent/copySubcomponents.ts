import { CustomCss, CustomFeatures, CustomStaticFeatures, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { SyncChildComponentUtils } from '../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import JSONUtils from '../../generic/jsonUtils';

type CopyableSubcomponentProperties = CustomCss | CustomFeatures | CustomStaticFeatures;

// current subcomponent copy strategy:
// if a subcomponent has a text or icon subcomponents - the copyable component's properties are copied onto them if that component has these subcomponents
// this similarly works if the copyable component has these subcomponents and the current one doesn't - these properties don't get copied
// if any subcomponent is added or removed - the component remains in sync
export class CopySubcomponents {

  // copying property values instead of the objects containing them because their references are assigned in InterconnectedSettings
  // addUpdateOtherCssProperties method when creating/copying a subcomponent, hence they cannot be directly overwritten
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

  // WORK 2 - refactor this method or other ones as well when copy component logic is complete
  public static copy(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    if (subcomponentBeingCopied.seedComponent.sync.componentThisIsSyncedTo) {
      CopySubcomponents.setInSyncComponent(newSubcomponent, subcomponentBeingCopied);
      CopySubcomponents.copySyncedSubcomponentProperties(newSubcomponent, subcomponentBeingCopied);
    } else if (SyncChildComponentUtils.getInSyncComponent(subcomponentBeingCopied)) {
      CopySubcomponents.copySyncedSubcomponentProperties(newSubcomponent, subcomponentBeingCopied);
    } else {
      CopySubcomponents.copySubcomponentProperties(newSubcomponent, subcomponentBeingCopied); 
    }
  }
}
