import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import ComponentTraversalUtils, { ComponentTraversalState } from '../../componentTraversal/componentTraversalUtils';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateGenericComponentNames } from '../updateNestedComponentNames/updateGenericComponentNames';
import { UpdateLayerComponentNames } from '../updateNestedComponentNames/updateLayerComponentNames';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { InterconnectedSettings } from '../../interconnectedSettings/interconnectedSettings';
import { AlignedSections } from '../../../../../../interfaces/componentPreviewStructure';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';

type SelectNewSubcomponentCallback = (parentSubcomponentName: string) => void;
interface SubcomponentValues {
  selectNewSubcomponentCallback: SelectNewSubcomponentCallback;
  targetSubcomponentName: string;
  targetDropdownOptionName: string;
  parentComponent: WorkshopComponent;
  targetSubcomponentProperties: SubcomponentProperties;
  parentLayerAlignedSections?: AlignedSections;
}

export class RemoveSubcomponent {

  private static updateDropdownOptionNames(subcomponentValues: SubcomponentValues, subcomponentDropdownStructure: NestedDropdownStructure,
      removedSubcomponentDropdownIndex: number, alignedSections: AlignedSections): void {
    const { parentComponent, targetSubcomponentProperties: { subcomponentType } } = subcomponentValues;
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
    const { parentComponent } = this as any as SubcomponentValues;
    RemoveSubcomponent.removeSubcomponents(componentTraversalState, parentComponent);
    return componentTraversalState;
  }

  private static updateDropdownOptions(dropdownOptionNamesStack: string[], selectNewSubcomponentCallback?: SelectNewSubcomponentCallback): void {
    if (selectNewSubcomponentCallback) selectNewSubcomponentCallback(dropdownOptionNamesStack[dropdownOptionNamesStack.length - 2]);
  }

  private static removeNestedComponent(componentTraversalState: ComponentTraversalState, subcomponentValues: SubcomponentValues): void {
    const { dropdownOptionName, subcomponentDropdownStructure, dropdownOptionNamesStack } = componentTraversalState;
    RemoveSubcomponent.updateDropdownOptions(dropdownOptionNamesStack, subcomponentValues.selectNewSubcomponentCallback);
    RemoveSubcomponent.removeSubcomponents(componentTraversalState, subcomponentValues.parentComponent);
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      subcomponentDropdownStructure[dropdownOptionName] as NestedDropdownStructure,
      RemoveSubcomponent.removeNestedComponentNestedComponents.bind(subcomponentValues));
    delete subcomponentDropdownStructure[dropdownOptionName];
  }

  private static removeSubcomponentNameForSubcomponentNameToDropdownOptionNameMap(subcomponentValues: SubcomponentValues): void {
    const { parentComponent, targetSubcomponentName } = subcomponentValues;
    delete parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[targetSubcomponentName];
  }

  private static isActualObjectNameMatching(subcomponentValues: SubcomponentValues, componentTraversalState: ComponentTraversalState): boolean {
    const { dropdownOptionName, subcomponentDropdownStructure } = componentTraversalState;
    const { targetDropdownOptionName } = subcomponentValues;
    if (targetDropdownOptionName !== dropdownOptionName) return false;
    const { actualObjectName } = subcomponentDropdownStructure[dropdownOptionName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails;
    if (actualObjectName) return targetDropdownOptionName !== actualObjectName;
    return true;
  }

  private static removeNestedComponentUsingDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentDropdownStructure } = componentTraversalState;
    const subcomponentValues = this as any as SubcomponentValues;
    if (RemoveSubcomponent.isActualObjectNameMatching(subcomponentValues, componentTraversalState)) {
      RemoveSubcomponent.removeSubcomponentNameForSubcomponentNameToDropdownOptionNameMap(subcomponentValues);
      const removedSubcomponentDropdownIndex = Object.keys(subcomponentDropdownStructure).indexOf(subcomponentValues.targetDropdownOptionName);
      RemoveSubcomponent.removeNestedComponent(componentTraversalState, subcomponentValues);
      RemoveSubcomponent.updateDropdownOptionNames(subcomponentValues, subcomponentDropdownStructure, removedSubcomponentDropdownIndex,
        subcomponentValues.parentLayerAlignedSections);
      return componentTraversalState;
    }
    return null;
  }

  private static removeNestedComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentProperties, layers, alignedNestedComponents, index } = componentTraversalState;
    const { targetSubcomponentProperties, parentComponent } = this as any as SubcomponentValues;
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
    const subcomponentValues: SubcomponentValues = {
      targetSubcomponentName,
      targetDropdownOptionName: parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[targetSubcomponentName],
      selectNewSubcomponentCallback,
      parentComponent,
      targetSubcomponentProperties: parentComponent.subcomponents[targetSubcomponentName],
    };
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      parentComponent.componentPreviewStructure,
      RemoveSubcomponent.removeNestedComponentInPreviewStructureIfFound.bind(subcomponentValues));
    if (traversalResult) subcomponentValues.parentLayerAlignedSections = traversalResult.alignedSections;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      parentComponent.componentPreviewStructure.subcomponentDropdownStructure,
      RemoveSubcomponent.removeNestedComponentUsingDropdownStructureIfFound.bind(subcomponentValues));
  }
}
