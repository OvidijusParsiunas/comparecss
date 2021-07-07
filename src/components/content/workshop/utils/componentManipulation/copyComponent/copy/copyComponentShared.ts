import { NestedComponent, SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import JSONManipulation from '../../../../../../../services/workshop/jsonManipulation';

export class CopyComponentShared {

  protected static copyInSyncSubcomponent(nestedComponent: NestedComponent, newSubcomponent: SubcomponentProperties,
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

  protected static copySubcomponentProperties(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    newSubcomponent.customCss = JSONManipulation.deepCopy(subcomponentBeingCopied.customCss);
    newSubcomponent.customFeatures = JSONManipulation.deepCopy(subcomponentBeingCopied.customFeatures);
    newSubcomponent.customStaticFeatures = JSONManipulation.deepCopy(subcomponentBeingCopied.customStaticFeatures);
    newSubcomponent.defaultCss = JSONManipulation.deepCopy(subcomponentBeingCopied.customCss);
    newSubcomponent.defaultCustomFeatures = JSONManipulation.deepCopy(subcomponentBeingCopied.customFeatures);
    newSubcomponent.defaultCustomStaticFeatures = JSONManipulation.deepCopy(subcomponentBeingCopied.customStaticFeatures);
  }
}