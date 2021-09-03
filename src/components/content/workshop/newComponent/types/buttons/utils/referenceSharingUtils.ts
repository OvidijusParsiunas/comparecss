import { CoreSubcomponentRefsUtils } from '../../../../utils/componentManipulation/coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { CoreSubcomponentRefs } from '../../../../../../../interfaces/coreSubcomponentRefs';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';

export default class ReferenceSharingUtils {

  private static createDefaultButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
    return new Set([JAVASCRIPT_CLASSES.RIPPLES])
  }

  public static appendJsClassesRefToAllSubcomponents(coreSubcomponentRefs: CoreSubcomponentRefs,
      overrideJsClasses?: Set<JAVASCRIPT_CLASSES>): void {
    const baseSubcomponent = coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const jsClasses = baseSubcomponent.customFeatures && baseSubcomponent.customFeatures.jsClasses
      ? baseSubcomponent.customFeatures.jsClasses : ReferenceSharingUtils.createDefaultButtonJsClasses();
    CoreSubcomponentRefsUtils.getActiveRefKeys(coreSubcomponentRefs).forEach((subcomponentType) => {
      const subcomponent = coreSubcomponentRefs[subcomponentType];
      if (!subcomponent.customFeatures) {
        subcomponent.customFeatures = {};
        subcomponent.defaultCustomFeatures = {};
      }
      subcomponent.customFeatures.jsClasses = overrideJsClasses || jsClasses;
      subcomponent.defaultCustomFeatures.jsClasses = new Set(overrideJsClasses || jsClasses);
    });
  }
}
