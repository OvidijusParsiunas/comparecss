import { AlignedComponentWithMeta, PreviewTraversalCallback, PreviewTraversalResult } from '../../../../../../interfaces/componentTraversal';
import { TraverseComponentViaPreviewStructureShared } from './traverseComponentViaPreviewStructureShared';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';

// this class is set up to allow the traversal of multiple same type component structures at the same time
export class TraverseComponentViaPreviewStructureParentFirst extends TraverseComponentViaPreviewStructureShared {

  // for performance - can set a parameter to stop shallow preview traversal
  private static traverseAlignedComponents(callback: PreviewTraversalCallback, alignedComponentsWithMetaArr: AlignedComponentWithMeta[]): PreviewTraversalResult {
    let traversalResult: PreviewTraversalResult = {};
    for (let i = 0; i < (alignedComponentsWithMetaArr[0][0] || []).length; i += 1) {
      const availableComponents = alignedComponentsWithMetaArr.filter((alignedComponentWithMeta) => alignedComponentWithMeta[0][i]);
      traversalResult = callback(
        ...availableComponents.map((alignedComponentWithMeta) => TraverseComponentViaPreviewStructureShared.createTraversalStateFromAlignedComponentWithMeta(alignedComponentWithMeta, i)));
      if (traversalResult.stopTraversal) return traversalResult;
      traversalResult = TraverseComponentViaPreviewStructureParentFirst.traverse(
        callback, ...availableComponents.map((alignedComponentWithMeta) => alignedComponentWithMeta[0][i].seedComponent)
      );
      if (traversalResult.stopTraversal) return traversalResult;
    }
    return traversalResult;
  }

  private static traverseLayers(callback: PreviewTraversalCallback, layersArr: Layer[][]): PreviewTraversalResult {
    let traversalResult: PreviewTraversalResult = {};
    for (let i = 0; i < layersArr[0].length; i += 1) {
      traversalResult = callback(...layersArr.map((layers) => {
        return { subcomponent: layers[i].subcomponent, layers, index: i }}));
      if (traversalResult.stopTraversal) return traversalResult;
      traversalResult = TraverseComponentViaPreviewStructureShared.traverseAlignedSections(
        callback, [...layersArr.map((activeLayers) => activeLayers[i].sections.alignedSections)],
        TraverseComponentViaPreviewStructureParentFirst.traverseAlignedComponents);
      if (traversalResult.stopTraversal) return traversalResult;
    }
    return traversalResult;
  }

  private static traverseComponent(callback: PreviewTraversalCallback, componentsArr: WorkshopComponent[]): PreviewTraversalResult {
    const traversalResult = callback(...componentsArr.map((activeComponent) => {
      return { subcomponent: activeComponent.baseSubcomponent }}));
    if (traversalResult.stopTraversal) return traversalResult;
    return TraverseComponentViaPreviewStructureParentFirst.traverseLayers(
      callback, componentsArr.map((components) => components.componentPreviewStructure.layers));
  }
  
  private static traversePaddingComponentChild(callback: PreviewTraversalCallback, paddingChildrenArr: WorkshopComponent[]): PreviewTraversalResult {
    let traversalResult = TraverseComponentViaPreviewStructureParentFirst.traverseComponent(callback, paddingChildrenArr);
    if (traversalResult.stopTraversal) return traversalResult;
    for (let i = 0; i < paddingChildrenArr[0].linkedComponents.auxiliary.length; i += 1) {
      traversalResult = TraverseComponentViaPreviewStructureParentFirst.traverseComponent(
        callback, [...paddingChildrenArr.map((paddingChildren) => paddingChildren.linkedComponents.auxiliary[i])]);
      if (traversalResult.stopTraversal) return traversalResult;
    }
    return traversalResult;
  }

  // WORK 2 - child components get called twice when syncing button to dropdown
  public static traverse(callback: PreviewTraversalCallback, ...componentsArr: WorkshopComponent[]): PreviewTraversalResult {
    let traversalResult = TraverseComponentViaPreviewStructureParentFirst.traverseComponent(callback, componentsArr);
    if (traversalResult.stopTraversal) return traversalResult;
    if (componentsArr[0].paddingComponentChild) {
      traversalResult = TraverseComponentViaPreviewStructureParentFirst.traversePaddingComponentChild(
        callback, [...componentsArr.map((components) => components.paddingComponentChild)]);
    }
    return traversalResult;
  }
}

