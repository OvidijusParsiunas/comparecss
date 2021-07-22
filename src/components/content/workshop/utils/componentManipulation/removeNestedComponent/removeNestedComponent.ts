import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { UpdateGenericComponentDropdownOptionNames } from '../updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { UpdateLayerDropdownOptionNames } from '../updateNestedComponentNames/updateLayerDropdownOptionNames';
import { TargetDetails, ComponentTraversalState } from '../../../../../../interfaces/componentTraversal';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { InterconnectedSettings } from '../../interconnectedSettings/interconnectedSettings';
import { AlignedSections } from '../../../../../../interfaces/componentPreviewStructure';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

type SelectNewSubcomponentCallback = (parentSubcomponentName: string) => void
type RemoveComponentTargetDetails = TargetDetails & { callback?: SelectNewSubcomponentCallback }

export class RemoveNestedComponent {

  private static updateDropdownOptionNames(targetDetails: RemoveComponentTargetDetails, subcomponentDropdownStructure: NestedDropdownStructure,
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
    const { parentComponent } = this as any as RemoveComponentTargetDetails;
    RemoveNestedComponent.removeSubcomponents(componentTraversalState, parentComponent);
    return componentTraversalState;
  }

  private static updateDropdownOptions(dropdownOptionNamesStack: string[], selectNewSubcomponentCallback?: SelectNewSubcomponentCallback): void {
    if (selectNewSubcomponentCallback) selectNewSubcomponentCallback(dropdownOptionNamesStack[dropdownOptionNamesStack.length - 2]);
  }

  private static removeNestedComponent(componentTraversalState: ComponentTraversalState, targetDetails: RemoveComponentTargetDetails): void {
    const { dropdownOptionName, subcomponentDropdownStructure, dropdownOptionNamesStack } = componentTraversalState;
    RemoveNestedComponent.updateDropdownOptions(dropdownOptionNamesStack, targetDetails.callback);
    RemoveNestedComponent.removeSubcomponents(componentTraversalState, targetDetails.parentComponent);
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      subcomponentDropdownStructure[dropdownOptionName] as NestedDropdownStructure,
      RemoveNestedComponent.removeNestedComponentNestedComponents.bind(targetDetails));
    delete subcomponentDropdownStructure[dropdownOptionName];
  }

  private static removeSubcomponentNameFromSubcomponentNameToDropdownOptionNameMap(targetDetails: RemoveComponentTargetDetails): void {
    const { parentComponent, targetSubcomponentName } = targetDetails;
    delete parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[targetSubcomponentName];
  }

  private static removeNestedComponentUsingDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentDropdownStructure } = componentTraversalState;
    const targetDetails = this as any as RemoveComponentTargetDetails;
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

  private static removeNestedComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentProperties, layers, alignedNestedComponents, index } = componentTraversalState;
    const { targetSubcomponentProperties, parentComponent } = this as any as RemoveComponentTargetDetails;
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

  public static remove(parentComponent: WorkshopComponent, selectNewSubcomponentCallback?: SelectNewSubcomponentCallback): void {
    const targetDetails: RemoveComponentTargetDetails = ComponentTraversalUtils.generateTargetDetails(parentComponent);
    targetDetails.callback = selectNewSubcomponentCallback;
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      parentComponent.componentPreviewStructure,
      RemoveNestedComponent.removeNestedComponentInPreviewStructureIfFound.bind(targetDetails));
    if (traversalResult) targetDetails.parentLayerAlignedSections = traversalResult.alignedSections;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      parentComponent.componentPreviewStructure.subcomponentDropdownStructure,
      RemoveNestedComponent.removeNestedComponentUsingDropdownStructureIfFound.bind(targetDetails));
  }
}
