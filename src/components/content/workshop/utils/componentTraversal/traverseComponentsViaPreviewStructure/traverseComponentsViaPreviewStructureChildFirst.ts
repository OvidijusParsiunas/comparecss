import { AlignedComponentWithMeta, PreviewTraversalCallback, SubcomponentPreviewTraversalState } from '../../../../../../interfaces/componentTraversal';
import { ComponentPreviewStructure, Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { TraverseComponentViaPreviewStructureShared } from './traverseComponentViaPreviewStructureShared';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

// this class is set up to allow the traversal of multiple same type component structures at the same time
export class TraverseComponentViaPreviewStructureChildFirst extends TraverseComponentViaPreviewStructureShared {

  // for performance - can set a parameter to stop shallow preview traversal
  private static traverseAlignedComponents(callback: PreviewTraversalCallback, alignedComponentsWithMetaArr: AlignedComponentWithMeta[]): SubcomponentPreviewTraversalState {
    let traversalResult: SubcomponentPreviewTraversalState = null;
    for (let i = 0; i < (alignedComponentsWithMetaArr[0][0] || []).length; i += 1) {
      const availableComponents = alignedComponentsWithMetaArr
        .filter((alignedComponentWithMeta) => alignedComponentWithMeta[0][i])
      traversalResult = TraverseComponentViaPreviewStructureChildFirst.traverse(
        callback, ...availableComponents.map((alignedComponentWithMeta) => alignedComponentWithMeta[0][i].subcomponentProperties.seedComponent.componentPreviewStructure)
      );
      if (traversalResult?.stopTraversal) return traversalResult;
      traversalResult = callback(
        ...availableComponents.map((alignedComponentWithMeta) => TraverseComponentViaPreviewStructureShared.createTraversalStateFromAlignedComponentWithMeta(alignedComponentWithMeta, i)));
      if (traversalResult?.stopTraversal) return traversalResult;
    }
    return traversalResult;
  }

  private static traverseLayers(callback: PreviewTraversalCallback, layersArr: Layer[][]): SubcomponentPreviewTraversalState {
    let traversalResult: SubcomponentPreviewTraversalState = null;
    for (let i = 0; i < layersArr[0].length; i += 1) {
      traversalResult = TraverseComponentViaPreviewStructureShared.traverseAlignedSections(
        callback, [...layersArr.map((activeLayers) => activeLayers[i].sections.alignedSections)],
        TraverseComponentViaPreviewStructureChildFirst.traverseAlignedComponents);
      if (traversalResult?.stopTraversal) return traversalResult;
      traversalResult = callback(...layersArr.map((layers) => {
        return { subcomponentProperties: layers[i].subcomponentProperties, layers, index: i }}));
      if (traversalResult?.stopTraversal) return traversalResult;
    }
    return traversalResult;
  }

  public static traverse(callback: PreviewTraversalCallback, ...componentPreviewArr: ComponentPreviewStructure[]): SubcomponentPreviewTraversalState {
    return TraverseComponentViaPreviewStructureChildFirst.traverseLayers(
      callback, [...componentPreviewArr.map((componentPreview) => componentPreview.layers)]);
  }

  private static traverseComponent(callback: PreviewTraversalCallback, componentsArr: WorkshopComponent[]): SubcomponentPreviewTraversalState {
    const traversalResult = TraverseComponentViaPreviewStructureChildFirst.traverse(
      callback, ...componentsArr.map((components) => components.componentPreviewStructure));
    if (traversalResult?.stopTraversal) return traversalResult;
    return callback(...componentsArr.map((activeComponent) => {
      return { subcomponentProperties: activeComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE] }}));
  }
  
  private static traversePaddingComponentChild(callback: PreviewTraversalCallback, paddingChildrenArr: WorkshopComponent[]): SubcomponentPreviewTraversalState {
    for (let i = 0; i < paddingChildrenArr[0].linkedComponents.auxiliary.length; i += 1) {
      const traversalResult = TraverseComponentViaPreviewStructureChildFirst.traverseComponent(
        callback, [...paddingChildrenArr.map((paddingChildren) => paddingChildren.linkedComponents.auxiliary[i])]);
      if (traversalResult?.stopTraversal) return traversalResult;
    }
    return TraverseComponentViaPreviewStructureChildFirst.traverseComponent(callback, paddingChildrenArr);
  }

  public static traverseUsingComponent(callback: PreviewTraversalCallback, ...componentsArr: WorkshopComponent[]): SubcomponentPreviewTraversalState {
    if (componentsArr[0].paddingComponentChild) {
      const traversalResult = TraverseComponentViaPreviewStructureChildFirst.traversePaddingComponentChild(
        callback, [...componentsArr.map((components) => components.paddingComponentChild)]);
      if (traversalResult?.stopTraversal) return traversalResult;
    }
    return TraverseComponentViaPreviewStructureChildFirst.traverseComponent(callback, componentsArr);
  }
}
