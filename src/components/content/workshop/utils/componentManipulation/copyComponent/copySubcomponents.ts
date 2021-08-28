import { CustomCss, CustomFeatures, CustomStaticFeatures, SeedComponent, SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CoreSubcomponentRefsUtils } from '../coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import JSONUtils from '../../generic/jsonUtils';

type CopyableSubcomponentProperties = CustomCss|CustomFeatures|CustomStaticFeatures;

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

  private static copyInSyncSubcomponent(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    if (newSubcomponent.seedComponent) {
      const copiedSeedComponentRef = subcomponentBeingCopied.seedComponent.ref;
      newSubcomponent.seedComponent.inSync = copiedSeedComponentRef.containerComponent || copiedSeedComponentRef;
      newSubcomponent.seedComponent.ref.componentStatus = copiedSeedComponentRef.componentStatus;
    }
    newSubcomponent.customCss = subcomponentBeingCopied.customCss;
    newSubcomponent.customFeatures = subcomponentBeingCopied.customFeatures;
    CopySubcomponents.copyProperties(newSubcomponent.defaultCss, subcomponentBeingCopied.defaultCss);
    CopySubcomponents.copyProperties(newSubcomponent.defaultCustomFeatures, subcomponentBeingCopied.defaultCustomFeatures);
  }

  private static copySubcomponentProperties(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    CopySubcomponents.copyProperties(newSubcomponent.customCss, subcomponentBeingCopied.customCss);
    CopySubcomponents.copyProperties(newSubcomponent.defaultCss, subcomponentBeingCopied.defaultCss);
    CopySubcomponents.copyProperties(newSubcomponent.customFeatures, subcomponentBeingCopied.customFeatures);
    CopySubcomponents.copyProperties(newSubcomponent.defaultCustomFeatures, subcomponentBeingCopied.defaultCustomFeatures);
    CopySubcomponents.copyProperties(newSubcomponent.customStaticFeatures, subcomponentBeingCopied.customStaticFeatures);
    CopySubcomponents.copyProperties(newSubcomponent.defaultCustomStaticFeatures, subcomponentBeingCopied.defaultCustomStaticFeatures);
  }

  private static copyExistingSubcomponentProperties(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    if (!subcomponentBeingCopied.baseSubcomponentRef && subcomponentBeingCopied.seedComponent?.inSync) {
      CopySubcomponents.copyInSyncSubcomponent(newSubcomponent, subcomponentBeingCopied);
    } else {
      CopySubcomponents.copySubcomponentProperties(newSubcomponent, subcomponentBeingCopied); 
    }
  }

  public static copyComponentSubcomponents(componentBeingCopied: WorkshopComponent, newChildComponent: WorkshopComponent): void {
    CoreSubcomponentRefsUtils.getActiveRefKeys(newChildComponent.coreSubcomponentRefs).forEach((coreSubcomponentType) => {
      const newSubcomponent = newChildComponent.coreSubcomponentRefs[coreSubcomponentType];
      const subcomponentBeingCopied = componentBeingCopied.coreSubcomponentRefs[coreSubcomponentType];
      CopySubcomponents.copyExistingSubcomponentProperties(newSubcomponent, subcomponentBeingCopied);
    });
  }

  public static copyBaseSubcomponent(newComponent: WorkshopComponent, copiedComponent: WorkshopComponent): void {
    const newBaseSubcomponent = newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const copiedBaseSubcomponent = copiedComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    if (copiedBaseSubcomponent.seedComponent?.inSync) {
      CopySubcomponents.copyInSyncSubcomponent(newBaseSubcomponent, copiedBaseSubcomponent);
    } else {
      CopySubcomponents.copySubcomponentProperties(newBaseSubcomponent, copiedBaseSubcomponent);
    }
  }
}
