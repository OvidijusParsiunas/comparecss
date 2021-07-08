import { NestedComponent, SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import JSONManipulation from '../../../../../../services/workshop/jsonManipulation';

export class CopySubcomponents {

  private static copyInSyncSubcomponent(nestedComponent: NestedComponent, newSubcomponent: SubcomponentProperties,
      subcomponentBeingCopied: SubcomponentProperties): void {
    if (newSubcomponent.nestedComponent) {
      newSubcomponent.nestedComponent.inSync = true;
      newSubcomponent.nestedComponent.ref.componentStatus = nestedComponent.ref.componentStatus;
    }
    newSubcomponent.customCss = subcomponentBeingCopied.customCss;
    newSubcomponent.customFeatures = subcomponentBeingCopied.customFeatures;
    newSubcomponent.defaultCss = JSONManipulation.deepCopy(subcomponentBeingCopied.defaultCss);
    newSubcomponent.defaultCustomFeatures = JSONManipulation.deepCopy(subcomponentBeingCopied.defaultCustomFeatures);
  }

  private static copySubcomponentProperties(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    newSubcomponent.customCss = JSONManipulation.deepCopy(subcomponentBeingCopied.customCss);
    newSubcomponent.customFeatures = JSONManipulation.deepCopy(subcomponentBeingCopied.customFeatures);
    newSubcomponent.customStaticFeatures = JSONManipulation.deepCopy(subcomponentBeingCopied.customStaticFeatures);
    newSubcomponent.defaultCss = JSONManipulation.deepCopy(subcomponentBeingCopied.customCss);
    newSubcomponent.defaultCustomFeatures = JSONManipulation.deepCopy(subcomponentBeingCopied.customFeatures);
    newSubcomponent.defaultCustomStaticFeatures = JSONManipulation.deepCopy(subcomponentBeingCopied.customStaticFeatures);
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

  public static copyBaseSubcomponent(newSubcomponent: SubcomponentProperties, copiedSubcomponent: SubcomponentProperties): void {
    if (copiedSubcomponent.nestedComponent?.inSync) {
      CopySubcomponents.copyInSyncSubcomponent(copiedSubcomponent.nestedComponent, newSubcomponent, copiedSubcomponent);
    } else {
      CopySubcomponents.copySubcomponentProperties(newSubcomponent, copiedSubcomponent);
    }
  }
}
