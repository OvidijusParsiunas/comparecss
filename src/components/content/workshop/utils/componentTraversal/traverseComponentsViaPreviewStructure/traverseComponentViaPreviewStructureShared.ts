import { AlignedComponentWithMeta, PreviewTraversalCallback, SubcomponentPreviewTraversalState } from '../../../../../../interfaces/componentTraversal';
import { AlignedSections } from '../../../../../../interfaces/componentPreviewStructure';

type TraverseAlignedComponentsCallback = (callback: PreviewTraversalCallback, alignedComponentsWithMetaArr: AlignedComponentWithMeta[]) => SubcomponentPreviewTraversalState;

export class TraverseComponentViaPreviewStructureShared {

  protected static createTraversalStateFromAlignedComponentWithMeta(alignedComponentWithMeta: AlignedComponentWithMeta, index: number): SubcomponentPreviewTraversalState {
    const [alignedChildComponents, alignedSections] = alignedComponentWithMeta;
    return {
      subcomponentProperties: alignedChildComponents[index].subcomponentProperties,
      alignedChildComponents,
      alignedSections,
      index,
    }
  }

  protected static traverseAlignedSections(callback: PreviewTraversalCallback, alignedSectionsArr: AlignedSections[],
      traverseAlignedComponentsCallback: TraverseAlignedComponentsCallback): SubcomponentPreviewTraversalState {
    let traversalResult: SubcomponentPreviewTraversalState = null;
    const alignedSectionKeys = Object.keys(alignedSectionsArr[0]);
    for (let i = 0; i < alignedSectionKeys.length; i += 1) {
      traversalResult = traverseAlignedComponentsCallback(
        callback, alignedSectionsArr.map((alignedSections) => { return [alignedSections[alignedSectionKeys[i]], alignedSections]; }));
      if (traversalResult?.stopTraversal) return traversalResult;
    }
    return traversalResult;
  }
}
