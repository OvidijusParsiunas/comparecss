import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownOptionDisplayStatus';
import { UpdateGenericComponentDropdownOptionNames } from '../../updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { UpdateLayerDropdownOptionNames } from '../../updateNestedComponentNames/updateLayerDropdownOptionNames';
import { ComponentTraversalState, TargetDetails } from '../../../../../../../interfaces/componentTraversal';
import { DecrementNestedComponentCount } from '../../nestedComponentCount/decrementNestedComponentCount';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { InterconnectedSettings } from '../../../interconnectedSettings/interconnectedSettings';
import { AlignedSections } from '../../../../../../../interfaces/componentPreviewStructure';
import ComponentTraversalUtils from '../../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
import { StringUtils } from '../../../generic/stringUtils';

type TargetRemovalDetails = TargetDetails & { isRemovingActiveSubcomponent?: boolean, masterComponent?: WorkshopComponent };

export class RemoveAnyNestedComponent {

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

  private static removeNestedComponentSubcomponents(nestedComponentBaseName: string, nestedDropdownStructure: NestedDropdownStructure,
      parentSubcomponentName: string, masterComponent: WorkshopComponent, nestedComponentParent: WorkshopComponent): void {
    RemoveAnyNestedComponent.removeSubcomponents(nestedDropdownStructure, nestedComponentBaseName, masterComponent);
    DecrementNestedComponentCount.decrement(nestedComponentParent, StringUtils.getFirstWordInString(nestedComponentBaseName), parentSubcomponentName);
  }

  private static getDropdownOptionNames(nestedDropdownStructure: NestedDropdownStructure): string[] {
    return Object.keys(nestedDropdownStructure).filter((buttonName) => buttonName !== DROPDOWN_OPTION_AUX_DETAILS_REF);
  }

