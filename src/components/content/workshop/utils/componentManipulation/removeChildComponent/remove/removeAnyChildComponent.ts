import { DropdownStructureTraversalState, DropdownTraversalResult, PreviewTraversalResult, ComponentPreviewTraversalState, TargetDetails } from '../../../../../../../interfaces/componentTraversal';
import { TraverseComponentViaPreviewStructureParentFirst } from '../../../componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { AutoSyncedSiblingContainerComponentUtils } from '../../autoSyncedSiblingComponentUtils/autoSyncedSiblingContainerComponentUtils';
import { DecrementChildComponentCountLimitsState } from '../../childComponentCountLimitsState/decrementChildComponentCountLimitsState';
import { DropdownItemAuxDetails, DROPDOWN_ITEM_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownItemDisplayStatus';
import { UpdateContainerComponentDropdownItemNames } from '../../updateChildComponent/updateContainerComponentDropdownItemNames';
import { TraverseComponentViaDropdownStructure } from '../../../componentTraversal/traverseComponentViaDropdownStructure';
import { SyncChildComponentUtils } from '../../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { AlignmentSectionToComponents, Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { UpdateLayerDropdownItemNames } from '../../updateChildComponent/updateLayerDropdownItemNames';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { InterconnectedSettings } from '../../../interconnectedSettings/interconnectedSettings';
import ComponentTraversalUtils from '../../../componentTraversal/componentTraversalUtils';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { SetActiveComponentUtils } from '../../utils/setActiveComponentUtils';
import { SubcomponentTriggers } from '../../utils/subcomponentTriggers';

type TargetRemovalDetails = TargetDetails & { isRemovingActiveComponent?: boolean };

export class RemoveAnyChildComponent {

  private static asyncRemove(removedComponent: WorkshopComponent): void {
    setTimeout(() => {
      SyncChildComponentUtils.removeOnSyncComponentFromItsContainer(removedComponent);
      SubcomponentTriggers.removeTriggerReferenceFromSubcomponentThatTriggersThis(removedComponent.baseSubcomponent);
    });
  }

  private static updateDropdownItemNames(targetDetails: TargetRemovalDetails, subcomponentDropdownStructure: NestedDropdownStructure,
      removedComponentDropdownIndex: number, alignedSectionToComponents: AlignmentSectionToComponents, dropdownItems: string[]): void {
    if (dropdownItems.length === 1) return;
    const { masterComponent, targetComponent } = targetDetails;
    if (targetComponent.type !== COMPONENT_TYPES.LAYER) {
      UpdateContainerComponentDropdownItemNames.updateViaParentLayerDropdownStructure(masterComponent, subcomponentDropdownStructure,
        alignedSectionToComponents);
    } else {
      UpdateLayerDropdownItemNames.update(masterComponent, removedComponentDropdownIndex);
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
    const { masterComponent, isRemovingActiveComponent } = targetDetails;
    if (isRemovingActiveComponent) {
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
      const removedComponentDropdownIndex = dropdownItems.indexOf(targetDetails.targetDropdownItemName);
      RemoveAnyChildComponent.removeDropdownStructure(traversalState, targetDetails, dropdownItems);
      RemoveAnyChildComponent.updateDropdownItemNames(targetDetails, subcomponentDropdownStructure, removedComponentDropdownIndex,
        targetDetails.parentLayerAlignmentSectionToComponents, dropdownItems);
      return { stopTraversal: true };
    }
    return {};
  }

  private static triggerOnRemoveFunc(component: WorkshopComponent, masterComponent: WorkshopComponent): void {
    // temporary components do not have the containerComponent property set, however we can use the TargetDetails masterComponent property instead
    // as during the removal of temporary components - masterComponent is their container component
    const deletedComponentContainerComponent = component.containerComponent || masterComponent;
    // the reason why the container is getting passed along seed component is because the containerComponent may not exist because of temp removal
    deletedComponentContainerComponent?.childComponentHandlers.onRemoveFunc?.(component, deletedComponentContainerComponent);
  }

  private static removeSubcomponent(subcomponentName: string, masterComponent: WorkshopComponent): void {
    // if temp component
    if (!masterComponent) return;
    delete masterComponent.subcomponents[subcomponentName];
    delete masterComponent.componentPreviewStructure.subcomponentNameToDropdownItemName[subcomponentName];
  }

  private static removeAlignedComponents(component: WorkshopComponent, masterComponent: WorkshopComponent): void {
    const { baseSubcomponent: { name } } = component;
    component.componentPreviewStructure.layers.forEach((layer) => {
      RemoveAnyChildComponent.removeLayerComponents(layer, masterComponent);
    });
    // a child component can be counted by either the parent layer or the container component, hence need to make sure the count is
    // decremented at both of these components
    DecrementChildComponentCountLimitsState.decrement(component.containerComponent, name);
    DecrementChildComponentCountLimitsState.decrement(component.parentLayer.subcomponent.seedComponent, name);
    RemoveAnyChildComponent.removeSubcomponent(name, masterComponent);
  }

  private static removeLayerComponents(layer: Layer, masterComponent: WorkshopComponent): void {
    const { alignmentSectionToComponents } = layer;
    if (alignmentSectionToComponents) {
      Object.keys(alignmentSectionToComponents).forEach((sectionName) => {
        const components: WorkshopComponent[] = alignmentSectionToComponents[sectionName];
        components.forEach((component) => {
          RemoveAnyChildComponent.removeAlignedComponents(component, masterComponent);
        });
      });
      const layerName = layer.subcomponent.name;
      DecrementChildComponentCountLimitsState.decrement(layer.subcomponent.seedComponent.containerComponent, layerName);
      RemoveAnyChildComponent.removeSubcomponent(layerName, masterComponent);
    }
  }

  private static removeAlignedComponent(alignedComponents: WorkshopComponent[], component: WorkshopComponent,
      masterComponent: WorkshopComponent, index: number): void {
    RemoveAnyChildComponent.removeAlignedComponents(component, masterComponent);
    alignedComponents.splice(index, 1);
    InterconnectedSettings.update(false, masterComponent, component.baseSubcomponent);
    AutoSyncedSiblingContainerComponentUtils.decrementSiblingComponentCount(component);
  }

  private static removeLayer(layers: Layer[], index: number, masterComponent: WorkshopComponent): void {
    RemoveAnyChildComponent.removeLayerComponents(layers[index], masterComponent);
    layers.splice(index, 1);
  }

  protected static removeChildComponentInPreviewStructureIfFound(traversalState: ComponentPreviewTraversalState): PreviewTraversalResult {
    const { component, layers, alignedComponents, index } = traversalState;
    const { targetComponent, masterComponent } = this as any as TargetRemovalDetails;
    if (targetComponent === component) {
      if (layers) RemoveAnyChildComponent.removeLayer(layers, index, masterComponent);
      if (alignedComponents) RemoveAnyChildComponent.removeAlignedComponent(alignedComponents, component, masterComponent, index);
      RemoveAnyChildComponent.triggerOnRemoveFunc(component, masterComponent);
      return { stopTraversal: true, traversalState };
    }
    return {};
  }

  public static remove(parentComponent: WorkshopComponent, subcomponentName: string, isRemovingActiveComponent = false): void {
    const { higherActiveComponentContainer, masterComponent } = ActiveComponentUtils.getHigherLevelComponents(parentComponent);
    const targetDetails: TargetRemovalDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent,
      subcomponentName || parentComponent.activeSubcomponentName);
    targetDetails.isRemovingActiveComponent = isRemovingActiveComponent;
    const { traversalState } = TraverseComponentViaPreviewStructureParentFirst.traverse(
      RemoveAnyChildComponent.removeChildComponentInPreviewStructureIfFound.bind(targetDetails), higherActiveComponentContainer);
    targetDetails.parentLayerAlignmentSectionToComponents = traversalState.alignmentSectionToComponents;
    TraverseComponentViaDropdownStructure.traverse(
      targetDetails.masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      RemoveAnyChildComponent.removeChildComponentUsingDropdownStructureIfFound.bind(targetDetails));
    RemoveAnyChildComponent.asyncRemove(targetDetails.targetComponent);
  }
}
