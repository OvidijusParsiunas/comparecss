import { CustomCss, CustomFeatures, CustomStaticFeatures, NestedComponent, SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import JSONManipulation from '../../../../../../services/workshop/jsonManipulation';

type CopyableSubcomponentProperties = CustomCss|CustomFeatures|CustomStaticFeatures;

export class CopySubcomponents {

  // copying property values instead of the objects containing them because their references are assigned in InterconnectedSettings
  // addUpdateOtherCssProperties method when creating/copying a subcomponent, hence they cannot be directly overwritten
  private static copyProperties(newCustomCss: CopyableSubcomponentProperties = {}, customCssBeingCopied: CopyableSubcomponentProperties = {}): void {
    Object.keys(newCustomCss).forEach((pseudoCssClass) => {
      newCustomCss[pseudoCssClass] = JSONManipulation.deepCopy(customCssBeingCopied[pseudoCssClass]);
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
    const newCoreSubcomponentNames = Object.keys(newNestedComponent.coreSubcomponentNames);
    for (let i = 0; i < newCoreSubcomponentNames.length; i += 1) {
      const coreSubcomponent = newCoreSubcomponentNames[i];
      const newSubcomponent = newNestedComponent.subcomponents[newNestedComponent.coreSubcomponentNames[coreSubcomponent]];
      const subcomponentBeingCopied = componentBeingCopied.subcomponents[componentBeingCopied.coreSubcomponentNames[coreSubcomponent]];
      CopySubcomponents.copyExistingSubcomponentProperties(newSubcomponent, subcomponentBeingCopied);
    }
  }

  public static copyBaseSubcomponent(newComponent: WorkshopComponent, copiedComponent: WorkshopComponent): void {
    const newBaseSubcomponent = newComponent.subcomponents[newComponent.coreSubcomponentNames.base];
    const copiedBaseSubcomponent = copiedComponent.subcomponents[copiedComponent.coreSubcomponentNames.base]
    if (copiedBaseSubcomponent.nestedComponent?.inSync) {
      CopySubcomponents.copyInSyncSubcomponent(copiedBaseSubcomponent.nestedComponent, newBaseSubcomponent, copiedBaseSubcomponent);
    } else {
      CopySubcomponents.copySubcomponentProperties(newBaseSubcomponent, copiedBaseSubcomponent);
    }
  }
}
