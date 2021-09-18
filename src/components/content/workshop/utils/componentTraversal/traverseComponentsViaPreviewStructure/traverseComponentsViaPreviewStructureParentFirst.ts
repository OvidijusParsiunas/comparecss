import { AlignedComponentWithMeta, PreviewTraversalCallback, SubcomponentPreviewTraversalState } from '../../../../../../interfaces/componentTraversal';
import { ComponentPreviewStructure, Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { TraverseComponentViaPreviewStructureShared } from './traverseComponentViaPreviewStructureShared';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

// this class is set up to allow the traversal of multiple same type component structures at the same time
export class TraverseComponentViaPreviewStructureParentFirst extends TraverseComponentViaPreviewStructureShared {

  // for performance - can set a parameter to stop shallow preview traversal
  private static traverseAlignedComponents(callback: PreviewTraversalCallback, alignedComponentsWithMetaArr: AlignedComponentWithMeta[]): SubcomponentPreviewTraversalState {
    let traversalResult: SubcomponentPreviewTraversalState = null;
    for (let i = 0; i < (alignedComponentsWithMetaArr[0][0] || []).length; i += 1) {
      const availableComponents = alignedComponentsWithMetaArr
        .filter((alignedComponentWithMeta) => alignedComponentWithMeta[0][i])
      traversalResult = callback(
        ...availableComponents.map((alignedComponentWithMeta) => TraverseComponentViaPreviewStructureShared.createTraversalStateFromAlignedComponentWithMeta(alignedComponentWithMeta, i)));
      if (traversalResult?.stopTraversal) return traversalResult;
      traversalResult = TraverseComponentViaPreviewStructureParentFirst.traverse(
        callback, ...availableComponents.map((alignedComponentWithMeta) => alignedComponentWithMeta[0][i].subcomponentProperties.seedComponent.componentPreviewStructure)
      );
      if (traversalResult?.stopTraversal) return traversalResult;
    }
    return traversalResult;
  }

  private static traverseLayers(callback: PreviewTraversalCallback, layersArr: Layer[][]): SubcomponentPreviewTraversalState {
    let traversalResult: SubcomponentPreviewTraversalState = null;
    for (let i = 0; i < layersArr[0].length; i += 1) {
      traversalResult = callback(...layersArr.map((layers) => {
        return { subcomponentProperties: layers[i].subcomponentProperties, layers, index: i }}));
      if (traversalResult?.stopTraversal) return traversalResult;
      traversalResult = TraverseComponentViaPreviewStructureShared.traverseAlignedSections(
        callback, [...layersArr.map((activeLayers) => activeLayers[i].sections.alignedSections)],
        TraverseComponentViaPreviewStructureParentFirst.traverseAlignedComponents);
      if (traversalResult?.stopTraversal) return traversalResult;
    }
    return traversalResult;
  }

  public static traverse(callback: PreviewTraversalCallback, ...componentPreviewArr: ComponentPreviewStructure[]): SubcomponentPreviewTraversalState {
    return TraverseComponentViaPreviewStructureParentFirst.traverseLayers(
      callback, [...componentPreviewArr.map((componentPreview) => componentPreview.layers)]);
  }

  private static traverseComponent(callback: PreviewTraversalCallback, componentsArr: WorkshopComponent[]): SubcomponentPreviewTraversalState {
    const traversalResult = callback(...componentsArr.map((activeComponent) => {
      return { subcomponentProperties: activeComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE] }}));
    if (traversalResult?.stopTraversal) return traversalResult;
    return TraverseComponentViaPreviewStructureParentFirst.traverse(
      callback, ...componentsArr.map((components) => components.componentPreviewStructure));
  }
  
  private static traversePaddingComponentChild(callback: PreviewTraversalCallback, paddingChildrenArr: WorkshopComponent[]): SubcomponentPreviewTraversalState {
    let traversalResult = TraverseComponentViaPreviewStructureParentFirst.traverseComponent(callback, paddingChildrenArr);
    if (traversalResult?.stopTraversal) return traversalResult;
    for (let i = 0; i < paddingChildrenArr[0].linkedComponents.auxiliary.length; i += 1) {
      traversalResult = TraverseComponentViaPreviewStructureParentFirst.traverseComponent(
        callback, [...paddingChildrenArr.map((paddingChildren) => paddingChildren.linkedComponents.auxiliary[i])]);
      if (traversalResult?.stopTraversal) return traversalResult;
    }
    return traversalResult;
  }

  public static traverseUsingComponent(callback: PreviewTraversalCallback, ...componentsArr: WorkshopComponent[]): SubcomponentPreviewTraversalState {
    let traversalResult = TraverseComponentViaPreviewStructureParentFirst.traverseComponent(callback, componentsArr);
    if (traversalResult?.stopTraversal) return traversalResult;
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

  private static copyAlignedComponents(callback: TraversableCallback, activeLayerComponents: BaseSubcomponentRef[],
      alignedComponentsToBeCopied: BaseSubcomponentRef[]): void {
    (activeLayerComponents || []).forEach((baseSubcomponentRef: BaseSubcomponentRef, baseSubcomponentIndex) => {
      const alignedComponentToBeCopied = alignedComponentsToBeCopied?.[baseSubcomponentIndex];
      if (!alignedComponentToBeCopied) return;
      callback(baseSubcomponentRef.subcomponentProperties, alignedComponentToBeCopied.subcomponentProperties);
    });
  }

  private static copyAlignedSections(callback: TraversableCallback, activeAlignedSections: AlignedSections, alignedSectionsToBeCopied: AlignedSections): void {
    Object.keys(activeAlignedSections).forEach((alignedSection) => {
      CopyChildComponentModeTempPropertiesUtils.copyAlignedComponents(
        callback, activeAlignedSections[alignedSection], alignedSectionsToBeCopied?.[alignedSection]);
    });
  }

  private static copyLayers(callback: TraversableCallback, activeLayers: Layer[], layersToBeCopied: Layer[]): void {
    activeLayers.forEach((layer, layerIndex) => {
      const layerToBeCopied = layersToBeCopied?.[layerIndex];
      CopyChildComponentModeTempPropertiesUtils.copyAlignedSections(callback, layer.sections.alignedSections, layerToBeCopied?.sections.alignedSections);
      callback(layer.subcomponentProperties, layerToBeCopied?.subcomponentProperties);
    });
  }

  private static copyComponent(callback: TraversableCallback, activeComponent: WorkshopComponent, componentToBeCopied: WorkshopComponent): void {
    callback(activeComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE], componentToBeCopied?.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE]);
    CopyChildComponentModeTempPropertiesUtils.copyLayers(
      callback, activeComponent.componentPreviewStructure.layers, componentToBeCopied?.componentPreviewStructure.layers);
  }

  private static copyPaddingComponentChild(callback: TraversableCallback, activePaddingChild: WorkshopComponent, paddingChildToBeCopied: WorkshopComponent): void {
    CopyChildComponentModeTempPropertiesUtils.copyComponent(callback, activePaddingChild, paddingChildToBeCopied);
    activePaddingChild.linkedComponents.auxiliary.forEach((auxiliaryComponent, index) => {
      CopyChildComponentModeTempPropertiesUtils.copyComponent(callback, auxiliaryComponent, paddingChildToBeCopied?.linkedComponents.auxiliary[index]);
    });
  }

  private static traverseSubcomponentPreviewStructureOfSameComponents(callback: TraversableCallback, activeComponent: WorkshopComponent,
      componentToBeCopied: WorkshopComponent): void {
    CopyChildComponentModeTempPropertiesUtils.copyComponent(callback, activeComponent, componentToBeCopied);
    if (activeComponent.paddingComponentChild) {
      CopyChildComponentModeTempPropertiesUtils.copyPaddingComponentChild(callback, activeComponent.paddingComponentChild, componentToBeCopied?.paddingComponentChild);
    }
  }


