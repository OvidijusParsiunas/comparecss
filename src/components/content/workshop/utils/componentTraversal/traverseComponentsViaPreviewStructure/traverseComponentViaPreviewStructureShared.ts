import { AlignedComponentWithMeta, PreviewTraversalCallback, SubcomponentPreviewTraversalState, PreviewTraversalResult } from '../../../../../../interfaces/componentTraversal';
import { AlignmentSectionToSubcomponents } from '../../../../../../interfaces/componentPreviewStructure';

type TraverseAlignedComponentsCallback = (callback: PreviewTraversalCallback, alignedComponentsWithMetaArr: AlignedComponentWithMeta[]) => PreviewTraversalResult;

export class TraverseComponentViaPreviewStructureShared {

  protected static createTraversalStateFromAlignedComponentWithMeta(alignedComponentWithMeta: AlignedComponentWithMeta, index: number): SubcomponentPreviewTraversalState {
    const [alignedSubcomponents, alignmentSectionToSubcomponents] = alignedComponentWithMeta;
    return {
      subcomponent: alignedSubcomponents[index],
      alignedSubcomponents,
      alignmentSectionToSubcomponents,
      index,
    }
  }

  protected static traverseAlignmentSections(callback: PreviewTraversalCallback, alignmentSectionToSubcomponentsArr: AlignmentSectionToSubcomponents[],
      traverseAlignedComponentsCallback: TraverseAlignedComponentsCallback): PreviewTraversalResult {
    let traversalResult: PreviewTraversalResult = {};
    const alignmentSections = Object.keys(alignmentSectionToSubcomponentsArr[0]);
    for (let i = 0; i < alignmentSections.length; i += 1) {
      traversalResult = traverseAlignedComponentsCallback(
        callback, alignmentSectionToSubcomponentsArr.map((alignmentSectionToSubcomponents) => {
          return [alignmentSectionToSubcomponents[alignmentSections[i]], alignmentSectionToSubcomponents]; }));
      if (traversalResult.stopTraversal) return traversalResult;
    }
    return traversalResult;
  }
}
