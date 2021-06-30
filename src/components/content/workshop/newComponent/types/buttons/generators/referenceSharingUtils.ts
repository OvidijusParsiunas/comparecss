import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { Subcomponents } from '../../../../../../../interfaces/workshopComponent';

export default class ReferenceSharingUtils {

  private static createDefaultButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
    return new Set([JAVASCRIPT_CLASSES.RIPPLES])
  }

  public static appendJsClassesRefToAllSubcomponents(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void { 
    const subcomponentNameKeys = Object.keys(coreSubcomponentNames);
    const subcomponentProperties = subcomponents[coreSubcomponentNames[subcomponentNameKeys[0]]];
    const jsClasses = subcomponentProperties.customFeatures && subcomponentProperties.customFeatures.jsClasses
      ? subcomponentProperties.customFeatures.jsClasses : ReferenceSharingUtils.createDefaultButtonJsClasses();
    subcomponentNameKeys.forEach((subcomponentName) => {
      if (!subcomponents[coreSubcomponentNames[subcomponentName]].customFeatures) {
        subcomponents[coreSubcomponentNames[subcomponentName]].customFeatures = {};
        subcomponents[coreSubcomponentNames[subcomponentName]].defaultCustomFeatures = {};
      }
      subcomponents[coreSubcomponentNames[subcomponentName]].customFeatures.jsClasses = jsClasses;
      subcomponents[coreSubcomponentNames[subcomponentName]].defaultCustomFeatures.jsClasses = new Set(jsClasses);
    });
  }

  public static appendBaseSubcomponentRefToAllChildSubcomponents(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    const baseSubcomponent = subcomponents[coreSubcomponentNames.base];
    Object.keys(subcomponents).forEach((subcomponentName) => {
      if (subcomponentName !== coreSubcomponentNames.base) {
        subcomponents[subcomponentName].baseSubcomponentRef = baseSubcomponent;
      }
    });
  }
}
