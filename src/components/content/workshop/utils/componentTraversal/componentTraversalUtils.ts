import { AlignedSections, ComponentPreviewStructure, Layer, NestedSubcomponent } from '../../../../../interfaces/componentPreviewStructure';
import { DROPDOWN_OPTION_DISPLAY_STATUS_REF } from '../../../../../interfaces/dropdownOptionDisplayStatus';
import { NestedDropdownStructure } from '../../../../../interfaces/nestedDropdownStructure';
import { SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import { ALIGNED_SECTION_TYPES } from '../../../../../consts/layerSections.enum';

export interface ComponentTraversalState {
  subcomponentName?: string;
  subcomponentDropdownStructure?: NestedDropdownStructure;
  subcomponentNameStack?: string[];
  subcomponentProperties?: SubcomponentProperties;
  alignedNestedComponents?: NestedSubcomponent[];
  alignedSections?: AlignedSections;
  layers?: Layer[];
  index?: number;
}
type TraverseComponentCallback = (componentTraversalState: ComponentTraversalState) => ComponentTraversalState;

export default class ComponentTraversalUtils {

  private static inspectSubcomponent(subcomponentDropdownStructure: NestedDropdownStructure, index: number,
      callback: TraverseComponentCallback, subcomponentNameStack: string[], subcomponentName: string): ComponentTraversalState {
    if (subcomponentName === DROPDOWN_OPTION_DISPLAY_STATUS_REF) {
      subcomponentNameStack.splice(subcomponentNameStack.length - 1, 1);
      return null;
    }
    subcomponentNameStack.push(subcomponentName);
    const callbackResult = callback({subcomponentName, subcomponentDropdownStructure, subcomponentNameStack, index});
    if (callbackResult) return callbackResult;
    if (Object.keys(subcomponentDropdownStructure[subcomponentName]).length > 0) {
      const traversalResult = ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
        subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure, callback, subcomponentNameStack);
      if (traversalResult) return traversalResult;
    }
    return null;
  }

  public static traverseComponentUsingDropdownStructure(subcomponentDropdownStructure: NestedDropdownStructure,
      callback: TraverseComponentCallback, subcomponentNameStack?: string[]): ComponentTraversalState {
    if (!subcomponentNameStack) subcomponentNameStack = [];
    const subcomponentDropdownStructureKeys = Object.keys(subcomponentDropdownStructure);
    for (let i = 0; i < subcomponentDropdownStructureKeys.length; i += 1) {
      const subcomponentName = subcomponentDropdownStructureKeys[i];
      const inspectionResult = ComponentTraversalUtils.inspectSubcomponent(subcomponentDropdownStructure, i,
        callback, subcomponentNameStack, subcomponentName);
      if (inspectionResult) return inspectionResult;
    }
    return null;
  }

  private static inspectAlignedNestedComponent(alignedNestedComponents: NestedSubcomponent[], index: number, alignedSections: AlignedSections,
      callback: TraverseComponentCallback): ComponentTraversalState {
    const { subcomponentProperties } = alignedNestedComponents[index];
    const callbackResult = callback({subcomponentProperties, alignedNestedComponents, alignedSections, index});
    if (callbackResult) return callbackResult;
    const { componentPreviewStructure } = subcomponentProperties.nestedComponent.ref;
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(componentPreviewStructure, callback);
    if (traversalResult) return traversalResult;
    return null;
  }

  private static iterateAlignedSections(alignedSections: AlignedSections, callback: TraverseComponentCallback): ComponentTraversalState {
    const alignedSectionKeyValues = Object.keys(ALIGNED_SECTION_TYPES);
    for (let i = 0; i < alignedSectionKeyValues.length; i += 1) {
      const alignedNestedComponents = alignedSections[ALIGNED_SECTION_TYPES[alignedSectionKeyValues[i]]];
      for (let i = 0; i < alignedNestedComponents.length; i += 1) {
        const iterationResult = ComponentTraversalUtils.inspectAlignedNestedComponent(alignedNestedComponents, i, alignedSections, callback);
        if (iterationResult) return iterationResult;
      }
    }
    return null;
  }

  public static traverseComponentUsingPreviewStructure(previewStructure: ComponentPreviewStructure,
      callback: TraverseComponentCallback): ComponentTraversalState {
    const { layers } = previewStructure;
    for (let i = 0; i < layers.length; i += 1) {
      const { sections: { alignedSections }, subcomponentProperties } = layers[i];
      const callbackResult = callback({subcomponentProperties, layers, index: i});
      if (callbackResult) return callbackResult;
      const iterationResult = ComponentTraversalUtils.iterateAlignedSections(alignedSections, callback);
      if (iterationResult) return iterationResult;
    }
    return null;
  }
}
