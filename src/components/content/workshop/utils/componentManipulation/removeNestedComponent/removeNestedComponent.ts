import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { UpdateGenericComponentDropdownOptionNames } from '../updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { UpdateLayerDropdownOptionNames } from '../updateNestedComponentNames/updateLayerDropdownOptionNames';
import { ComponentTraversalState, TargetDetails } from '../../../../../../interfaces/componentTraversal';
import { DecrementNestedComponentCount } from '../nestedComponentCount/decrementNestedComponentCount';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { InterconnectedSettings } from '../../interconnectedSettings/interconnectedSettings';
import { MultiBaseComponentUtils } from '../../multiBaseComponent/multiBaseComponentUtils';
import { AlignedSections } from '../../../../../../interfaces/componentPreviewStructure';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { StringUtils } from '../../generic/stringUtils';

type TargetRemovalDetails = TargetDetails & { isRemovingActiveSubcomponent?: boolean };

export class RemoveNestedComponent {

  private static updateDropdownOptionNames(targetDetails: TargetRemovalDetails, subcomponentDropdownStructure: NestedDropdownStructure,
      removedSubcomponentDropdownIndex: number, alignedSections: AlignedSections): void {
    const { parentComponent, targetSubcomponentProperties: { subcomponentType } } = targetDetails;
    if (subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      UpdateGenericComponentDropdownOptionNames.updateViaParentLayerDropdownStructure(parentComponent, subcomponentDropdownStructure, alignedSections);
    } else {
      UpdateLayerDropdownOptionNames.update(parentComponent, removedSubcomponentDropdownIndex);
    }
  }

