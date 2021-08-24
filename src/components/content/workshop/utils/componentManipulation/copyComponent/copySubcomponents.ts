import { CustomCss, CustomFeatures, CustomStaticFeatures, SeedComponent, SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CoreSubcomponentRefsUtils } from '../coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
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

  private static copyInSyncSubcomponent(seedComponent: SeedComponent, newSubcomponent: SubcomponentProperties,
      subcomponentBeingCopied: SubcomponentProperties): void {
    if (newSubcomponent.seedComponent) {
      newSubcomponent.seedComponent.inSync = true;
      newSubcomponent.seedComponent.ref.componentStatus = seedComponent.ref.componentStatus;
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
      CopySubcomponents.copyInSyncSubcomponent(subcomponentBeingCopied.seedComponent, newSubcomponent, subcomponentBeingCopied);
    } else {
      CopySubcomponents.copySubcomponentProperties(newSubcomponent, subcomponentBeingCopied); 
    }
  }

  public static copyComponentSubcomponents(componentBeingCopied: WorkshopComponent, newNestedComponent: WorkshopComponent): void {
    CoreSubcomponentRefsUtils.getActiveRefKeys(newNestedComponent.coreSubcomponentRefs).forEach((coreSubcomponentType) => {
      const newSubcomponent = newNestedComponent.coreSubcomponentRefs[coreSubcomponentType];
      const subcomponentBeingCopied = componentBeingCopied.coreSubcomponentRefs[coreSubcomponentType];
      CopySubcomponents.copyExistingSubcomponentProperties(newSubcomponent, subcomponentBeingCopied);
    });
  }

  public static copyBaseSubcomponent(newComponent: WorkshopComponent, copiedComponent: WorkshopComponent): void {
    const newBaseSubcomponent = newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const copiedBaseSubcomponent = copiedComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    if (copiedBaseSubcomponent.seedComponent?.inSync) {
      CopySubcomponents.copyInSyncSubcomponent(copiedBaseSubcomponent.seedComponent, newBaseSubcomponent, copiedBaseSubcomponent);
    } else {
      CopySubcomponents.copySubcomponentProperties(newBaseSubcomponent, copiedBaseSubcomponent);
    }
  }
}
