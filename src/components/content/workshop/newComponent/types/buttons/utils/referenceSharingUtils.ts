import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { Subcomponents } from '../../../../../../../interfaces/workshopComponent';

export default class ReferenceSharingUtils {

  private static createDefaultButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
    return new Set([JAVASCRIPT_CLASSES.RIPPLES])
  }

  public static appendJsClassesRefToAllSubcomponents(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    const baseSubcomponent = subcomponents[coreSubcomponentNames.base];
    const jsClasses = baseSubcomponent.customFeatures && baseSubcomponent.customFeatures.jsClasses
      ? baseSubcomponent.customFeatures.jsClasses : ReferenceSharingUtils.createDefaultButtonJsClasses();
    Object.keys(coreSubcomponentNames).forEach((subcomponentName) => {
      const subcomponent = subcomponents[coreSubcomponentNames[subcomponentName]];
      if (!subcomponent.customFeatures) {
        subcomponent.customFeatures = {};
        subcomponent.defaultCustomFeatures = {};
      }
      subcomponent.customFeatures.jsClasses = jsClasses;
      subcomponent.defaultCustomFeatures.jsClasses = new Set(jsClasses);
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
