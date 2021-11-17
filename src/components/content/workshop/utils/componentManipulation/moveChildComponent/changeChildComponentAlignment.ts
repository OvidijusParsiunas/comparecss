import { DropdownStructureTraversalState, DropdownTraversalResult, TargetDetails } from '../../../../../../interfaces/componentTraversal';
import { UpdateContainerComponentDropdownItemNames } from '../updateChildComponent/updateContainerComponentDropdownItemNames';
import { TraverseComponentViaDropdownStructure } from '../../componentTraversal/traverseComponentViaDropdownStructure';
import { AlignmentSectionToComponents } from '../../../../../../interfaces/componentPreviewStructure';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../consts/horizontalAlignmentSections';
import { childComponentAlignmentDropdownState } from './childComponentAlignmentDropdownState';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SetActiveComponentUtils } from '../utils/setActiveComponentUtils';

export class ChangeChildComponentAlignment {

  private static addComponentToNewAlignment(newAlignment: HORIZONTAL_ALIGNMENT_SECTIONS, alignedComponents: AlignmentSectionToComponents): void {
    // alignedComponents[newAlignment].push(childComponentAlignmentDropdownState.getChildComponent());
    alignedComponents[newAlignment].unshift(childComponentAlignmentDropdownState.getChildComponent());
  }

  private static addComponentBackToInitialAlignment(previousAlignment: HORIZONTAL_ALIGNMENT_SECTIONS, newAlignment: HORIZONTAL_ALIGNMENT_SECTIONS,
    alignedComponents: AlignmentSectionToComponents): void {
    if (previousAlignment !== newAlignment) {
      alignedComponents[childComponentAlignmentDropdownState.getInitialAlignment()].splice(
        childComponentAlignmentDropdownState.getInitialAlignmentIndex(), 0, childComponentAlignmentDropdownState.getChildComponent());
    }
  }

  private static addComponentToAlignment(previousAlignment: HORIZONTAL_ALIGNMENT_SECTIONS, newAlignment: HORIZONTAL_ALIGNMENT_SECTIONS,
      childComponent: WorkshopComponent): void {
    const { alignmentSectionToComponents: alignedComponents } = childComponent.parentLayer;
    if (newAlignment === childComponentAlignmentDropdownState.getInitialAlignment()) {
      ChangeChildComponentAlignment.addComponentBackToInitialAlignment(previousAlignment, newAlignment, alignedComponents);
    } else if (childComponentAlignmentDropdownState.getChildComponent()) {
      ChangeChildComponentAlignment.addComponentToNewAlignment(newAlignment, alignedComponents);
    }
  }

  private static setInitialDropdownState(previousAlignment: HORIZONTAL_ALIGNMENT_SECTIONS, currentComponentIndex: number): void {
    childComponentAlignmentDropdownState.setInitialAlignment(previousAlignment);
    childComponentAlignmentDropdownState.setInitialAlignmentIndex(currentComponentIndex);
  }

  private static indexOfComponent(childComponents: WorkshopComponent[], childComponent: WorkshopComponent): number {
    for (let i = 0; i < childComponents.length; i += 1) {
      if (childComponents[i] === childComponent) {
        return i;
      }
    }
  }

  private static saveStateAndRemoveComponent(childComponents: WorkshopComponent[], currentComponentIndex: number): void {
    childComponentAlignmentDropdownState.setChildComponent(childComponents[currentComponentIndex]);
    childComponents.splice(currentComponentIndex, 1);
  }

  private static setStateAndRemoveComponent(previousAlignment: HORIZONTAL_ALIGNMENT_SECTIONS, childComponent: WorkshopComponent): void {
    const previousAlignmentComponents = childComponent.parentLayer.alignmentSectionToComponents[previousAlignment];
    const currentComponentIndex = ChangeChildComponentAlignment.indexOfComponent(previousAlignmentComponents, childComponent);
    ChangeChildComponentAlignment.saveStateAndRemoveComponent(previousAlignmentComponents, currentComponentIndex);
    if (childComponentAlignmentDropdownState.getInitialAlignmentIndex() < 0) {
      ChangeChildComponentAlignment.setInitialDropdownState(previousAlignment, currentComponentIndex);
    }
  }

  private static updateDropdownStructureIfFound(traversalState: DropdownStructureTraversalState): DropdownTraversalResult {
    const targetDetails = this as any as TargetDetails;
    if (TraverseComponentViaDropdownStructure.isActualObjectNameMatching(targetDetails, traversalState)) {
      const { masterComponent, parentLayerAlignmentSectionToComponents } = targetDetails;
      UpdateContainerComponentDropdownItemNames.updateViaParentLayerDropdownStructure(masterComponent,
        traversalState.subcomponentDropdownStructure, parentLayerAlignmentSectionToComponents);
      return { stopTraversal: true };
    }
    return {};
  }

  private static updateNames(newAlignment: HORIZONTAL_ALIGNMENT_SECTIONS, childComponent: WorkshopComponent, masterComponent: WorkshopComponent): void {
    const targetDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent, masterComponent.activeSubcomponentName) as TargetDetails;
    const { alignmentSectionToComponents } = childComponent.parentLayer;
    targetDetails.parentLayerAlignmentSectionToComponents = alignmentSectionToComponents;
    TraverseComponentViaDropdownStructure.traverse(
      masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      ChangeChildComponentAlignment.updateDropdownStructureIfFound.bind(targetDetails));
    // UX - check if need to set the childComponent to the right of the alignment
    // masterComponent.activeSubcomponentName = newAlignmentSubcomponents[newAlignmentSubcomponents.length - 1].name;
    SetActiveComponentUtils.setActiveSubcomponent(masterComponent, alignmentSectionToComponents[newAlignment][0].baseSubcomponent.name);
  }

  public static change(masterComponent: WorkshopComponent, previousAlignment: HORIZONTAL_ALIGNMENT_SECTIONS, newAlignment: HORIZONTAL_ALIGNMENT_SECTIONS,
      childComponent: WorkshopComponent, shouldSubcomponentNamesBeUpdated: boolean): void {
    if (shouldSubcomponentNamesBeUpdated) {
      ChangeChildComponentAlignment.updateNames(newAlignment, childComponent, masterComponent);
    } else if (newAlignment !== previousAlignment) {
      ChangeChildComponentAlignment.setStateAndRemoveComponent(previousAlignment, childComponent);
      ChangeChildComponentAlignment.addComponentToAlignment(previousAlignment, newAlignment, childComponent);
    }
  }
}
