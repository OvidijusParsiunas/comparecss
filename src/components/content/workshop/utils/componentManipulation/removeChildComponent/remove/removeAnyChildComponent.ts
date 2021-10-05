import { TraverseComponentViaPreviewStructureParentFirst } from '../../../componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { DropdownStructureTraversalState, SubcomponentPreviewTraversalState, TargetDetails } from '../../../../../../../interfaces/componentTraversal';
import { DropdownItemAuxDetails, DROPDOWN_ITEM_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownItemDisplayStatus';
import { UpdateGenericComponentDropdownItemNames } from '../../updateChildComponent/updateGenericComponentDropdownItemNames';
import { TraverseComponentViaDropdownStructure } from '../../../componentTraversal/traverseComponentViaDropdownStructure';
import { AlignedSections, BaseSubcomponentRef, Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { UpdateLayerDropdownItemNames } from '../../updateChildComponent/updateLayerDropdownItemNames';
import { DecrementChildComponentCount } from '../../childComponentCount/decrementChildComponentCount';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { InterconnectedSettings } from '../../../interconnectedSettings/interconnectedSettings';
import ComponentTraversalUtils from '../../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
import { SetActiveComponentUtils } from '../../utils/setActiveComponentUtils';
import { SubcomponentTriggers } from '../../utils/subcomponentTriggers';

type TargetRemovalDetails = TargetDetails & { isRemovingActiveSubcomponent?: boolean };

export class RemoveAnyChildComponent {

  private static removeSyncableSubcomponent(parentComponent: WorkshopComponent, removedSubcomponentProperties: SubcomponentProperties): void {
    const { syncables } = parentComponent.sync;
    if (syncables) {
      const { type } = removedSubcomponentProperties.seedComponent;
      if (syncables.subcomponents[type]) syncables.subcomponents[type] = null;
    }
  }

  private static updateDropdownItemNames(targetDetails: TargetRemovalDetails, subcomponentDropdownStructure: NestedDropdownStructure,
      removedSubcomponentDropdownIndex: number, alignedSections: AlignedSections, dropdownItems: string[]): void {
    if (dropdownItems.length === 1) return;
    const { masterComponent, targetSubcomponentProperties: { subcomponentType } } = targetDetails;
    if (subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      UpdateGenericComponentDropdownItemNames.updateViaParentLayerDropdownStructure(masterComponent, subcomponentDropdownStructure, alignedSections);
    } else {
      UpdateLayerDropdownItemNames.update(masterComponent, removedSubcomponentDropdownIndex);
    }
  }

  private static getDropdownItemNames(nestedDropdownStructure: NestedDropdownStructure): string[] {
    return Object.keys(nestedDropdownStructure).filter((buttonName) => buttonName !== DROPDOWN_ITEM_AUX_DETAILS_REF);
  }

  private static selectSiblingSubcomponent(masterComponent: WorkshopComponent, dropdownItems: string[],
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
      RemoveAnyChildComponent.selectSiblingSubcomponent(masterComponent, dropdownItems, traversalState);
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

  private static removeChildComponentUsingDropdownStructureIfFound(traversalState: DropdownStructureTraversalState): DropdownStructureTraversalState {
    const { subcomponentDropdownStructure } = traversalState;
    const targetDetails = this as any as TargetRemovalDetails;
    if (TraverseComponentViaDropdownStructure.isActualObjectNameMatching(targetDetails, traversalState)) {
      const dropdownItems = RemoveAnyChildComponent.getDropdownItemNames(subcomponentDropdownStructure);
      const removedSubcomponentDropdownIndex = dropdownItems.indexOf(targetDetails.targetDropdownItemName);
      RemoveAnyChildComponent.removeDropdownStructure(traversalState, targetDetails, dropdownItems);
      RemoveAnyChildComponent.updateDropdownItemNames(targetDetails, subcomponentDropdownStructure, removedSubcomponentDropdownIndex,
        targetDetails.parentLayerAlignedSections, dropdownItems);
      return traversalState;
    }
    return null;
  }

  private static removeSubcomponentProperties(subcomponentName: string, masterComponent: WorkshopComponent): void {
    // if temp component
    if (!masterComponent) return;
    delete masterComponent.subcomponents[subcomponentName];
    delete masterComponent.componentPreviewStructure.subcomponentNameToDropdownItemName[subcomponentName];
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

  protected static removeChildComponentInPreviewStructureIfFound(traversalState: SubcomponentPreviewTraversalState): SubcomponentPreviewTraversalState {
    const { subcomponentProperties, layers, alignedChildComponents, index } = traversalState;
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
      traversalState.stopTraversal = true;
      return traversalState;
    }
    return null;
  }

  public static remove(parentComponent: WorkshopComponent, subcomponentName: string, isRemovingActiveSubcomponent = false): void {
    const { higherActiveComponentContainer, masterComponent } = ActiveComponentUtils.getHigherLevelComponents(parentComponent);
    const targetDetails: TargetRemovalDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent,
      subcomponentName || parentComponent.activeSubcomponentName);
    targetDetails.isRemovingActiveSubcomponent = isRemovingActiveSubcomponent;
    const traversalResult = TraverseComponentViaPreviewStructureParentFirst.traverse(
      RemoveAnyChildComponent.removeChildComponentInPreviewStructureIfFound.bind(targetDetails),
      higherActiveComponentContainer);
    if (traversalResult) targetDetails.parentLayerAlignedSections = traversalResult.alignedSections;
    TraverseComponentViaDropdownStructure.traverse(
      targetDetails.masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      RemoveAnyChildComponent.removeChildComponentUsingDropdownStructureIfFound.bind(targetDetails));
    RemoveAnyChildComponent.removeSyncableSubcomponent(parentComponent, targetDetails.targetSubcomponentProperties);
    SubcomponentTriggers.removeTriggerReferenceFromSubcomponentThatTriggersThis(targetDetails.targetSubcomponentProperties);
  }
}
