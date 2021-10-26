import { TraverseComponentViaPreviewStructureParentFirst } from '../../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SubcomponentPreviewTraversalState } from '../../../../../../../interfaces/componentTraversal';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';

export interface JsClassesReferences {
  defaultJsClasses?: Set<JAVASCRIPT_CLASSES>;
  defaultStaticJsClasses?: Set<JAVASCRIPT_CLASSES>;
}

export class JsClassesUtils {

  private static addJsClassesToFeatures(subcomponentProperties: SubcomponentProperties, overwriteDefaultProperties: boolean,
      jsClasses: Set<JAVASCRIPT_CLASSES>, featureType: 'customFeatures'|'customStaticFeatures',
      defaultFeatureType: 'defaultCustomFeatures'|'defaultCustomStaticFeatures'): void {
    if (!subcomponentProperties[featureType]) subcomponentProperties[featureType] = {};
    subcomponentProperties[featureType].jsClasses = jsClasses;
    if (overwriteDefaultProperties) {
      if (!subcomponentProperties[defaultFeatureType]) subcomponentProperties[defaultFeatureType] = {};
      subcomponentProperties[defaultFeatureType].jsClasses = new Set(jsClasses);
    }
  }

  private static addJsClasses(subcomponentProperties: SubcomponentProperties, overwriteDefaultProperties: boolean,
      jsClasses: Set<JAVASCRIPT_CLASSES>, staticJsClasses: Set<JAVASCRIPT_CLASSES>): void {
    if (jsClasses) JsClassesUtils.addJsClassesToFeatures(subcomponentProperties, overwriteDefaultProperties, jsClasses,
      'customFeatures', 'defaultCustomFeatures')
    if (staticJsClasses) JsClassesUtils.addJsClassesToFeatures(subcomponentProperties, overwriteDefaultProperties, staticJsClasses,
      'customStaticFeatures', 'defaultCustomStaticFeatures')
  }

  private static addCustomFeaturesObjects(subcomponentProperties: SubcomponentProperties, overwriteDefaultProperties: boolean): void {
    subcomponentProperties.customFeatures = {};
    if (overwriteDefaultProperties) subcomponentProperties.defaultCustomFeatures = {};
  }

  private static assign(overwriteDefaultProperties: boolean, jsClasses: Set<JAVASCRIPT_CLASSES>, staticJsClasses: Set<JAVASCRIPT_CLASSES>,
      componentTraversalState: SubcomponentPreviewTraversalState): SubcomponentPreviewTraversalState {
    const { subcomponentProperties } = componentTraversalState;
    if (!subcomponentProperties.customFeatures) {
      JsClassesUtils.addCustomFeaturesObjects(subcomponentProperties, overwriteDefaultProperties);
    }
    JsClassesUtils.addJsClasses(subcomponentProperties, overwriteDefaultProperties, jsClasses, staticJsClasses);
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
