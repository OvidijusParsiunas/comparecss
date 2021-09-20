import { TraverseComponentViaPreviewStructureParentFirst } from '../../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SubcomponentPreviewTraversalState } from '../../../../../../../interfaces/componentTraversal';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';

export class JsClassesUtils {

  private static addJsClassesObjects(subcomponentProperties: SubcomponentProperties, overwriteDefaultProperties: boolean,
      jsClasses: Set<JAVASCRIPT_CLASSES>): void {
    subcomponentProperties.customFeatures.jsClasses = jsClasses;
    if (overwriteDefaultProperties) subcomponentProperties.defaultCustomFeatures.jsClasses = new Set(jsClasses);
  }

  private static addCustomFeaturesObjects(subcomponentProperties: SubcomponentProperties, overwriteDefaultProperties: boolean): void {
    subcomponentProperties.customFeatures = {};
    if (overwriteDefaultProperties) subcomponentProperties.defaultCustomFeatures = {};
  }

  private static assign(jsClasses: Set<JAVASCRIPT_CLASSES>, overwriteDefaultProperties: boolean,
      componentTraversalState: SubcomponentPreviewTraversalState): SubcomponentPreviewTraversalState {
    const { subcomponentProperties } = componentTraversalState;
    if (!subcomponentProperties.customFeatures) {
      JsClassesUtils.addCustomFeaturesObjects(subcomponentProperties, overwriteDefaultProperties);
    }
    JsClassesUtils.addJsClassesObjects(subcomponentProperties, overwriteDefaultProperties, jsClasses);
    return componentTraversalState;
  }

  public static assignJsClassesRefToAllSubcomponents(component: WorkshopComponent, overwriteDefaultProperties = true): void {
    const baseSubcomponent = component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const defaultJsClasses = this as any as Set<JAVASCRIPT_CLASSES>;
    const jsClasses = baseSubcomponent.customFeatures.jsClasses || defaultJsClasses;
    TraverseComponentViaPreviewStructureParentFirst.traverseUsingComponent(
      JsClassesUtils.assign.bind(this, jsClasses, overwriteDefaultProperties), component);
  }
}
