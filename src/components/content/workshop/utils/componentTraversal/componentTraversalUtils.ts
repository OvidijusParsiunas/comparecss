import { AlignedSections, ComponentPreviewStructure, Layer, NestedSubcomponent } from '../../../../../interfaces/componentPreviewStructure';
import { NestedDropdownStructure } from '../../../../../interfaces/nestedDropdownStructure';
import { ENTITY_DISPLAY_STATUS_REF } from '../../../../../interfaces/entityDisplayStatus';
import { SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import { ALIGNED_SECTION_TYPES } from '../../../../../consts/layerSections.enum';

export interface ComponentTraversalState {
  subcomponentName?: string;
  subcomponentDropdownStructure?: NestedDropdownStructure;
  subcomponentNameStack?: string[];
  subcomponentProperties?: SubcomponentProperties;
  alignedNestedComponents?: NestedSubcomponent[];
  layers?: Layer[];
  index?: number;
}
type TraverseComponentCallback = (componentTraversalState: ComponentTraversalState) => boolean;

export default class ComponentTraversalUtils {

  private static inspectSubcomponent(subcomponentDropdownStructure: NestedDropdownStructure, 
      callback: TraverseComponentCallback, subcomponentNameStack: string[], subcomponentName: string): boolean {
    if (subcomponentName === ENTITY_DISPLAY_STATUS_REF) {
      subcomponentNameStack.splice(subcomponentNameStack.length - 1, 1);
      return false;
    }
    subcomponentNameStack.push(subcomponentName);
    if (callback({subcomponentName, subcomponentDropdownStructure, subcomponentNameStack})) return true;
    if (Object.keys(subcomponentDropdownStructure[subcomponentName]).length > 0) {
      if (ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
        subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure, callback, subcomponentNameStack)) return true;
    }
    return false;
  }

  public static traverseComponentUsingDropdownStructure(subcomponentDropdownStructure: NestedDropdownStructure,
      callback: TraverseComponentCallback, subcomponentNameStack?: string[]): boolean {
    if (!subcomponentNameStack) subcomponentNameStack = [];
    const subcomponentDropdownStructureKeys = Object.keys(subcomponentDropdownStructure);
    for (let i = 0; i < subcomponentDropdownStructureKeys.length; i += 1) {
      const subcomponentName = subcomponentDropdownStructureKeys[i];
      if (ComponentTraversalUtils.inspectSubcomponent(subcomponentDropdownStructure,
        callback, subcomponentNameStack, subcomponentName)) return true;
    }
    return false;
  }

  private static inspectAlignedNestedComponent(alignedNestedComponents: NestedSubcomponent[], index: number,
      callback: TraverseComponentCallback): boolean {
    const { subcomponentProperties } = alignedNestedComponents[index];
    if (callback({subcomponentProperties, alignedNestedComponents, index})) return true;
    const { componentPreviewStructure } = subcomponentProperties.nestedComponent.ref;
    if (ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      componentPreviewStructure, callback)) return true;
    return false;
  }

  private static iterateAlignedSections(alignedSections: AlignedSections, callback: TraverseComponentCallback): boolean {
    const alignedSectionKeyValues = Object.keys(ALIGNED_SECTION_TYPES);
    for (let i = 0; i < alignedSectionKeyValues.length; i += 1) {
      const alignedNestedComponents = alignedSections[ALIGNED_SECTION_TYPES[alignedSectionKeyValues[i]]];
      for (let i = 0; i < alignedNestedComponents.length; i += 1) {
        if (ComponentTraversalUtils.inspectAlignedNestedComponent(alignedNestedComponents, i, callback)) return true;
      }
    }
    return false;
  }

  public static traverseComponentUsingPreviewStructure(previewStructure: ComponentPreviewStructure,
      callback: TraverseComponentCallback): boolean {
    const { layers } = previewStructure;
    for (let i = 0; i < layers.length; i += 1) {
      const { sections: { alignedSections }, subcomponentProperties } = layers[i];
      if (callback({subcomponentProperties, layers, index: i})) return true;
      if (ComponentTraversalUtils.iterateAlignedSections(alignedSections, callback)) return true;
    }
    return false;
  }
}
