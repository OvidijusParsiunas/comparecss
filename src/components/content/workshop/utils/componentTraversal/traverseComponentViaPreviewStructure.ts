import { AlignedSections, BaseSubcomponentRef, ComponentPreviewStructure } from '../../../../../interfaces/componentPreviewStructure';
import { ComponentTraversalState } from '../../../../../interfaces/componentTraversal';
import { ALIGNED_SECTION_TYPES } from '../../../../../consts/layerSections.enum';

type TraverseComponentCallback = (componentTraversalState: ComponentTraversalState) => ComponentTraversalState;

export class TraverseComponentViaPreviewStructure {

  private static inspectAlignedChildComponent(alignedChildComponents: BaseSubcomponentRef[], index: number, alignedSections: AlignedSections,
      callback: TraverseComponentCallback): ComponentTraversalState {
    const { subcomponentProperties } = alignedChildComponents[index];
    const callbackResult = callback({subcomponentProperties, alignedChildComponents, alignedSections, index});
    if (callbackResult) return callbackResult;
    const { componentPreviewStructure } = subcomponentProperties.seedComponent;
    const traversalResult = TraverseComponentViaPreviewStructure.traverse(componentPreviewStructure, callback);
    if (traversalResult) return traversalResult;
    return null;
  }

  private static iterateAlignedSections(alignedSections: AlignedSections, callback: TraverseComponentCallback): ComponentTraversalState {
    const alignedSectionKeyValues = Object.keys(ALIGNED_SECTION_TYPES);
    for (let i = 0; i < alignedSectionKeyValues.length; i += 1) {
      const alignedChildComponents = alignedSections[ALIGNED_SECTION_TYPES[alignedSectionKeyValues[i]]];
      for (let i = 0; i < alignedChildComponents.length; i += 1) {
        const iterationResult = TraverseComponentViaPreviewStructure.inspectAlignedChildComponent(alignedChildComponents, i, alignedSections, callback);
        if (iterationResult) return iterationResult;
      }
    }
    return null;
  }

  public static traverse(previewStructure: ComponentPreviewStructure,
      callback: TraverseComponentCallback): ComponentTraversalState {
    const { layers } = previewStructure;
    for (let i = 0; i < layers.length; i += 1) {
      const { sections: { alignedSections }, subcomponentProperties } = layers[i];
      const callbackResult = callback({subcomponentProperties, layers, index: i});
      if (callbackResult) return callbackResult;
      const iterationResult = TraverseComponentViaPreviewStructure.iterateAlignedSections(alignedSections, callback);
      if (iterationResult) return iterationResult;
    }
    return null;
  }
}
