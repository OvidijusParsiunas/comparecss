import { AlignedComponentWithMeta, PreviewTraversalCallback, SubcomponentPreviewTraversalState, PreviewTraversalResult } from '../../../../../../interfaces/componentTraversal';
import { AlignedSections } from '../../../../../../interfaces/componentPreviewStructure';

type TraverseAlignedComponentsCallback = (callback: PreviewTraversalCallback, alignedComponentsWithMetaArr: AlignedComponentWithMeta[]) => PreviewTraversalResult;

export class TraverseComponentViaPreviewStructureShared {

  protected static createTraversalStateFromAlignedComponentWithMeta(alignedComponentWithMeta: AlignedComponentWithMeta, index: number): SubcomponentPreviewTraversalState {
    const [alignedSubcomponents, alignedSections] = alignedComponentWithMeta;
    return {
      subcomponent: alignedSubcomponents[index],
      alignedSubcomponents,
      alignedSections,
      index,
    }
  }

  protected static traverseAlignedSections(callback: PreviewTraversalCallback, alignedSectionsArr: AlignedSections[],
      traverseAlignedComponentsCallback: TraverseAlignedComponentsCallback): PreviewTraversalResult {
    let traversalResult: PreviewTraversalResult = {};
    const alignedSectionKeys = Object.keys(alignedSectionsArr[0]);
    for (let i = 0; i < alignedSectionKeys.length; i += 1) {
      traversalResult = traverseAlignedComponentsCallback(
        callback, alignedSectionsArr.map((alignedSections) => { return [alignedSections[alignedSectionKeys[i]], alignedSections]; }));
      if (traversalResult.stopTraversal) return traversalResult;
    }
    return traversalResult;
  }
}