  private static removeSubcomponents(subcomponentDropdownStructure: NestedDropdownStructure, dropdownOptionName: string, parentComponent: WorkshopComponent): void {
    const subcomponentBaseName = (subcomponentDropdownStructure[dropdownOptionName]
      [DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).actualObjectName;
    const activeSubcomponent = parentComponent.subcomponents[subcomponentBaseName];
    Object.keys(activeSubcomponent?.nestedComponent?.ref.subcomponents || {}).forEach((keyName) => {
      delete parentComponent.subcomponents[keyName];
      delete parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[keyName];
    });
  }

  private static removeNestedComponentSubcomponents(parentComponent: WorkshopComponent, nestedComponentBaseName: string,
      nestedDropdownStructure: NestedDropdownStructure, parentSubcomponentName: string): void {
    RemoveNestedComponent.removeSubcomponents(nestedDropdownStructure, nestedComponentBaseName, parentComponent);
    DecrementNestedComponentCount.decrement(parentComponent, StringUtils.getFirstWordInString(nestedComponentBaseName), parentSubcomponentName);
  }

  private static getDropdownOptionNames(nestedDropdownStructure: NestedDropdownStructure): string[] {
    return Object.keys(nestedDropdownStructure).filter((buttonName) => buttonName !== DROPDOWN_OPTION_AUX_DETAILS_REF);
  }

  private static removeNestedComponentNestedComponentsSubcomponents(componentTraversalState: ComponentTraversalState, parentComponent: WorkshopComponent): void {
    const { dropdownOptionName, subcomponentDropdownStructure } = componentTraversalState;
    const dropdownOptionNames = RemoveNestedComponent.getDropdownOptionNames(subcomponentDropdownStructure[dropdownOptionName] as NestedDropdownStructure);
    dropdownOptionNames.forEach((newDropdownName) => {
      RemoveNestedComponent.removeNestedComponentSubcomponents(parentComponent, newDropdownName,
        subcomponentDropdownStructure[dropdownOptionName] as NestedDropdownStructure,
        (subcomponentDropdownStructure[dropdownOptionName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).actualObjectName);
    });
  }

  private static selectSiblingSubcomponent(parentComponent: WorkshopComponent, dropdownOptions: string[],
      componentTraversalState: ComponentTraversalState): void {
    const { dropdownOptionName, subcomponentDropdownStructure } = componentTraversalState;
    const currentDropdownOptionIndex = dropdownOptions.indexOf(dropdownOptionName);
    const newDropdownOptionName = currentDropdownOptionIndex === dropdownOptions.length - 1
      ? dropdownOptions[currentDropdownOptionIndex - 1] : dropdownOptions[currentDropdownOptionIndex + 1];
    const newSubcomponentName = (subcomponentDropdownStructure[newDropdownOptionName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).actualObjectName;
    parentComponent.activeSubcomponentName = newSubcomponentName;
  }

  private static selectNewActiveSubcomponent(componentTraversalState: ComponentTraversalState, parentComponent: WorkshopComponent,
      parentSubcomponentName: string, dropdownOptions: string[]): void {
    if (dropdownOptions.length === 1) {
      parentComponent.activeSubcomponentName = parentSubcomponentName;
    } else {
      RemoveNestedComponent.selectSiblingSubcomponent(parentComponent, dropdownOptions, componentTraversalState);
    }
  }

  private static getParentSubcomponentName(parentComponent: WorkshopComponent, dropdownOptionDetailsStack: DropdownOptionAuxDetails[]): string {
    const parentDropdownOptionDetails = dropdownOptionDetailsStack[dropdownOptionDetailsStack.length - 2];
    return parentDropdownOptionDetails?.actualObjectName || parentComponent.coreSubcomponentRefs.base.name;
  }

  private static removeNestedComponent(componentTraversalState: ComponentTraversalState, targetDetails: TargetRemovalDetails,
      dropdownOptions: string[]): void {
    const { dropdownOptionName, subcomponentDropdownStructure, dropdownOptionDetailsStack } = componentTraversalState;
    const { parentComponent, isRemovingActiveSubcomponent } = targetDetails;
    const parentSubcomponentName = RemoveNestedComponent.getParentSubcomponentName(parentComponent, dropdownOptionDetailsStack);
    if (isRemovingActiveSubcomponent) RemoveNestedComponent.selectNewActiveSubcomponent(componentTraversalState, parentComponent,
      parentSubcomponentName, dropdownOptions);
    RemoveNestedComponent.removeNestedComponentNestedComponentsSubcomponents(componentTraversalState, parentComponent);
    RemoveNestedComponent.removeNestedComponentSubcomponents(parentComponent, dropdownOptionName, subcomponentDropdownStructure, parentSubcomponentName);
    delete subcomponentDropdownStructure[dropdownOptionName];
  }

  private static removeNestedComponentUsingDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentDropdownStructure } = componentTraversalState;
    const targetDetails = this as any as TargetRemovalDetails;
    if (ComponentTraversalUtils.isActualObjectNameMatching(targetDetails, componentTraversalState)) {
      const dropdownOptions = RemoveNestedComponent.getDropdownOptionNames(subcomponentDropdownStructure);
      const removedSubcomponentDropdownIndex = dropdownOptions.indexOf(targetDetails.targetDropdownOptionName);
      RemoveNestedComponent.removeNestedComponent(componentTraversalState, targetDetails, dropdownOptions);
      RemoveNestedComponent.updateDropdownOptionNames(targetDetails, subcomponentDropdownStructure, removedSubcomponentDropdownIndex,
        targetDetails.parentLayerAlignedSections);
      return componentTraversalState;
    }
    return null;
  }

  protected static removeNestedComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentProperties, layers, alignedNestedComponents, index } = componentTraversalState;
    const { targetSubcomponentProperties, parentComponent } = this as any as TargetRemovalDetails;
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

  public static remove(parentComponent: WorkshopComponent, subcomponentName?: string): void {
    const targetDetails: TargetRemovalDetails = ComponentTraversalUtils.generateTargetDetails(parentComponent,
      subcomponentName || parentComponent.activeSubcomponentName);
    targetDetails.isRemovingActiveSubcomponent = !subcomponentName;
    const activeBaseComponent = MultiBaseComponentUtils.getCurrentlyActiveBaseComponent(parentComponent);
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      activeBaseComponent.componentPreviewStructure,
      RemoveNestedComponent.removeNestedComponentInPreviewStructureIfFound.bind(targetDetails));
    if (traversalResult) targetDetails.parentLayerAlignedSections = traversalResult.alignedSections;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      parentComponent.componentPreviewStructure.subcomponentDropdownStructure,
      RemoveNestedComponent.removeNestedComponentUsingDropdownStructureIfFound.bind(targetDetails));
  }
}
