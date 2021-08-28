import { AlignedSections, ComponentPreviewStructure, BaseSubcomponentRef } from '../../../../../interfaces/componentPreviewStructure';
import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../interfaces/dropdownOptionDisplayStatus';
import { TargetDetails, ComponentTraversalState } from '../../../../../interfaces/componentTraversal';
import { NestedDropdownStructure } from '../../../../../interfaces/nestedDropdownStructure';
import { ALIGNED_SECTION_TYPES } from '../../../../../consts/layerSections.enum';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';

type TraverseComponentCallback = (componentTraversalState: ComponentTraversalState) => ComponentTraversalState;

export default class ComponentTraversalUtils {

  public static generateTargetDetails(containerComponent: WorkshopComponent, targetSubcomponentName: string): TargetDetails {
    return {
      targetSubcomponentName,
      targetDropdownOptionName: containerComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[targetSubcomponentName],
      containerComponent,
      targetSubcomponentProperties: containerComponent.subcomponents[targetSubcomponentName],
    };
  }

  public static isActualObjectNameMatching(targetDetails: TargetDetails, componentTraversalState: ComponentTraversalState): boolean {
    const { dropdownOptionName, subcomponentDropdownStructure } = componentTraversalState;
    const { targetDropdownOptionName, targetSubcomponentName } = targetDetails;
    if (targetDropdownOptionName !== dropdownOptionName) return false;
    // if there is no DROPDOWN_OPTION_AUX_DETAILS_REF - the component can be considered as the base and return true
    const { actualObjectName } = subcomponentDropdownStructure[dropdownOptionName]?.[DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails || {};
    if (actualObjectName) return targetSubcomponentName === actualObjectName;
    return true;
  }

  private static inspectSubcomponent(subcomponentDropdownStructure: NestedDropdownStructure, index: number,
      callback: TraverseComponentCallback, dropdownOptionDetailsStack: DropdownOptionAuxDetails[], dropdownOptionName: string): ComponentTraversalState {
    if (dropdownOptionName === DROPDOWN_OPTION_AUX_DETAILS_REF) return null;
    const callbackResult = callback({dropdownOptionName, subcomponentDropdownStructure, dropdownOptionDetailsStack, index});
    if (callbackResult) return callbackResult;
    if (Object.keys(subcomponentDropdownStructure[dropdownOptionName]).length > 0) {
      dropdownOptionDetailsStack.push(null);
      const traversalResult = ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
        subcomponentDropdownStructure[dropdownOptionName] as NestedDropdownStructure, callback, dropdownOptionDetailsStack);
      if (traversalResult) return traversalResult;
      dropdownOptionDetailsStack.splice(dropdownOptionDetailsStack.length - 1, 1);
    }
    return null;
  }

  public static traverseComponentUsingDropdownStructure(subcomponentDropdownStructure: NestedDropdownStructure,
      callback: TraverseComponentCallback, dropdownOptionDetailsStack?: DropdownOptionAuxDetails[]): ComponentTraversalState {
    if (!dropdownOptionDetailsStack) dropdownOptionDetailsStack = [null];
    const subcomponentDropdownStructureKeys = Object.keys(subcomponentDropdownStructure);
    for (let i = 0; i < subcomponentDropdownStructureKeys.length; i += 1) {
      const subcomponentName = subcomponentDropdownStructureKeys[i];
      dropdownOptionDetailsStack[dropdownOptionDetailsStack.length - 1] = subcomponentDropdownStructure
        [subcomponentName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails;
      const inspectionResult = ComponentTraversalUtils.inspectSubcomponent(subcomponentDropdownStructure, i,
        callback, dropdownOptionDetailsStack, subcomponentName);
      if (inspectionResult) return inspectionResult;
    }
    return null;
  }

  private static inspectAlignedChildComponent(alignedChildComponents: BaseSubcomponentRef[], index: number, alignedSections: AlignedSections,
      callback: TraverseComponentCallback): ComponentTraversalState {
    const { subcomponentProperties } = alignedChildComponents[index];
    const callbackResult = callback({subcomponentProperties, alignedChildComponents, alignedSections, index});
    if (callbackResult) return callbackResult;
    const { componentPreviewStructure } = subcomponentProperties.seedComponent;
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(componentPreviewStructure, callback);
    if (traversalResult) return traversalResult;
    return null;
  }

  private static iterateAlignedSections(alignedSections: AlignedSections, callback: TraverseComponentCallback): ComponentTraversalState {
    const alignedSectionKeyValues = Object.keys(ALIGNED_SECTION_TYPES);
    for (let i = 0; i < alignedSectionKeyValues.length; i += 1) {
      const alignedChildComponents = alignedSections[ALIGNED_SECTION_TYPES[alignedSectionKeyValues[i]]];
      for (let i = 0; i < alignedChildComponents.length; i += 1) {
        const iterationResult = ComponentTraversalUtils.inspectAlignedChildComponent(alignedChildComponents, i, alignedSections, callback);
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
