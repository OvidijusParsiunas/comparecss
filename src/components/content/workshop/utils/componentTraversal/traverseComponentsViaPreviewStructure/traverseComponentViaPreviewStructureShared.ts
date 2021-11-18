import { AlignedComponentWithMeta, PreviewTraversalCallback, ComponentPreviewTraversalState, PreviewTraversalResult } from '../../../../../../interfaces/componentTraversal';
import { AlignmentSectionToComponents } from '../../../../../../interfaces/componentPreviewStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

type TraverseAlignedComponentsCallback = (callback: PreviewTraversalCallback, alignedComponentsWithMetaArr: AlignedComponentWithMeta[]) => PreviewTraversalResult;

interface ComponentTraversalArgs {
  traversalStateArr: ComponentPreviewTraversalState[];
  containerComponents: WorkshopComponent[];
}

export class TraverseComponentViaPreviewStructureShared {

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

  private static createTraversalStateFromAlignedComponentWithMeta(alignedComponentWithMeta: AlignedComponentWithMeta, index: number): ComponentPreviewTraversalState {
    const [alignedComponents, alignmentSectionToComponents] = alignedComponentWithMeta;
    return {
      component: alignedComponents[index],
      alignedComponents,
      alignmentSectionToComponents,
      index,
    };
  }

  public static assembleTraversalArgs(alignedComponentsWithMetaArr: AlignedComponentWithMeta[], componentIndex: number): ComponentTraversalArgs {
    const availableAlignedComponentsWithMeta = alignedComponentsWithMetaArr.filter(
      (alignedComponentWithMeta) => alignedComponentWithMeta[0][componentIndex]);
    const traversalStateArr = availableAlignedComponentsWithMeta.map(
      (alignedComponentWithMeta) => TraverseComponentViaPreviewStructureShared
        .createTraversalStateFromAlignedComponentWithMeta(alignedComponentWithMeta, componentIndex));
    const containerComponents = availableAlignedComponentsWithMeta.map((alignedComponentWithMeta) => alignedComponentWithMeta[0][componentIndex]);
    return { traversalStateArr, containerComponents };
  }
}
