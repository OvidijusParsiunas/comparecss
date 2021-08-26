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
import { SubcomponentTriggers } from '../../utils/subcomponentTriggers';
import { StringUtils } from '../../../generic/stringUtils';

type TargetRemovalDetails = TargetDetails & { isRemovingActiveSubcomponent?: boolean, masterComponent?: WorkshopComponent };

export class RemoveAnyChildComponent {

  private static updateDropdownOptionNames(targetDetails: TargetRemovalDetails, subcomponentDropdownStructure: NestedDropdownStructure,
      removedSubcomponentDropdownIndex: number, alignedSections: AlignedSections): void {
    const { containerComponent, targetSubcomponentProperties: { subcomponentType } } = targetDetails;
    if (subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      UpdateGenericComponentDropdownOptionNames.updateViaParentLayerDropdownStructure(containerComponent, subcomponentDropdownStructure, alignedSections);
    } else {
      UpdateLayerDropdownOptionNames.update(containerComponent, removedSubcomponentDropdownIndex);
    }
  }

  private static removeSubcomponents(subcomponentDropdownStructure: NestedDropdownStructure, dropdownOptionName: string, masterComponent: WorkshopComponent): void {
    const subcomponentBaseName = (subcomponentDropdownStructure[dropdownOptionName]
      [DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).actualObjectName;
    const activeSubcomponent = masterComponent.subcomponents[subcomponentBaseName];
    const activeComponentCoreSusbcomponents = activeSubcomponent?.seedComponent?.ref.coreSubcomponentRefs;
    Object.keys(activeComponentCoreSusbcomponents || {}).forEach((keyName) => {
      if (!activeComponentCoreSusbcomponents[keyName]) return;
      const subcomponentName = activeComponentCoreSusbcomponents[keyName].name;
      delete masterComponent.subcomponents[subcomponentName];
      delete masterComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[subcomponentName];
    });
  }

  private static removeChildComponentSubcomponents(newComponentBaseName: string, nestedDropdownStructure: NestedDropdownStructure,
      parentSubcomponentName: string, masterComponent: WorkshopComponent, containerComponent: WorkshopComponent): void {
    RemoveAnyChildComponent.removeSubcomponents(nestedDropdownStructure, newComponentBaseName, masterComponent);
    DecrementChildComponentCount.decrement(containerComponent, StringUtils.getFirstWordInString(newComponentBaseName), parentSubcomponentName);
  }

  private static getDropdownOptionNames(nestedDropdownStructure: NestedDropdownStructure): string[] {
    return Object.keys(nestedDropdownStructure).filter((buttonName) => buttonName !== DROPDOWN_OPTION_AUX_DETAILS_REF);
  }

  // WORK1: check if this removes all child components children completely
  private static removeChildComponentChildComponentsSubcomponents(componentTraversalState: ComponentTraversalState, masterComponent: WorkshopComponent,
      containerComponent: WorkshopComponent): void {
    const { dropdownOptionName, subcomponentDropdownStructure } = componentTraversalState;
    const dropdownOptionNames = RemoveAnyChildComponent.getDropdownOptionNames(subcomponentDropdownStructure[dropdownOptionName] as NestedDropdownStructure);
    dropdownOptionNames.forEach((newDropdownName) => {
      RemoveAnyChildComponent.removeChildComponentSubcomponents(newDropdownName,
        subcomponentDropdownStructure[dropdownOptionName] as NestedDropdownStructure,
        (subcomponentDropdownStructure[dropdownOptionName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).actualObjectName,
        masterComponent, containerComponent);
    });
  }

  private static selectSiblingSubcomponent(containerComponent: WorkshopComponent, dropdownOptions: string[],
      componentTraversalState: ComponentTraversalState): void {
    const { dropdownOptionName, subcomponentDropdownStructure } = componentTraversalState;
    const currentDropdownOptionIndex = dropdownOptions.indexOf(dropdownOptionName);
    const newDropdownOptionName = currentDropdownOptionIndex === dropdownOptions.length - 1
      ? dropdownOptions[currentDropdownOptionIndex - 1] : dropdownOptions[currentDropdownOptionIndex + 1];
    const newSubcomponentName = (subcomponentDropdownStructure[newDropdownOptionName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).actualObjectName;
    containerComponent.activeSubcomponentName = newSubcomponentName;
  }

  private static selectNewActiveSubcomponent(componentTraversalState: ComponentTraversalState, containerComponent: WorkshopComponent,
      parentSubcomponentName: string, dropdownOptions: string[]): void {
    if (dropdownOptions.length === 1) {
      containerComponent.activeSubcomponentName = parentSubcomponentName;
    } else {
      RemoveAnyChildComponent.selectSiblingSubcomponent(containerComponent, dropdownOptions, componentTraversalState);
    }
  }

  private static getParentSubcomponentName(containerComponent: WorkshopComponent, dropdownOptionDetailsStack: DropdownOptionAuxDetails[]): string {
    const parentDropdownOptionDetails = dropdownOptionDetailsStack[dropdownOptionDetailsStack.length - 2];
    return parentDropdownOptionDetails?.actualObjectName || containerComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
  }

  private static removeChildComponent(componentTraversalState: ComponentTraversalState, targetDetails: TargetRemovalDetails,
      dropdownOptions: string[]): void {
    const { dropdownOptionName, subcomponentDropdownStructure, dropdownOptionDetailsStack } = componentTraversalState;
    const { masterComponent, containerComponent, isRemovingActiveSubcomponent, targetSubcomponentProperties } = targetDetails;
    const parentSubcomponentName = RemoveAnyChildComponent.getParentSubcomponentName(masterComponent, dropdownOptionDetailsStack);
    const seedComponent = targetSubcomponentProperties.seedComponent.ref;
    RemoveAnyChildComponent.removeChildComponentChildComponentsSubcomponents(componentTraversalState, masterComponent, seedComponent);
    RemoveAnyChildComponent.removeChildComponentSubcomponents(dropdownOptionName, subcomponentDropdownStructure, parentSubcomponentName, masterComponent, containerComponent);
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
    const { targetSubcomponentProperties, containerComponent } = this as any as TargetRemovalDetails;
    if (targetSubcomponentProperties === subcomponentProperties) {
      if (layers) layers.splice(index, 1);
      if (alignedChildComponents) {
        alignedChildComponents.splice(index, 1);
        InterconnectedSettings.update(false, containerComponent, subcomponentProperties);
      }
      return componentTraversalState;
    }
    return null;
  }

  // WORK1 - copy/add core subcomponent ref
  private static removeCoreSubcomponentRef(targetDetails: TargetRemovalDetails): void {
    const { containerComponent: { coreSubcomponentRefs }, targetSubcomponentProperties } = targetDetails;
    const coreSubcomponent = Object.keys(coreSubcomponentRefs).find((coreSubcomponentKey) => coreSubcomponentRefs[coreSubcomponentKey] === targetSubcomponentProperties);
    if (coreSubcomponent) coreSubcomponentRefs[coreSubcomponent] = null;
  }

  public static remove(parentComponent: WorkshopComponent, subcomponentName: string, isRemovingActiveSubcomponent = false): void {
    const { higherActiveComponentContainer, masterComponent } = ActiveComponentUtils.getHigherLevelComponents(parentComponent);
    const targetDetails: TargetRemovalDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent,
      subcomponentName || parentComponent.activeSubcomponentName);
    targetDetails.isRemovingActiveSubcomponent = isRemovingActiveSubcomponent;
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      higherActiveComponentContainer.componentPreviewStructure,
      RemoveAnyChildComponent.removeChildComponentInPreviewStructureIfFound.bind(targetDetails));
    if (traversalResult) targetDetails.parentLayerAlignedSections = traversalResult.alignedSections;
    targetDetails.masterComponent = masterComponent;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      targetDetails.masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      RemoveAnyChildComponent.removeChildComponentUsingDropdownStructureIfFound.bind(targetDetails));
    RemoveAnyChildComponent.removeCoreSubcomponentRef(targetDetails);
    SubcomponentTriggers.remove(targetDetails.targetSubcomponentProperties);
  }
}
