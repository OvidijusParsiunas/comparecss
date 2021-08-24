import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownOptionDisplayStatus';
import { UpdateGenericComponentDropdownOptionNames } from '../../updateChildComponent/updateGenericComponentDropdownOptionNames';
import { ComponentTraversalState, TargetDetails } from '../../../../../../../interfaces/componentTraversal';
import { UpdateLayerDropdownOptionNames } from '../../updateChildComponent/updateLayerDropdownOptionNames';
import { DecrementChildComponentCount } from '../../childComponentCount/decrementChildComponentCount';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { InterconnectedSettings } from '../../../interconnectedSettings/interconnectedSettings';
import { AlignedSections } from '../../../../../../../interfaces/componentPreviewStructure';
import ComponentTraversalUtils from '../../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
import { StringUtils } from '../../../generic/stringUtils';

type TargetRemovalDetails = TargetDetails & { isRemovingActiveSubcomponent?: boolean, masterComponent?: WorkshopComponent };

export class RemoveAnyChildComponent {

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
    Object.keys(activeSubcomponent?.seedComponent?.ref.subcomponents || {}).forEach((keyName) => {
      delete parentComponent.subcomponents[keyName];
      delete parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[keyName];
    });
  }

  private static removeChildComponentSubcomponents(childComponentBaseName: string, nestedDropdownStructure: NestedDropdownStructure,
      parentSubcomponentName: string, masterComponent: WorkshopComponent, parentComponent: WorkshopComponent): void {
    RemoveAnyChildComponent.removeSubcomponents(nestedDropdownStructure, childComponentBaseName, masterComponent);
    DecrementChildComponentCount.decrement(parentComponent, StringUtils.getFirstWordInString(childComponentBaseName), parentSubcomponentName);
  }

  private static getDropdownOptionNames(nestedDropdownStructure: NestedDropdownStructure): string[] {
    return Object.keys(nestedDropdownStructure).filter((buttonName) => buttonName !== DROPDOWN_OPTION_AUX_DETAILS_REF);
  }

  // WORK1: check if this removes all child components children completely
  private static removeChildComponentChildComponentsSubcomponents(componentTraversalState: ComponentTraversalState, masterComponent: WorkshopComponent,
      parentComponent: WorkshopComponent): void {
    const { dropdownOptionName, subcomponentDropdownStructure } = componentTraversalState;
    const dropdownOptionNames = RemoveAnyChildComponent.getDropdownOptionNames(subcomponentDropdownStructure[dropdownOptionName] as NestedDropdownStructure);
    dropdownOptionNames.forEach((newDropdownName) => {
      RemoveAnyChildComponent.removeChildComponentSubcomponents(newDropdownName,
        subcomponentDropdownStructure[dropdownOptionName] as NestedDropdownStructure,
        (subcomponentDropdownStructure[dropdownOptionName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).actualObjectName,
        masterComponent, parentComponent);
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
      RemoveAnyChildComponent.selectSiblingSubcomponent(parentComponent, dropdownOptions, componentTraversalState);
    }
  }

  private static getParentSubcomponentName(parentComponent: WorkshopComponent, dropdownOptionDetailsStack: DropdownOptionAuxDetails[]): string {
    const parentDropdownOptionDetails = dropdownOptionDetailsStack[dropdownOptionDetailsStack.length - 2];
    return parentDropdownOptionDetails?.actualObjectName || parentComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
  }

  private static removeChildComponent(componentTraversalState: ComponentTraversalState, targetDetails: TargetRemovalDetails,
      dropdownOptions: string[]): void {
    const { dropdownOptionName, subcomponentDropdownStructure, dropdownOptionDetailsStack } = componentTraversalState;
    const { masterComponent, parentComponent, isRemovingActiveSubcomponent, targetSubcomponentProperties } = targetDetails;
    const parentSubcomponentName = RemoveAnyChildComponent.getParentSubcomponentName(masterComponent, dropdownOptionDetailsStack);
    const seedComponent = targetSubcomponentProperties.seedComponent.ref;
    RemoveAnyChildComponent.removeChildComponentChildComponentsSubcomponents(componentTraversalState, masterComponent, seedComponent);
    RemoveAnyChildComponent.removeChildComponentSubcomponents(dropdownOptionName, subcomponentDropdownStructure, parentSubcomponentName, masterComponent, parentComponent);
    if (isRemovingActiveSubcomponent) RemoveAnyChildComponent.selectNewActiveSubcomponent(componentTraversalState, masterComponent,
      parentSubcomponentName, dropdownOptions);
    delete subcomponentDropdownStructure[dropdownOptionName];
  }

  private static removeChildComponentUsingDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentDropdownStructure } = componentTraversalState;
    const targetDetails = this as any as TargetRemovalDetails;
    if (ComponentTraversalUtils.isActualObjectNameMatching(targetDetails, componentTraversalState)) {
      const dropdownOptions = RemoveAnyChildComponent.getDropdownOptionNames(subcomponentDropdownStructure);
      const removedSubcomponentDropdownIndex = dropdownOptions.indexOf(targetDetails.targetDropdownOptionName);
      RemoveAnyChildComponent.removeChildComponent(componentTraversalState, targetDetails, dropdownOptions);
      RemoveAnyChildComponent.updateDropdownOptionNames(targetDetails, subcomponentDropdownStructure, removedSubcomponentDropdownIndex,
        targetDetails.parentLayerAlignedSections);
      return componentTraversalState;
    }
    return null;
  }

  protected static removeChildComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentProperties, layers, alignedChildComponents, index } = componentTraversalState;
    const { targetSubcomponentProperties, parentComponent } = this as any as TargetRemovalDetails;
    if (targetSubcomponentProperties === subcomponentProperties) {
      if (layers) layers.splice(index, 1);
      if (alignedChildComponents) {
        alignedChildComponents.splice(index, 1);
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
    const { activeLinkedComponent, masterComponent } = ActiveComponentUtils.getActiveHighLevelComponents(parentComponent);
    const targetDetails: TargetRemovalDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent,
      subcomponentName || parentComponent.activeSubcomponentName);
    targetDetails.isRemovingActiveSubcomponent = isRemovingActiveSubcomponent;
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      activeLinkedComponent.componentPreviewStructure,
      RemoveAnyChildComponent.removeChildComponentInPreviewStructureIfFound.bind(targetDetails));
    if (traversalResult) targetDetails.parentLayerAlignedSections = traversalResult.alignedSections;
    targetDetails.masterComponent = masterComponent;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      targetDetails.masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      RemoveAnyChildComponent.removeChildComponentUsingDropdownStructureIfFound.bind(targetDetails));
    RemoveAnyChildComponent.removeCoreSubcomponentRef(targetDetails);
    RemoveAnyChildComponent.removeTriggerableSubcomponent(targetDetails);
  }
}
