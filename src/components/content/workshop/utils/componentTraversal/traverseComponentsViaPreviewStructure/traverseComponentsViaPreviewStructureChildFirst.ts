import { AlignedComponentWithMeta, ComponentPreviewTraversalState, PreviewTraversalCallback, PreviewTraversalResult } from '../../../../../../interfaces/componentTraversal';
import { TraverseComponentViaPreviewStructureShared } from './traverseComponentViaPreviewStructureShared';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';

// this class is set up to allow the traversal of multiple same type component structures at the same time
export class TraverseComponentViaPreviewStructureChildFirst extends TraverseComponentViaPreviewStructureShared {

  // for performance - can set a parameter to stop shallow preview traversal
  private static traverseAlignedComponents(callback: PreviewTraversalCallback, alignedComponentsWithMetaArr: AlignedComponentWithMeta[]): PreviewTraversalResult {
    let traversalResult: PreviewTraversalResult = {};
    for (let i = 0; i < (alignedComponentsWithMetaArr[0][0] || []).length; i += 1) {
      const { traversalStateArr, containerComponents,
        } = TraverseComponentViaPreviewStructureShared.assembleTraversalArgs(alignedComponentsWithMetaArr, i);
      traversalResult = TraverseComponentViaPreviewStructureChildFirst.traverse(callback, traversalStateArr, ...containerComponents);
      if (traversalResult.stopTraversal) return traversalResult;
    }
    return traversalResult;
  }

  private static traverseLayers(callback: PreviewTraversalCallback, layersArr: Layer[][]): PreviewTraversalResult {
    let traversalResult: PreviewTraversalResult = {};
    for (let i = 0; i < layersArr[0].length; i += 1) {
      traversalResult = TraverseComponentViaPreviewStructureShared.traverseAlignmentSections(
        callback, [...layersArr.map((activeLayers) => activeLayers[i].alignmentSectionToComponents)],
        TraverseComponentViaPreviewStructureChildFirst.traverseAlignedComponents);
      if (traversalResult.stopTraversal) return traversalResult;
      traversalResult = callback(...layersArr.map((layers) => {
        return { component: layers[i].subcomponent.seedComponent, layers, index: i }; }));
      if (traversalResult.stopTraversal) return traversalResult;
    }
    return traversalResult;
  }

  private static traverseComponent(callback: PreviewTraversalCallback, existingTraversalStateArr: ComponentPreviewTraversalState[],
      componentsArr: WorkshopComponent[]): PreviewTraversalResult {
    const traversalResult = TraverseComponentViaPreviewStructureChildFirst.traverseLayers(
      callback, [...componentsArr.map((component) => component.componentPreviewStructure.layers)]);
    if (traversalResult.stopTraversal) return traversalResult;
    const traversalState = existingTraversalStateArr || componentsArr.map((component) => { return { component }; });
    return callback(...traversalState);
  }
  
  private static traversePaddingComponentChild(callback: PreviewTraversalCallback, paddingChildrenArr: WorkshopComponent[]): PreviewTraversalResult {
    for (let i = 0; i < paddingChildrenArr[0].linkedComponents.auxiliary.length; i += 1) {
      const traversalResult = TraverseComponentViaPreviewStructureChildFirst.traverseComponent(
        callback, null, [...paddingChildrenArr.map((paddingChildren) => paddingChildren.linkedComponents.auxiliary[i])]);
      if (traversalResult.stopTraversal) return traversalResult;
    }
    return TraverseComponentViaPreviewStructureChildFirst.traverseComponent(callback, null, paddingChildrenArr);
  }

  public static traverse(callback: PreviewTraversalCallback, existingTraversalStateArr: ComponentPreviewTraversalState[],
      ...componentsArr: WorkshopComponent[]): PreviewTraversalResult {
    if (componentsArr[0].paddingComponentChild) {
      const traversalResult = TraverseComponentViaPreviewStructureChildFirst.traversePaddingComponentChild(
        callback, [...componentsArr.map((components) => components.paddingComponentChild)]);
      if (traversalResult.stopTraversal) return traversalResult;
    }
    return TraverseComponentViaPreviewStructureChildFirst.traverseComponent(callback, existingTraversalStateArr, componentsArr);
  }
}