/*

If there are performance issues with the use of map and arbitrary array lengths - please refer to the following
initial implementation of traversal made specifically for two components or traversal for one component:

2 components:

  private static copyAlignedComponents(callback: TraversableCallback, activeLayerComponents: Subcomponent[],
      alignedComponentsToBeCopied: Subcomponent[]): void {
    (activeLayerComponents || []).forEach((subcomponent: Subcomponent, baseSubcomponentIndex) => {
      const alignedSubcomponentToBeCopied = alignedComponentsToBeCopied?.[baseSubcomponentIndex];
      if (!alignedSubcomponentToBeCopied) return;
      callback(subcomponent, alignedSubcomponentToBeCopied);
    });
  }

  private static copyAlignedSections(callback: TraversableCallback, activeAlignedSections: AlignedSections, alignedSectionsToBeCopied: AlignedSections): void {
    Object.keys(activeAlignedSections).forEach((alignedSection) => {
      SyncChildComponentModeTempPropertiesUtils.copyAlignedComponents(
        callback, activeAlignedSections[alignedSection], alignedSectionsToBeCopied?.[alignedSection]);
    });
  }

  private static copyLayers(callback: TraversableCallback, activeLayers: Layer[], layersToBeCopied: Layer[]): void {
    activeLayers.forEach((layer, layerIndex) => {
      const layerToBeCopied = layersToBeCopied?.[layerIndex];
      SyncChildComponentModeTempPropertiesUtils.copyAlignedSections(callback, layer.sections.alignedSections, layerToBeCopied?.sections.alignedSections);
      callback(layer.subcomponent, layerToBeCopied?.subcomponent);
    });
  }

  private static copyComponent(callback: TraversableCallback, activeComponent: WorkshopComponent, componentToBeSynced: WorkshopComponent): void {
    callback(activeComponent.baseSubcomponent, componentToBeSynced?.baseSubcomponent);
    SyncChildComponentModeTempPropertiesUtils.copyLayers(
      callback, activeComponent.componentPreviewStructure.layers, componentToBeSynced?.componentPreviewStructure.layers);
  }

  private static copyPaddingComponentChild(callback: TraversableCallback, activePaddingChild: WorkshopComponent, paddingChildToBeCopied: WorkshopComponent): void {
    SyncChildComponentModeTempPropertiesUtils.copyComponent(callback, activePaddingChild, paddingChildToBeCopied);
    activePaddingChild.linkedComponents.auxiliary.forEach((auxiliaryComponent, index) => {
      SyncChildComponentModeTempPropertiesUtils.copyComponent(callback, auxiliaryComponent, paddingChildToBeCopied?.linkedComponents.auxiliary[index]);
    });
  }

  private static traverseSubcomponentPreviewStructureOfSameComponents(callback: TraversableCallback, activeComponent: WorkshopComponent,
      componentToBeSynced: WorkshopComponent): void {
    SyncChildComponentModeTempPropertiesUtils.copyComponent(callback, activeComponent, componentToBeSynced);
    if (activeComponent.paddingComponentChild) {
      SyncChildComponentModeTempPropertiesUtils.copyPaddingComponentChild(callback, activeComponent.paddingComponentChild, componentToBeSynced?.paddingComponentChild);
    }
  }


1 component:

  private static inspectAlignedChildComponent(alignedSubcomponents: Subcomponent[], index: number, alignedSections: AlignedSections,
      callback: PreviewTraversalCallback): SubcomponentPreviewTraversalState {
    const subcomponent = alignedSubcomponents[index];
    const callbackResult = callback({subcomponent, alignedSubcomponents, alignedSections, index});
    if (callbackResult) return callbackResult;
    const { componentPreviewStructure } = subcomponent.seedComponent;
    const traversalResult = TraverseComponentViaPreviewStructure.traverse(callback, componentPreviewStructure, );
    if (traversalResult) return traversalResult;
    return null;
  }

  private static iterateAlignedSections(callback: PreviewTraversalCallback, alignedSections: AlignedSections): SubcomponentPreviewTraversalState {
    const alignedSectionKeyValues = Object.keys(ALIGNED_SECTION_TYPES);
    for (let i = 0; i < alignedSectionKeyValues.length; i += 1) {
      const alignedSubcomponents = alignedSections[ALIGNED_SECTION_TYPES[alignedSectionKeyValues[i]]];
      for (let i = 0; i < alignedSubcomponents.length; i += 1) {
        const iterationResult = TraverseComponentViaPreviewStructure.inspectAlignedChildComponent(alignedSubcomponents, i, alignedSections, callback);
        if (iterationResult) return iterationResult;
      }
    }
    return null;
  }

  public static traverse(callback: PreviewTraversalCallback, previewStructure: ComponentPreviewStructure): SubcomponentPreviewTraversalState {
    const { layers } = previewStructure;
    for (let i = 0; i < layers.length; i += 1) {
      const { sections: { alignedSections }, subcomponent } = layers[i];
      const callbackResult = callback({subcomponent, layers, index: i});
      if (callbackResult) return callbackResult;
      const iterationResult = TraverseComponentViaPreviewStructure.iterateAlignedSections(callback, alignedSections);
      if (iterationResult) return iterationResult;
    }
    return null;
  }
*/
