import { TraverseComponentViaPreviewStructureParentFirst } from '../../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { SubcomponentPreviewTraversalState } from '../../../../../../../interfaces/componentTraversal';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class JsClassesUtils {

  private static assign(componentTraversalState: SubcomponentPreviewTraversalState): SubcomponentPreviewTraversalState {
    const { subcomponentProperties } = componentTraversalState;
    const jsClasses = this as any as Set<JAVASCRIPT_CLASSES>;
    if (!subcomponentProperties.customFeatures) {
      subcomponentProperties.customFeatures = {};
      subcomponentProperties.defaultCustomFeatures = {};
    }
    subcomponentProperties.customFeatures.jsClasses = jsClasses;
    subcomponentProperties.defaultCustomFeatures.jsClasses = new Set(jsClasses);
    return componentTraversalState;
  }

  public static assignJsClassesRefToAllSubcomponents(component: WorkshopComponent): void {
    const baseSubcomponent = component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const defaultJsClasses = this as any as Set<JAVASCRIPT_CLASSES>;
    const jsClasses = baseSubcomponent.customFeatures.jsClasses || defaultJsClasses;
    TraverseComponentViaPreviewStructureParentFirst.traverseUsingComponent(
      JsClassesUtils.assign.bind(jsClasses), component);
  }
}