1 component:

  private static inspectAlignedChildComponent(alignedChildComponents: BaseSubcomponentRef[], index: number, alignedSections: AlignedSections,
      callback: PreviewTraversalCallback): SubcomponentPreviewTraversalState {
    const { subcomponentProperties } = alignedChildComponents[index];
    const callbackResult = callback({subcomponentProperties, alignedChildComponents, alignedSections, index});
    if (callbackResult) return callbackResult;
    const { componentPreviewStructure } = subcomponentProperties.seedComponent;
    const traversalResult = TraverseComponentViaPreviewStructure.traverse(callback, componentPreviewStructure, );
    if (traversalResult) return traversalResult;
    return null;
  }

  private static iterateAlignedSections(callback: PreviewTraversalCallback, alignedSections: AlignedSections): SubcomponentPreviewTraversalState {
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

  public static traverse(callback: PreviewTraversalCallback, previewStructure: ComponentPreviewStructure): SubcomponentPreviewTraversalState {
    const { layers } = previewStructure;
    for (let i = 0; i < layers.length; i += 1) {
      const { sections: { alignedSections }, subcomponentProperties } = layers[i];
      const callbackResult = callback({subcomponentProperties, layers, index: i});
      if (callbackResult) return callbackResult;
      const iterationResult = TraverseComponentViaPreviewStructure.iterateAlignedSections(callback, alignedSections);
      if (iterationResult) return iterationResult;
    }
    return null;
  }
*/
