import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownOptionDisplayStatus';
import { UpdateGenericComponentDropdownOptionNames } from '../../updateChildComponent/updateGenericComponentDropdownOptionNames';
import { AlignedSections, BaseSubcomponentRef, Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentTraversalState, TargetDetails } from '../../../../../../../interfaces/componentTraversal';
import { UpdateLayerDropdownOptionNames } from '../../updateChildComponent/updateLayerDropdownOptionNames';
import { DecrementChildComponentCount } from '../../childComponentCount/decrementChildComponentCount';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { CoreSubcomponentRefsUtils } from '../../coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { InterconnectedSettings } from '../../../interconnectedSettings/interconnectedSettings';
import ComponentTraversalUtils from '../../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
import { SetNewActiveSubcomponent } from '../../utils/setNewActiveSubcomponent';
import { SubcomponentTriggers } from '../../utils/subcomponentTriggers';

type TargetRemovalDetails = TargetDetails & { isRemovingActiveSubcomponent?: boolean, masterComponent?: WorkshopComponent };

export class RemoveAnyChildComponent {

  // WORK1 - copy
  private static removeCoreSubcomponentRef(parentComponent: WorkshopComponent, removedSubcomponentProperties: SubcomponentProperties): void {
    const { coreSubcomponentRefs } = parentComponent;
    const coreSubcomponentToBeRemoved = CoreSubcomponentRefsUtils.getActiveRefKeys(coreSubcomponentRefs)
      .find((subcomponentType) => coreSubcomponentRefs[subcomponentType] === removedSubcomponentProperties);
    if (coreSubcomponentToBeRemoved) coreSubcomponentRefs[coreSubcomponentToBeRemoved] = null;
  }

  private static updateDropdownOptionNames(targetDetails: TargetRemovalDetails, subcomponentDropdownStructure: NestedDropdownStructure,
      removedSubcomponentDropdownIndex: number, alignedSections: AlignedSections): void {
    const { containerComponent, targetSubcomponentProperties: { subcomponentType } } = targetDetails;
    if (subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      UpdateGenericComponentDropdownOptionNames.updateViaParentLayerDropdownStructure(containerComponent, subcomponentDropdownStructure, alignedSections);
    } else {
      UpdateLayerDropdownOptionNames.update(containerComponent, removedSubcomponentDropdownIndex);
    }
  }

  private static getDropdownOptionNames(nestedDropdownStructure: NestedDropdownStructure): string[] {
    return Object.keys(nestedDropdownStructure).filter((buttonName) => buttonName !== DROPDOWN_OPTION_AUX_DETAILS_REF);
  }

