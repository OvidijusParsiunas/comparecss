import { TraverseComponentViaPreviewStructureParentFirst } from '../../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { SubcomponentPreviewTraversalState } from '../../../../../../../interfaces/componentTraversal';
import { Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';

export interface JsClassesReferences {
  defaultJsClasses?: Set<JAVASCRIPT_CLASSES>;
  defaultStaticJsClasses?: Set<JAVASCRIPT_CLASSES>;
}

export class JsClassesUtils {

  private static addJsClassesToFeatures(subcomponent: Subcomponent, overwriteDefaultProperties: boolean,
      jsClasses: Set<JAVASCRIPT_CLASSES>, featureType: 'customFeatures'|'customStaticFeatures',
      defaultFeatureType: 'defaultCustomFeatures'|'defaultCustomStaticFeatures'): void {
    if (!subcomponent[featureType]) subcomponent[featureType] = {};
    subcomponent[featureType].jsClasses = jsClasses;
    if (overwriteDefaultProperties) {
      if (!subcomponent[defaultFeatureType]) subcomponent[defaultFeatureType] = {};
      subcomponent[defaultFeatureType].jsClasses = new Set(jsClasses);
    }
  }

  private static addJsClasses(subcomponent: Subcomponent, overwriteDefaultProperties: boolean,
      jsClasses: Set<JAVASCRIPT_CLASSES>, staticJsClasses: Set<JAVASCRIPT_CLASSES>): void {
    if (jsClasses) JsClassesUtils.addJsClassesToFeatures(subcomponent, overwriteDefaultProperties, jsClasses,
      'customFeatures', 'defaultCustomFeatures')
    if (staticJsClasses) JsClassesUtils.addJsClassesToFeatures(subcomponent, overwriteDefaultProperties, staticJsClasses,
      'customStaticFeatures', 'defaultCustomStaticFeatures')
  }

  private static addCustomFeaturesObjects(subcomponent: Subcomponent, overwriteDefaultProperties: boolean): void {
    subcomponent.customFeatures = {};
    if (overwriteDefaultProperties) subcomponent.defaultCustomFeatures = {};
  }

  private static assign(overwriteDefaultProperties: boolean, jsClasses: Set<JAVASCRIPT_CLASSES>, staticJsClasses: Set<JAVASCRIPT_CLASSES>,
      componentTraversalState: SubcomponentPreviewTraversalState): SubcomponentPreviewTraversalState {
    const { subcomponent } = componentTraversalState;
    if (!subcomponent.customFeatures) {
      JsClassesUtils.addCustomFeaturesObjects(subcomponent, overwriteDefaultProperties);
    }
    JsClassesUtils.addJsClasses(subcomponent, overwriteDefaultProperties, jsClasses, staticJsClasses);
    return componentTraversalState;
  }

  public static assignJsClassesRefToAllSubcomponents(component: WorkshopComponent, overwriteDefaultProperties: boolean): void {
    const { defaultJsClasses, defaultStaticJsClasses } = this as any as JsClassesReferences;
    const jsClasses = component.baseSubcomponent.customFeatures.jsClasses || defaultJsClasses;
    const jsStaticClasses = component.baseSubcomponent.customStaticFeatures.jsClasses || defaultStaticJsClasses;
    TraverseComponentViaPreviewStructureParentFirst.traverse(
      JsClassesUtils.assign.bind(this, overwriteDefaultProperties, jsClasses, jsStaticClasses), component);
  }
}
