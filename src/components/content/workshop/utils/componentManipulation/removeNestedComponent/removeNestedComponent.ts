import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { UpdateGenericComponentDropdownOptionNames } from '../updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { UpdateLayerDropdownOptionNames } from '../updateNestedComponentNames/updateLayerDropdownOptionNames';
import { ComponentTraversalState, TargetDetails } from '../../../../../../interfaces/componentTraversal';
import { DecrementNestedComponentCount } from '../nestedComponentCount/decrementNesdtedComponentCount';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { InterconnectedSettings } from '../../interconnectedSettings/interconnectedSettings';
import { AlignedSections } from '../../../../../../interfaces/componentPreviewStructure';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { StringUtils } from '../../generic/stringUtils';

export class RemoveNestedComponent {

  private static updateDropdownOptionNames(targetDetails: TargetDetails, subcomponentDropdownStructure: NestedDropdownStructure,
      removedSubcomponentDropdownIndex: number, alignedSections: AlignedSections): void {
    const { parentComponent, targetSubcomponentProperties: { subcomponentType } } = targetDetails;
    if (subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      UpdateGenericComponentDropdownOptionNames.updateViaParentLayerDropdownStructure(parentComponent, subcomponentDropdownStructure, alignedSections);
    } else {
      UpdateLayerDropdownOptionNames.update(parentComponent, removedSubcomponentDropdownIndex);
    }
  }

  private static removeSubcomponents(componentTraversalState: ComponentTraversalState, parentComponent: WorkshopComponent): void {
    const { dropdownOptionName, subcomponentDropdownStructure } = componentTraversalState;
    const subcomponentBaseName = (subcomponentDropdownStructure[dropdownOptionName]
      [DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).actualObjectName;
    const activeSubcomponent = parentComponent.subcomponents[subcomponentBaseName];
    Object.keys(activeSubcomponent?.nestedComponent?.ref.subcomponents|| {}).forEach((keyName) => {
      delete parentComponent.subcomponents[keyName];
    });
  }

  private static removeNestedComponentNestedComponents(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { parentComponent } = this as any as TargetDetails;
    RemoveNestedComponent.removeSubcomponents(componentTraversalState, parentComponent);
    return componentTraversalState;
  }

  private static selectSiblingSubcomponent(parentComponent: WorkshopComponent, dropdownOptions: string[], dropdownOptionName: string,
      subcomponentDropdownStructure: NestedDropdownStructure): void {
    const currentDropdownOptionIndex = dropdownOptions.indexOf(dropdownOptionName);
    const newDropdownOptionName = currentDropdownOptionIndex === dropdownOptions.length - 1
      ? dropdownOptions[currentDropdownOptionIndex - 1] : dropdownOptions[currentDropdownOptionIndex + 1];
    const newSubcomponentName = (subcomponentDropdownStructure[newDropdownOptionName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).actualObjectName;
    parentComponent.activeSubcomponentName = newSubcomponentName;
  }

  private static selectNewActiveSubcomponent(parentComponent: WorkshopComponent, componentTraversalState: ComponentTraversalState,
      parentSubcomponentName: string): void {
    const { dropdownOptionName, subcomponentDropdownStructure } = componentTraversalState;
    const dropdownOptions = Object.keys(subcomponentDropdownStructure).filter((buttonName) => buttonName !== DROPDOWN_OPTION_AUX_DETAILS_REF);
    if (dropdownOptions.length === 1) {
      parentComponent.activeSubcomponentName = parentSubcomponentName;
    } else {
      RemoveNestedComponent.selectSiblingSubcomponent(parentComponent, dropdownOptions, dropdownOptionName, subcomponentDropdownStructure);
    }
  }

  private static getParentSubcomponentName(parentComponent: WorkshopComponent, dropdownOptionDetailsStack: DropdownOptionAuxDetails[]): string {
    const parentDropdownOptionDetails = dropdownOptionDetailsStack[dropdownOptionDetailsStack.length - 2];
    return parentDropdownOptionDetails?.actualObjectName || parentComponent.coreSubcomponentNames.base;
  }

  private static removeNestedComponent(componentTraversalState: ComponentTraversalState, targetDetails: TargetDetails): void {
    const { dropdownOptionName, subcomponentDropdownStructure, dropdownOptionDetailsStack } = componentTraversalState;
    const parentSubcomponentName = RemoveNestedComponent.getParentSubcomponentName(targetDetails.parentComponent, dropdownOptionDetailsStack);
    RemoveNestedComponent.selectNewActiveSubcomponent(targetDetails.parentComponent, componentTraversalState, parentSubcomponentName);
    RemoveNestedComponent.removeSubcomponents(componentTraversalState, targetDetails.parentComponent);
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      subcomponentDropdownStructure[dropdownOptionName] as NestedDropdownStructure,
      RemoveNestedComponent.removeNestedComponentNestedComponents.bind(targetDetails));
    delete subcomponentDropdownStructure[dropdownOptionName];
    DecrementNestedComponentCount.decrement(targetDetails.parentComponent, StringUtils.getFirstWordInString(targetDetails.targetSubcomponentName),
      parentSubcomponentName);
  }

  private static removeSubcomponentNameFromSubcomponentNameToDropdownOptionNameMap(targetDetails: TargetDetails): void {
    const { parentComponent, targetSubcomponentName } = targetDetails;
    delete parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[targetSubcomponentName];
  }

  private static removeNestedComponentUsingDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentDropdownStructure } = componentTraversalState;
    const targetDetails = this as any as TargetDetails;
    if (ComponentTraversalUtils.isActualObjectNameMatching(targetDetails, componentTraversalState)) {
      RemoveNestedComponent.removeSubcomponentNameFromSubcomponentNameToDropdownOptionNameMap(targetDetails);
      const removedSubcomponentDropdownIndex = Object.keys(subcomponentDropdownStructure).indexOf(targetDetails.targetDropdownOptionName);
      RemoveNestedComponent.removeNestedComponent(componentTraversalState, targetDetails);
      RemoveNestedComponent.updateDropdownOptionNames(targetDetails, subcomponentDropdownStructure, removedSubcomponentDropdownIndex,
        targetDetails.parentLayerAlignedSections);
      return componentTraversalState;
    }
    return null;
  }

  protected static removeNestedComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentProperties, layers, alignedNestedComponents, index } = componentTraversalState;
    const { targetSubcomponentProperties, parentComponent } = this as any as TargetDetails;
    if (targetSubcomponentProperties === subcomponentProperties) {
      if (layers) layers.splice(index, 1);
      if (alignedNestedComponents) {
        alignedNestedComponents.splice(index, 1);
        InterconnectedSettings.update(false, parentComponent, subcomponentProperties);
      }
      return componentTraversalState;
    }
    return null;
  }

  public static remove(parentComponent: WorkshopComponent): void {
    const targetDetails: TargetDetails = ComponentTraversalUtils.generateTargetDetails(parentComponent, parentComponent.activeSubcomponentName);
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      parentComponent.componentPreviewStructure,
      RemoveNestedComponent.removeNestedComponentInPreviewStructureIfFound.bind(targetDetails));
    if (traversalResult) targetDetails.parentLayerAlignedSections = traversalResult.alignedSections;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      parentComponent.componentPreviewStructure.subcomponentDropdownStructure,
      RemoveNestedComponent.removeNestedComponentUsingDropdownStructureIfFound.bind(targetDetails));
  }
}
