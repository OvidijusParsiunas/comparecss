import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { Subcomponents } from '../../../../../../../interfaces/workshopComponent';

export default class ReferenceSharingUtils {

  private static createDefaultButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
    return new Set([JAVASCRIPT_CLASSES.RIPPLES])
  }

  public static appendJsClassesRefToAllSubcomponents(subcomponents: Subcomponents, subcomponentNames: CustomSubcomponentNames): void { 
    const subcomponentNameKeys = Object.keys(subcomponentNames);
    const initialSubcomponentName = subcomponents[subcomponentNames[subcomponentNameKeys[0]]];
    const jsClasses =initialSubcomponentName.customFeatures && initialSubcomponentName.customFeatures.jsClasses
      ? initialSubcomponentName.customFeatures.jsClasses : ReferenceSharingUtils.createDefaultButtonJsClasses();
    subcomponentNameKeys.forEach((subcomponentName) => {
      if (!subcomponents[subcomponentNames[subcomponentName]].customFeatures) {
        subcomponents[subcomponentNames[subcomponentName]].customFeatures = {};
        subcomponents[subcomponentNames[subcomponentName]].defaultCustomFeatures = {};
      }
      subcomponents[subcomponentNames[subcomponentName]].customFeatures.jsClasses = jsClasses;
      subcomponents[subcomponentNames[subcomponentName]].defaultCustomFeatures.jsClasses = new Set(jsClasses);
    });
  };

  public static appendBaseSubcomponentRefToAllChildSubcomponents(subcomponents: Subcomponents, subcomponentNames: CustomSubcomponentNames): void {
    const baseSubcomponent = subcomponents[subcomponentNames.base];
    Object.keys(subcomponents).forEach((subcomponentName) => {
      if (subcomponentName !== subcomponentNames.base) {
        subcomponents[subcomponentName].baseSubcomponentRef = baseSubcomponent;
      }
    });
  }
}
