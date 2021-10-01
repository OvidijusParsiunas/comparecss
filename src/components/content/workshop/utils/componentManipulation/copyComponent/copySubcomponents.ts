import { CustomCss, CustomFeatures, CustomStaticFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CoreSubcomponentRefsUtils } from '../coreSubcomponentRefs/coreSubcomponentRefsUtils';
import JSONUtils from '../../generic/jsonUtils';

type CopyableSubcomponentProperties = CustomCss | CustomFeatures | CustomStaticFeatures;

// current subcomponent copy strategy:
// if a subcomponent has a text or icon subcomponents - the copyable component's properties are copied onto them if that component has these subcomponents
// this similarly works if the copyable component has these subcomponents and the current one doesn't - these properties don't get copied
// if any subcomponent is added or removed - the component remains in sync and any subcomponents have their own properties
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

  private static copySubcomponentReferenceProperties(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    newSubcomponent.customCss = subcomponentBeingCopied.customCss;
    newSubcomponent.customFeatures = subcomponentBeingCopied.customFeatures;
    CopySubcomponents.copyStaticAndDefaultProperties(newSubcomponent, subcomponentBeingCopied);
  }

  private static setInSyncComponent(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    const copiedSeedComponent = subcomponentBeingCopied.seedComponent;
    newSubcomponent.seedComponent.sync.componentThisIsSyncedTo = copiedSeedComponent;
    newSubcomponent.seedComponent.componentStatus = copiedSeedComponent.componentStatus;
  }

  private static copyExistingSubcomponentProperties(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    if (subcomponentBeingCopied.seedComponent.sync.componentThisIsSyncedTo) {
      CopySubcomponents.setInSyncComponent(newSubcomponent, subcomponentBeingCopied);
      CopySubcomponents.copySubcomponentReferenceProperties(newSubcomponent, subcomponentBeingCopied);
      subcomponentBeingCopied.seedComponent.sync.componentThisIsSyncedTo.sync.componentsSyncedToThis.add(subcomponentBeingCopied.seedComponent);
    } else if (subcomponentBeingCopied.seedComponent.containerComponent.sync.componentThisIsSyncedTo) {
      CopySubcomponents.copySubcomponentReferenceProperties(newSubcomponent, subcomponentBeingCopied);
    } else {
      CopySubcomponents.copySubcomponentProperties(newSubcomponent, subcomponentBeingCopied); 
    }
  }

  public static copyComponentSubcomponents(componentBeingCopied: WorkshopComponent, newChildComponent: WorkshopComponent): void {
    CoreSubcomponentRefsUtils.getActiveRefKeys(newChildComponent.coreSubcomponentRefs).forEach((subcomponentType) => {
      const newSubcomponent = newChildComponent.coreSubcomponentRefs[subcomponentType];
      const subcomponentBeingCopied = componentBeingCopied.coreSubcomponentRefs[subcomponentType];
      CopySubcomponents.copyExistingSubcomponentProperties(newSubcomponent, subcomponentBeingCopied);
    });
  }

  public static copyBaseSubcomponent(newComponent: WorkshopComponent, copiedComponent: WorkshopComponent): void {
    const newBaseSubcomponent = newComponent.baseSubcomponent;
    const copiedBaseSubcomponent = copiedComponent.baseSubcomponent;
    if (copiedBaseSubcomponent.seedComponent?.sync.componentThisIsSyncedTo) {
      CopySubcomponents.setInSyncComponent(newBaseSubcomponent, copiedBaseSubcomponent);
    } else {
      CopySubcomponents.copySubcomponentProperties(newBaseSubcomponent, copiedBaseSubcomponent);
    }
  }
}
