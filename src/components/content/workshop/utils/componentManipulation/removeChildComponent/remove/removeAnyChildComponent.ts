import { DropdownStructureTraversalState, SubcomponentPreviewTraversalState, TargetDetails, PreviewTraversalResult, DropdownTraversalResult } from '../../../../../../../interfaces/componentTraversal';
import { TraverseComponentViaPreviewStructureParentFirst } from '../../../componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { AutoSyncedSiblingContainerComponentUtils } from '../../autoSyncedSiblingComponentUtils/autoSyncedSiblingContainerComponentUtils';
import { DecrementChildComponentCountLimitsState } from '../../childComponentCountLimitsState/decrementChildComponentCountLimitsState';
import { DropdownItemAuxDetails, DROPDOWN_ITEM_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownItemDisplayStatus';
import { UpdateContainerComponentDropdownItemNames } from '../../updateChildComponent/updateContainerComponentDropdownItemNames';
import { TraverseComponentViaDropdownStructure } from '../../../componentTraversal/traverseComponentViaDropdownStructure';
import { UpdateLayerDropdownItemNames } from '../../updateChildComponent/updateLayerDropdownItemNames';
import { Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AlignedSections, Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { InterconnectedSettings } from '../../../interconnectedSettings/interconnectedSettings';
import ComponentTraversalUtils from '../../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
import { SetActiveComponentUtils } from '../../utils/setActiveComponentUtils';
import { SubcomponentTriggers } from '../../utils/subcomponentTriggers';

type TargetRemovalDetails = TargetDetails & { isRemovingActiveSubcomponent?: boolean };

export class RemoveAnyChildComponent {

  private static asyncUpdateComponentThatTriggerThis(removedSubcomponent: Subcomponent): void {
    setTimeout(() => {
      SubcomponentTriggers.removeTriggerReferenceFromSubcomponentThatTriggersThis(removedSubcomponent);
    });
  }

  private static removeSyncableComponent(parentComponent: WorkshopComponent, removedComponent: WorkshopComponent): void {
    const { onCopy } = parentComponent.sync.syncables;
    if (onCopy) {
      const { type } = removedComponent;
      if (onCopy.uniqueComponents[type]) onCopy.uniqueComponents[type] = null;
    }
  }

  private static updateDropdownItemNames(targetDetails: TargetRemovalDetails, subcomponentDropdownStructure: NestedDropdownStructure,
      removedSubcomponentDropdownIndex: number, alignedSections: AlignedSections, dropdownItems: string[]): void {
    if (dropdownItems.length === 1) return;
    const { masterComponent, targetSubcomponent: { subcomponentType } } = targetDetails;
    if (subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      UpdateContainerComponentDropdownItemNames.updateViaParentLayerDropdownStructure(masterComponent, subcomponentDropdownStructure, alignedSections);
    } else {
      UpdateLayerDropdownItemNames.update(masterComponent, removedSubcomponentDropdownIndex);
    }
  }

  private static getDropdownItemNames(nestedDropdownStructure: NestedDropdownStructure): string[] {
    return Object.keys(nestedDropdownStructure).filter((buttonName) => buttonName !== DROPDOWN_ITEM_AUX_DETAILS_REF);
  }

  private static selectSiblingComponent(masterComponent: WorkshopComponent, dropdownItems: string[],
      traversalState: DropdownStructureTraversalState): void {
    const { dropdownItemName, subcomponentDropdownStructure } = traversalState;
    const currentDropdownItemIndex = dropdownItems.indexOf(dropdownItemName);
    const newDropdownItemName = currentDropdownItemIndex === dropdownItems.length - 1
      ? dropdownItems[currentDropdownItemIndex - 1] : dropdownItems[currentDropdownItemIndex + 1];
    const newSubcomponentName = (subcomponentDropdownStructure[newDropdownItemName][DROPDOWN_ITEM_AUX_DETAILS_REF] as DropdownItemAuxDetails).actualObjectName;
    SetActiveComponentUtils.setActiveSubcomponent(masterComponent, newSubcomponentName);
  }

  private static selectNewActiveSubcomponent(traversalState: DropdownStructureTraversalState, masterComponent: WorkshopComponent,
      parentSubcomponentName: string, dropdownItems: string[]): void {
    if (dropdownItems.length === 1) {
      SetActiveComponentUtils.setActiveSubcomponent(masterComponent, parentSubcomponentName);
    } else {
      RemoveAnyChildComponent.selectSiblingComponent(masterComponent, dropdownItems, traversalState);
    }
  }

  private static getParentSubcomponentName(masterComponent: WorkshopComponent, dropdownItemDetailsStack: DropdownItemAuxDetails[]): string {
    const parentDropdownItemDetails = dropdownItemDetailsStack[dropdownItemDetailsStack.length - 2];
    return parentDropdownItemDetails?.actualObjectName || masterComponent.baseSubcomponent.name;
  }

  private static removeDropdownStructure(traversalState: DropdownStructureTraversalState, targetDetails: TargetRemovalDetails,
      dropdownItems: string[]): void {
    const { dropdownItemName, subcomponentDropdownStructure, dropdownItemDetailsStack } = traversalState;
    const { masterComponent, isRemovingActiveSubcomponent } = targetDetails;
    if (isRemovingActiveSubcomponent) {
      const parentSubcomponentName = RemoveAnyChildComponent.getParentSubcomponentName(masterComponent, dropdownItemDetailsStack);
      RemoveAnyChildComponent.selectNewActiveSubcomponent(traversalState, masterComponent, parentSubcomponentName, dropdownItems);
    }
    delete subcomponentDropdownStructure[dropdownItemName];
  }

  private static removeChildComponentUsingDropdownStructureIfFound(traversalState: DropdownStructureTraversalState): DropdownTraversalResult {
    const { subcomponentDropdownStructure } = traversalState;
    const targetDetails = this as any as TargetRemovalDetails;
    if (TraverseComponentViaDropdownStructure.isActualObjectNameMatching(targetDetails, traversalState)) {
      const dropdownItems = RemoveAnyChildComponent.getDropdownItemNames(subcomponentDropdownStructure);
      const removedSubcomponentDropdownIndex = dropdownItems.indexOf(targetDetails.targetDropdownItemName);
      RemoveAnyChildComponent.removeDropdownStructure(traversalState, targetDetails, dropdownItems);
      RemoveAnyChildComponent.updateDropdownItemNames(targetDetails, subcomponentDropdownStructure, removedSubcomponentDropdownIndex,
        targetDetails.parentLayerAlignedSections, dropdownItems);
      return { stopTraversal: true };
    }
    return {};
  }

  private static removeSubcomponent(subcomponentName: string, masterComponent: WorkshopComponent): void {
    // if temp component
    if (!masterComponent) return;
    delete masterComponent.subcomponents[subcomponentName];
    delete masterComponent.componentPreviewStructure.subcomponentNameToDropdownItemName[subcomponentName];
  }

  private static removeAlignedComponents(subcomponent: Subcomponent, masterComponent: WorkshopComponent,
      containerComponent: WorkshopComponent): void {
    const { seedComponent, name } = subcomponent;
    seedComponent.componentPreviewStructure.layers.forEach((layer) => {
      RemoveAnyChildComponent.removeLayerComponents(layer, masterComponent, containerComponent);
    });
    // a child component can be counted by either the parent layer or the container component, hence need to make sure the count is
    // decremented at both of these components
    DecrementChildComponentCountLimitsState.decrement(seedComponent.containerComponent, name);
    DecrementChildComponentCountLimitsState.decrement(subcomponent.seedComponent.parentLayer.subcomponent.seedComponent, name);
    RemoveAnyChildComponent.removeSubcomponent(name, masterComponent);
  }

  private static removeLayerComponents(layer: Layer, masterComponent: WorkshopComponent, containerComponent: WorkshopComponent): void {
    const { alignedSections } = layer.sections;
    if (alignedSections) {
      Object.keys(alignedSections).forEach((sectionName) => {
        const baseSubcomponents: Subcomponent[] = alignedSections[sectionName];
        baseSubcomponents.forEach((baseSubcomponent) => {
          RemoveAnyChildComponent.removeAlignedComponents(baseSubcomponent, masterComponent, containerComponent);
        });
      });
      const layerName = layer.subcomponent.name;
      DecrementChildComponentCountLimitsState.decrement(layer.subcomponent.seedComponent.containerComponent, layerName);
      RemoveAnyChildComponent.removeSubcomponent(layerName, masterComponent);
    }
  }

  private static removeAlignedSubcomponent(alignedSubcomponents: Subcomponent[], subcomponent: Subcomponent,
      masterComponent: WorkshopComponent, containerComponent: WorkshopComponent, index: number): void {
    RemoveAnyChildComponent.removeAlignedComponents(subcomponent, masterComponent, containerComponent);
    alignedSubcomponents.splice(index, 1);
    InterconnectedSettings.update(false, containerComponent, subcomponent);
    AutoSyncedSiblingContainerComponentUtils.decrementSiblingComponentCount(
      subcomponent.seedComponent.parentLayer, subcomponent.seedComponent);
  }

  private static removeLayer(layers: Layer[], index: number, masterComponent: WorkshopComponent, containerComponent: WorkshopComponent): void {
    RemoveAnyChildComponent.removeLayerComponents(layers[index], masterComponent, containerComponent);
    layers.splice(index, 1);
  }

  protected static removeChildComponentInPreviewStructureIfFound(traversalState: SubcomponentPreviewTraversalState): PreviewTraversalResult {
    const { subcomponent, layers, alignedSubcomponents, index } = traversalState;
    const { targetSubcomponent, containerComponent, masterComponent } = this as any as TargetRemovalDetails;
    if (targetSubcomponent === subcomponent) {
      // containerComponent variable is not always the actual container component (set as masterComponent by the remove method below)
      // when actual container component not available (when temp), the seed component master is usuall the container
      const deletedSubcomponentContainerComponent = subcomponent.seedComponent.containerComponent
        || subcomponent.seedComponent.masterComponent;
      if (layers) RemoveAnyChildComponent.removeLayer(layers, index, masterComponent, containerComponent);
      if (alignedSubcomponents) RemoveAnyChildComponent.removeAlignedSubcomponent(alignedSubcomponents, subcomponent, masterComponent,
        containerComponent, index);
      // the reason why the container is getting passed along seed component is because the containerComponent may not exist because of temp removal
      deletedSubcomponentContainerComponent?.onChildComponentRemovalFunc?.(subcomponent.seedComponent, deletedSubcomponentContainerComponent);
      return { stopTraversal: true, traversalState };
    }
    return {};
  }

  public static remove(parentComponent: WorkshopComponent, subcomponentName: string, isRemovingActiveSubcomponent = false): void {
    const { higherActiveComponentContainer, masterComponent } = ActiveComponentUtils.getHigherLevelComponents(parentComponent);
    const targetDetails: TargetRemovalDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent,
      subcomponentName || parentComponent.activeSubcomponentName);
    targetDetails.isRemovingActiveSubcomponent = isRemovingActiveSubcomponent;
    const { traversalState } = TraverseComponentViaPreviewStructureParentFirst.traverse(
      RemoveAnyChildComponent.removeChildComponentInPreviewStructureIfFound.bind(targetDetails),
      higherActiveComponentContainer);
    if (traversalState) targetDetails.parentLayerAlignedSections = traversalState.alignedSections;
    TraverseComponentViaDropdownStructure.traverse(
      targetDetails.masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      RemoveAnyChildComponent.removeChildComponentUsingDropdownStructureIfFound.bind(targetDetails));
    RemoveAnyChildComponent.removeSyncableComponent(parentComponent, targetDetails.targetSubcomponent.seedComponent);
    RemoveAnyChildComponent.asyncUpdateComponentThatTriggerThis(targetDetails.targetSubcomponent);
  }
}