  private static selectSiblingSubcomponent(containerComponent: WorkshopComponent, dropdownOptions: string[],
      componentTraversalState: ComponentTraversalState): void {
    const { dropdownOptionName, subcomponentDropdownStructure } = componentTraversalState;
    const currentDropdownOptionIndex = dropdownOptions.indexOf(dropdownOptionName);
    const newDropdownOptionName = currentDropdownOptionIndex === dropdownOptions.length - 1
      ? dropdownOptions[currentDropdownOptionIndex - 1] : dropdownOptions[currentDropdownOptionIndex + 1];
    const newSubcomponentName = (subcomponentDropdownStructure[newDropdownOptionName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).actualObjectName;
    SetNewActiveSubcomponent.set(containerComponent, newSubcomponentName);
  }

  private static selectNewActiveSubcomponent(componentTraversalState: ComponentTraversalState, containerComponent: WorkshopComponent,
      parentSubcomponentName: string, dropdownOptions: string[]): void {
    if (dropdownOptions.length === 1) {
      SetNewActiveSubcomponent.set(containerComponent, parentSubcomponentName);
    } else {
      RemoveAnyChildComponent.selectSiblingSubcomponent(containerComponent, dropdownOptions, componentTraversalState);
    }
  }

  private static getParentSubcomponentName(containerComponent: WorkshopComponent, dropdownOptionDetailsStack: DropdownOptionAuxDetails[]): string {
    const parentDropdownOptionDetails = dropdownOptionDetailsStack[dropdownOptionDetailsStack.length - 2];
    return parentDropdownOptionDetails?.actualObjectName || containerComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
  }

  private static removeDropdownStructure(componentTraversalState: ComponentTraversalState, targetDetails: TargetRemovalDetails,
      dropdownOptions: string[]): void {
    const { dropdownOptionName, subcomponentDropdownStructure, dropdownOptionDetailsStack } = componentTraversalState;
    const { masterComponent, isRemovingActiveSubcomponent } = targetDetails;
    if (isRemovingActiveSubcomponent) {
      const parentSubcomponentName = RemoveAnyChildComponent.getParentSubcomponentName(masterComponent, dropdownOptionDetailsStack);
      RemoveAnyChildComponent.selectNewActiveSubcomponent(componentTraversalState, masterComponent, parentSubcomponentName, dropdownOptions);
    }
    delete subcomponentDropdownStructure[dropdownOptionName];
  }

  private static removeChildComponentUsingDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentDropdownStructure } = componentTraversalState;
    const targetDetails = this as any as TargetRemovalDetails;
    if (ComponentTraversalUtils.isActualObjectNameMatching(targetDetails, componentTraversalState)) {
      const dropdownOptions = RemoveAnyChildComponent.getDropdownOptionNames(subcomponentDropdownStructure);
      const removedSubcomponentDropdownIndex = dropdownOptions.indexOf(targetDetails.targetDropdownOptionName);
      RemoveAnyChildComponent.removeDropdownStructure(componentTraversalState, targetDetails, dropdownOptions);
      RemoveAnyChildComponent.updateDropdownOptionNames(targetDetails, subcomponentDropdownStructure, removedSubcomponentDropdownIndex,
        targetDetails.parentLayerAlignedSections);
      return componentTraversalState;
    }
    return null;
  }

  private static removeSubcomponentProperties(subcomponentName: string, masterComponent: WorkshopComponent): void {
    // if temp component
    if (!masterComponent) return;
    delete masterComponent.subcomponents[subcomponentName];
    delete masterComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[subcomponentName];
  }

  private static removeLayerComponents(layer: Layer, masterComponent: WorkshopComponent, containerComponent: WorkshopComponent): void {
    const { alignedSections } = layer.sections;
    if (alignedSections) {
      Object.keys(alignedSections).forEach((sectionName) => {
        const baseSubcomponents: BaseSubcomponentRef[] = alignedSections[sectionName];
        baseSubcomponents.forEach((baseSubcomponent) => {
          RemoveAnyChildComponent.removeAlignedComponents(baseSubcomponent.subcomponentProperties, masterComponent, containerComponent);
        });
      });
      const layerName = layer.subcomponentProperties.name;
      DecrementChildComponentCount.decrement(layer.subcomponentProperties.seedComponent.containerComponent, layerName);
      RemoveAnyChildComponent.removeSubcomponentProperties(layerName, masterComponent);
    }
  }

  private static removeAlignedComponents(subcomponentProperties: SubcomponentProperties, masterComponent: WorkshopComponent,
      containerComponent: WorkshopComponent): void {
    const { seedComponent, name } = subcomponentProperties;
    seedComponent.componentPreviewStructure.layers.forEach((layer) => {
      RemoveAnyChildComponent.removeLayerComponents(layer, masterComponent, containerComponent);
    });
    // a child component can be counted by either the parent layer or the container component, hence need to make sure the count is
    // decremented at both of these components
    DecrementChildComponentCount.decrement(seedComponent.containerComponent, name);
    DecrementChildComponentCount.decrement(subcomponentProperties.parentLayer.subcomponentProperties.seedComponent, name);
    RemoveAnyChildComponent.removeSubcomponentProperties(name, masterComponent);
  }

  protected static removeChildComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentProperties, layers, alignedChildComponents, index } = componentTraversalState;
    const { targetSubcomponentProperties, containerComponent, masterComponent } = this as any as TargetRemovalDetails;
    if (targetSubcomponentProperties === subcomponentProperties) {
      if (layers) {
        RemoveAnyChildComponent.removeLayerComponents(layers[index], masterComponent, containerComponent);
        layers.splice(index, 1);
      }
      if (alignedChildComponents) {
        RemoveAnyChildComponent.removeAlignedComponents(subcomponentProperties, masterComponent, containerComponent);
        alignedChildComponents.splice(index, 1);
        InterconnectedSettings.update(false, containerComponent, subcomponentProperties);
      }
      return componentTraversalState;
    }
    return null;
  }

  public static remove(parentComponent: WorkshopComponent, subcomponentName: string, isRemovingActiveSubcomponent = false): void {
    const { higherActiveComponentContainer, masterComponent } = ActiveComponentUtils.getHigherLevelComponents(parentComponent);
    const targetDetails: TargetRemovalDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent,
      subcomponentName || parentComponent.activeSubcomponentName);
    targetDetails.isRemovingActiveSubcomponent = isRemovingActiveSubcomponent;
    targetDetails.masterComponent = masterComponent;
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      higherActiveComponentContainer.componentPreviewStructure,
      RemoveAnyChildComponent.removeChildComponentInPreviewStructureIfFound.bind(targetDetails));
    if (traversalResult) targetDetails.parentLayerAlignedSections = traversalResult.alignedSections;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      targetDetails.masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      RemoveAnyChildComponent.removeChildComponentUsingDropdownStructureIfFound.bind(targetDetails));
    RemoveAnyChildComponent.removeCoreSubcomponentRef(parentComponent, targetDetails.targetSubcomponentProperties);
    SubcomponentTriggers.removeTriggerReferenceFromSubcomponentThatTriggersThis(targetDetails.targetSubcomponentProperties);
  }
}
