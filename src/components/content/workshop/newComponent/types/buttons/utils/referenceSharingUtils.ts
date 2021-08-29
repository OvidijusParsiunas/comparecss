import { CoreSubcomponentRefsUtils } from '../../../../utils/componentManipulation/coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { SubcomponentProperties, Subcomponents } from '../../../../../../../interfaces/workshopComponent';
import { CoreSubcomponentRefs } from '../../../../../../../interfaces/coreSubcomponentRefs';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';

export default class ReferenceSharingUtils {

  private static createDefaultButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
    return new Set([JAVASCRIPT_CLASSES.RIPPLES])
  }

  // WORK1 - will need to be called again
  public static appendJsClassesRefToAllSubcomponents(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    const baseSubcomponent = coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const jsClasses = baseSubcomponent.customFeatures && baseSubcomponent.customFeatures.jsClasses
      ? baseSubcomponent.customFeatures.jsClasses : ReferenceSharingUtils.createDefaultButtonJsClasses();
    CoreSubcomponentRefsUtils.getActiveRefKeys(coreSubcomponentRefs).forEach((subcomponentType) => {
      const subcomponent = coreSubcomponentRefs[subcomponentType];
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
