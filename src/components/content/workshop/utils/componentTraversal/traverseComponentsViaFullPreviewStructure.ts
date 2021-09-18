import { AlignedSections, BaseSubcomponentRef, Layer } from '../../../../../interfaces/componentPreviewStructure';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';

type TraversalCallback = (...activeSubcomponent: SubcomponentProperties[]) => void;

export class TraverseComponentsViaFullPreviewStructure {
  
  private static traverseAlignedComponents(callback: TraversalCallback, layerComponents: BaseSubcomponentRef[][]): void {
    for (let i = 0; i < (layerComponents[0] || []).length; i += 1) {
      callback(...layerComponents
        .filter((activeLayerComponents) => activeLayerComponents[i])
        .map((activeAlignedSections) => activeAlignedSections[i].subcomponentProperties));
    }
  }

  private static traverseAlignedSections(callback: TraversalCallback, alignedSections: AlignedSections[]): void {
    const alignedSectionKeys = Object.keys(alignedSections[0]);
    for (let i = 0; i < alignedSectionKeys[0].length; i += 1) {
      TraverseComponentsViaFullPreviewStructure.traverseAlignedComponents(
        callback, [...alignedSections.map((activeAlignedSections) => activeAlignedSections[alignedSectionKeys[i]])]);
    }
  }

  private static traverseLayers(callback: TraversalCallback, activeLayers: Layer[][]): void {
    for (let i = 0; i < activeLayers[0].length; i += 1) {
      TraverseComponentsViaFullPreviewStructure.traverseAlignedSections(
        callback, [...activeLayers.map((activeLayers) => activeLayers[i].sections.alignedSections)]);
      callback(...activeLayers.map((activeLayers) => activeLayers[i].subcomponentProperties));
    }
  }

  private static traverseComponent(callback: TraversalCallback, components: WorkshopComponent[]): void {
    callback(...components.map((activeComponent) => activeComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE]));
    TraverseComponentsViaFullPreviewStructure.traverseLayers(
      callback, [...components.map((activeComponent) => activeComponent.componentPreviewStructure.layers)]);
  }
  
  private static traversePaddingComponentChild(callback: TraversalCallback, paddingChildren: WorkshopComponent[]): void {
    TraverseComponentsViaFullPreviewStructure.traverseComponent(callback, paddingChildren);
    for (let i = 0; i < paddingChildren[0].linkedComponents.auxiliary.length; i += 1) {
      TraverseComponentsViaFullPreviewStructure.traverseComponent(
        callback, [...paddingChildren.map((paddingChild) => paddingChild.linkedComponents.auxiliary[i])]);
    }
  }

  public static traverseSameComponentTypes(callback: TraversalCallback, ...components: WorkshopComponent[]): void {
    TraverseComponentsViaFullPreviewStructure.traverseComponent(callback, components);
    if (components[0].paddingComponentChild) {
      TraverseComponentsViaFullPreviewStructure.traversePaddingComponentChild(
        callback, [...components.map((component) => component.paddingComponentChild)]);
    }
  }
}

/*

if there are performance issues with the use of map and arbitrary array lengths - please refer to the following
initial implementation of traversal made specifically for two components:

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
*/
