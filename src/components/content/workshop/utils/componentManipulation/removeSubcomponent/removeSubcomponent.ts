import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { TargetDetails, ComponentTraversalState } from '../../../../../../interfaces/componentTraversal';
import { UpdateGenericComponentNames } from '../updateNestedComponentNames/updateGenericComponentNames';
import { UpdateLayerComponentNames } from '../updateNestedComponentNames/updateLayerComponentNames';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { InterconnectedSettings } from '../../interconnectedSettings/interconnectedSettings';
import { AlignedSections } from '../../../../../../interfaces/componentPreviewStructure';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

type SelectNewSubcomponentCallback = (parentSubcomponentName: string) => void;

export class RemoveSubcomponent {

  private static updateDropdownOptionNames(targetDetails: TargetDetails, subcomponentDropdownStructure: NestedDropdownStructure,
      removedSubcomponentDropdownIndex: number, alignedSections: AlignedSections): void {
    const { parentComponent, targetSubcomponentProperties: { subcomponentType } } = targetDetails;
    if (subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      UpdateGenericComponentNames.update(parentComponent, subcomponentDropdownStructure, alignedSections);
    } else {
      UpdateLayerComponentNames.update(parentComponent, removedSubcomponentDropdownIndex);
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
    RemoveSubcomponent.removeSubcomponents(componentTraversalState, parentComponent);
    return componentTraversalState;
  }

  private static updateDropdownOptions(dropdownOptionNamesStack: string[], selectNewSubcomponentCallback?: SelectNewSubcomponentCallback): void {
    if (selectNewSubcomponentCallback) selectNewSubcomponentCallback(dropdownOptionNamesStack[dropdownOptionNamesStack.length - 2]);
  }

  private static removeNestedComponent(componentTraversalState: ComponentTraversalState, targetDetails: TargetDetails): void {
    const { dropdownOptionName, subcomponentDropdownStructure, dropdownOptionNamesStack } = componentTraversalState;
    RemoveSubcomponent.updateDropdownOptions(dropdownOptionNamesStack, targetDetails.callback);
    RemoveSubcomponent.removeSubcomponents(componentTraversalState, targetDetails.parentComponent);
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      subcomponentDropdownStructure[dropdownOptionName] as NestedDropdownStructure,
      RemoveSubcomponent.removeNestedComponentNestedComponents.bind(targetDetails));
    delete subcomponentDropdownStructure[dropdownOptionName];
  }

  private static removeSubcomponentNameFromSubcomponentNameToDropdownOptionNameMap(targetDetails: TargetDetails): void {
    const { parentComponent, targetSubcomponentName } = targetDetails;
    delete parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[targetSubcomponentName];
  }

  private static removeNestedComponentUsingDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentDropdownStructure } = componentTraversalState;
    const targetDetails = this as any as TargetDetails;
    if (ComponentTraversalUtils.isActualObjectNameMatching(targetDetails, componentTraversalState)) {
      RemoveSubcomponent.removeSubcomponentNameFromSubcomponentNameToDropdownOptionNameMap(targetDetails);
      const removedSubcomponentDropdownIndex = Object.keys(subcomponentDropdownStructure).indexOf(targetDetails.targetDropdownOptionName);
      RemoveSubcomponent.removeNestedComponent(componentTraversalState, targetDetails);
      RemoveSubcomponent.updateDropdownOptionNames(targetDetails, subcomponentDropdownStructure, removedSubcomponentDropdownIndex,
        targetDetails.parentLayerAlignedSections);
      return componentTraversalState;
    }
    return null;
  }

  private static removeNestedComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
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

  public static remove(parentComponent: WorkshopComponent, targetSubcomponentName: string, selectNewSubcomponentCallback?: SelectNewSubcomponentCallback): void {
    const targetDetails = ComponentTraversalUtils.generateTargetDetails(
      parentComponent, {targetSubcomponentName, callback: selectNewSubcomponentCallback })
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      parentComponent.componentPreviewStructure,
      RemoveSubcomponent.removeNestedComponentInPreviewStructureIfFound.bind(targetDetails));
    if (traversalResult) targetDetails.parentLayerAlignedSections = traversalResult.alignedSections;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      parentComponent.componentPreviewStructure.subcomponentDropdownStructure,
      RemoveSubcomponent.removeNestedComponentUsingDropdownStructureIfFound.bind(targetDetails));
  }
}