  // WORK1: check if this removes all child components children completely
  private static removeNestedComponentNestedComponentsSubcomponents(componentTraversalState: ComponentTraversalState, masterComponent: WorkshopComponent,
      nestedComponentParent: WorkshopComponent): void {
    const { dropdownOptionName, subcomponentDropdownStructure } = componentTraversalState;
    const dropdownOptionNames = RemoveAnyNestedComponent.getDropdownOptionNames(subcomponentDropdownStructure[dropdownOptionName] as NestedDropdownStructure);
    dropdownOptionNames.forEach((newDropdownName) => {
      RemoveAnyNestedComponent.removeNestedComponentSubcomponents(newDropdownName,
        subcomponentDropdownStructure[dropdownOptionName] as NestedDropdownStructure,
        (subcomponentDropdownStructure[dropdownOptionName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).actualObjectName,
        masterComponent, nestedComponentParent);
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
      RemoveAnyNestedComponent.selectSiblingSubcomponent(parentComponent, dropdownOptions, componentTraversalState);
    }
  }

  private static getParentSubcomponentName(parentComponent: WorkshopComponent, dropdownOptionDetailsStack: DropdownOptionAuxDetails[]): string {
    const parentDropdownOptionDetails = dropdownOptionDetailsStack[dropdownOptionDetailsStack.length - 2];
    return parentDropdownOptionDetails?.actualObjectName || parentComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
  }
  // WORK1
  // will need to remove parent subcomponents, nested subcomponents and actual component subcomponents
  // consider moving all subcomponents to core base subcomponent
  private static removeNestedComponent(componentTraversalState: ComponentTraversalState, targetDetails: TargetRemovalDetails,
      dropdownOptions: string[]): void {
    const { dropdownOptionName, subcomponentDropdownStructure, dropdownOptionDetailsStack } = componentTraversalState;
    const { masterComponent, parentComponent, isRemovingActiveSubcomponent, targetSubcomponentProperties } = targetDetails;
    const parentSubcomponentName = RemoveAnyNestedComponent.getParentSubcomponentName(masterComponent, dropdownOptionDetailsStack);
    const nestedComponentParent = targetSubcomponentProperties.nestedComponent.ref;
    RemoveAnyNestedComponent.removeNestedComponentNestedComponentsSubcomponents(componentTraversalState, masterComponent, nestedComponentParent);
    RemoveAnyNestedComponent.removeNestedComponentSubcomponents(dropdownOptionName, subcomponentDropdownStructure, parentSubcomponentName, masterComponent, parentComponent);
    if (isRemovingActiveSubcomponent) RemoveAnyNestedComponent.selectNewActiveSubcomponent(componentTraversalState, masterComponent,
      parentSubcomponentName, dropdownOptions);
    delete subcomponentDropdownStructure[dropdownOptionName];
  }

  private static removeNestedComponentUsingDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentDropdownStructure } = componentTraversalState;
    const targetDetails = this as any as TargetRemovalDetails;
    if (ComponentTraversalUtils.isActualObjectNameMatching(targetDetails, componentTraversalState)) {
      const dropdownOptions = RemoveAnyNestedComponent.getDropdownOptionNames(subcomponentDropdownStructure);
      const removedSubcomponentDropdownIndex = dropdownOptions.indexOf(targetDetails.targetDropdownOptionName);
      RemoveAnyNestedComponent.removeNestedComponent(componentTraversalState, targetDetails, dropdownOptions);
      RemoveAnyNestedComponent.updateDropdownOptionNames(targetDetails, subcomponentDropdownStructure, removedSubcomponentDropdownIndex,
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

  // WORK1 - copy/add core subcomponent ref
  private static removeCoreSubcomponentRef(targetDetails: TargetRemovalDetails): void {
    const { parentComponent: { coreSubcomponentRefs }, targetSubcomponentProperties } = targetDetails;
    const coreSubcomponent = Object.keys(coreSubcomponentRefs).find((coreSubcomponentKey) => coreSubcomponentRefs[coreSubcomponentKey] === targetSubcomponentProperties);
    if (coreSubcomponent) coreSubcomponentRefs[coreSubcomponent] = null;
  }

  // WORK1 - copy/add triggerable subcomponent
  private static removeTriggerableSubcomponent(targetDetails: TargetRemovalDetails): void {
    if (!targetDetails.parentComponent.coreSubcomponentRefs[0]) return;
    const { parentComponent: { coreSubcomponentRefs: { [SUBCOMPONENT_TYPES.BASE]: { otherSubcomponentsToTrigger }}}, targetSubcomponentProperties } = targetDetails;
    const coreSubcomponent = Object.keys(otherSubcomponentsToTrigger || []).find((coreSubcomponentKey) => otherSubcomponentsToTrigger[coreSubcomponentKey] === targetSubcomponentProperties);
    if (coreSubcomponent) otherSubcomponentsToTrigger[coreSubcomponent] = null;
  }

  public static remove(parentComponent: WorkshopComponent, subcomponentName: string, isRemovingActiveSubcomponent = false): void {
    const { activeBaseComponent, masterComponent } = ActiveComponentUtils.getBaseComponents(parentComponent);
    const targetDetails: TargetRemovalDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent,
      subcomponentName || parentComponent.activeSubcomponentName);
    targetDetails.isRemovingActiveSubcomponent = isRemovingActiveSubcomponent;
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      activeBaseComponent.componentPreviewStructure,
      RemoveAnyNestedComponent.removeNestedComponentInPreviewStructureIfFound.bind(targetDetails));
    if (traversalResult) targetDetails.parentLayerAlignedSections = traversalResult.alignedSections;
    targetDetails.masterComponent = masterComponent;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      targetDetails.masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      RemoveAnyNestedComponent.removeNestedComponentUsingDropdownStructureIfFound.bind(targetDetails));
    RemoveAnyNestedComponent.removeCoreSubcomponentRef(targetDetails);
    RemoveAnyNestedComponent.removeTriggerableSubcomponent(targetDetails);
  }
}
