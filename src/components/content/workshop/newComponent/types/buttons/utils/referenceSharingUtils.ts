import { SubcomponentProperties, Subcomponents } from '../../../../../../../interfaces/workshopComponent';
import { CoreSubcomponentRefs } from '../../../../../../../interfaces/coreSubcomponentRefs';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';

export default class ReferenceSharingUtils {

  private static createDefaultButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
    return new Set([JAVASCRIPT_CLASSES.RIPPLES])
  }

  public static appendJsClassesRefToAllSubcomponents(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    const baseSubcomponent = coreSubcomponentRefs.base;
    const jsClasses = baseSubcomponent.customFeatures && baseSubcomponent.customFeatures.jsClasses
      ? baseSubcomponent.customFeatures.jsClasses : ReferenceSharingUtils.createDefaultButtonJsClasses();
    Object.keys(coreSubcomponentRefs).filter((coreSubcomponentKey) => coreSubcomponentRefs[coreSubcomponentKey]).forEach((coreName) => {
      const subcomponent = coreSubcomponentRefs[coreName];
      if (!subcomponent.customFeatures) {
        subcomponent.customFeatures = {};
        subcomponent.defaultCustomFeatures = {};
      }
      subcomponent.customFeatures.jsClasses = jsClasses;
      subcomponent.defaultCustomFeatures.jsClasses = new Set(jsClasses);
    });
  }

  public static appendBaseSubcomponentRefToAllChildSubcomponents(baseSubcomponent: SubcomponentProperties, subcomponents: Subcomponents): void {
    Object.keys(subcomponents).forEach((subcomponentName) => {
      const subcomponent = subcomponents[subcomponentName];
      if (subcomponent !== baseSubcomponent) {
        subcomponent.baseSubcomponentRef = baseSubcomponent;
      }
    });
  }
}
