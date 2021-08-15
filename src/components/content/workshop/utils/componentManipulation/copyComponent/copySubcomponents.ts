import { CustomCss, CustomFeatures, CustomStaticFeatures, NestedComponent, SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import JSONUtils from '../../generic/jsonUtils';

type CopyableSubcomponentProperties = CustomCss|CustomFeatures|CustomStaticFeatures;

export class CopySubcomponents {

  // copying property values instead of the objects containing them because their references are assigned in InterconnectedSettings
  // addUpdateOtherCssProperties method when creating/copying a subcomponent, hence they cannot be directly overwritten
  private static copyProperties(newCustomCss: CopyableSubcomponentProperties = {}, customCssBeingCopied: CopyableSubcomponentProperties = {}): void {
    Object.keys(newCustomCss).forEach((pseudoCssClass) => {
      newCustomCss[pseudoCssClass] = JSONUtils.deepCopy(customCssBeingCopied[pseudoCssClass]);
    });
  }

  private static copyInSyncSubcomponent(nestedComponent: NestedComponent, newSubcomponent: SubcomponentProperties,
      subcomponentBeingCopied: SubcomponentProperties): void {
    if (newSubcomponent.nestedComponent) {
      newSubcomponent.nestedComponent.inSync = true;
      newSubcomponent.nestedComponent.ref.componentStatus = nestedComponent.ref.componentStatus;
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
    if (!subcomponentBeingCopied.baseSubcomponentRef && subcomponentBeingCopied.nestedComponent?.inSync) {
      CopySubcomponents.copyInSyncSubcomponent(subcomponentBeingCopied.nestedComponent, newSubcomponent, subcomponentBeingCopied);
    } else {
      CopySubcomponents.copySubcomponentProperties(newSubcomponent, subcomponentBeingCopied); 
    }
  }

  public static copyComponentSubcomponents(componentBeingCopied: WorkshopComponent, newNestedComponent: WorkshopComponent): void {
    Object.keys(newNestedComponent.coreSubcomponentRefs).filter((coreSubcomponentKey) => newNestedComponent.coreSubcomponentRefs[coreSubcomponentKey]).forEach((coreSubcomponentType) => {
      const newSubcomponent = newNestedComponent.coreSubcomponentRefs[coreSubcomponentType];
      const subcomponentBeingCopied = componentBeingCopied.coreSubcomponentRefs[coreSubcomponentType];
      CopySubcomponents.copyExistingSubcomponentProperties(newSubcomponent, subcomponentBeingCopied);
    });
  }

  public static copyBaseSubcomponent(newComponent: WorkshopComponent, copiedComponent: WorkshopComponent): void {
    const newBaseSubcomponent = newComponent.coreSubcomponentRefs.base;
    const copiedBaseSubcomponent = copiedComponent.coreSubcomponentRefs.base;
    if (copiedBaseSubcomponent.nestedComponent?.inSync) {
      CopySubcomponents.copyInSyncSubcomponent(copiedBaseSubcomponent.nestedComponent, newBaseSubcomponent, copiedBaseSubcomponent);
    } else {
      CopySubcomponents.copySubcomponentProperties(newBaseSubcomponent, copiedBaseSubcomponent);
    }
  }
}
