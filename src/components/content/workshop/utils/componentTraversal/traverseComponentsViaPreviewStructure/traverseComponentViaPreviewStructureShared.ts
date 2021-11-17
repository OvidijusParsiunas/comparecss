import { AlignedComponentWithMeta, PreviewTraversalCallback, SubcomponentPreviewTraversalState, PreviewTraversalResult } from '../../../../../../interfaces/componentTraversal';
import { AlignmentSectionToComponents } from '../../../../../../interfaces/componentPreviewStructure';

type TraverseAlignedComponentsCallback = (callback: PreviewTraversalCallback, alignedComponentsWithMetaArr: AlignedComponentWithMeta[]) => PreviewTraversalResult;

export class TraverseComponentViaPreviewStructureShared {

  protected static createTraversalStateFromAlignedComponentWithMeta(alignedComponentWithMeta: AlignedComponentWithMeta, index: number): SubcomponentPreviewTraversalState {
    const [alignedComponents, alignmentSectionToComponents] = alignedComponentWithMeta;
    return {
      // WORK 4 - refactor
      subcomponent: alignedComponents[index].baseSubcomponent,
      alignedComponents,
      alignmentSectionToComponents,
      index,
    };
  }

  protected static traverseAlignmentSections(callback: PreviewTraversalCallback, alignmentSectionToSubcomponentsArr: AlignmentSectionToComponents[],
      traverseAlignedComponentsCallback: TraverseAlignedComponentsCallback): PreviewTraversalResult {
    let traversalResult: PreviewTraversalResult = {};
    const alignmentSections = Object.keys(alignmentSectionToSubcomponentsArr[0]);
    for (let i = 0; i < alignmentSections.length; i += 1) {
      traversalResult = traverseAlignedComponentsCallback(
        callback, alignmentSectionToSubcomponentsArr.map((alignmentSectionToComponents) => {
          return [alignmentSectionToComponents[alignmentSections[i]], alignmentSectionToComponents]; }));
      if (traversalResult.stopTraversal) return traversalResult;
    }
    return traversalResult;
  }
}
