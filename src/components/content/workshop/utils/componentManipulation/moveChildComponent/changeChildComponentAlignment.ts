import { DropdownStructureTraversalState, DropdownTraversalResult, TargetDetails } from '../../../../../../interfaces/componentTraversal';
import { UpdateContainerComponentDropdownItemNames } from '../updateChildComponent/updateContainerComponentDropdownItemNames';
import { TraverseComponentViaDropdownStructure } from '../../componentTraversal/traverseComponentViaDropdownStructure';
import { AlignmentSectionToSubcomponents } from '../../../../../../interfaces/componentPreviewStructure';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../consts/horizontalAlignmentSections';
import { Subcomponent, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { childComponentAlignmentDropdownState } from './childComponentAlignmentDropdownState';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { SetActiveComponentUtils } from '../utils/setActiveComponentUtils';

export class ChangeChildComponentAlignment {

  private static addSubcomponentToNewAlignment(newAlignment: HORIZONTAL_ALIGNMENT_SECTIONS, alignmentSectionToSubcomponents: AlignmentSectionToSubcomponents): void {
    // alignmentSectionToSubcomponents[newAlignment].push(childComponentAlignmentDropdownState.getChildBaseSubcomponent());
    alignmentSectionToSubcomponents[newAlignment].unshift(childComponentAlignmentDropdownState.getChildBaseSubcomponent());
  }

  private static addSubcomponentBackToInitialAlignment(previousAlignment: HORIZONTAL_ALIGNMENT_SECTIONS, newAlignment: HORIZONTAL_ALIGNMENT_SECTIONS,
    alignmentSectionToSubcomponents: AlignmentSectionToSubcomponents): void {
    if (previousAlignment !== newAlignment) {
      alignmentSectionToSubcomponents[childComponentAlignmentDropdownState.getInitialAlignment()].splice(
        childComponentAlignmentDropdownState.getInitialAlignmentIndex(), 0, childComponentAlignmentDropdownState.getChildBaseSubcomponent());
    }
  }

  private static addSubcomponentToAlignment(previousAlignment: HORIZONTAL_ALIGNMENT_SECTIONS, newAlignment: HORIZONTAL_ALIGNMENT_SECTIONS,
      subcomponent: Subcomponent): void {
    const { alignmentSectionToSubcomponents } = subcomponent.seedComponent.parentLayer;
    if (newAlignment === childComponentAlignmentDropdownState.getInitialAlignment()) {
      ChangeChildComponentAlignment.addSubcomponentBackToInitialAlignment(previousAlignment, newAlignment, alignmentSectionToSubcomponents);
    } else if (childComponentAlignmentDropdownState.getChildBaseSubcomponent()) {
      ChangeChildComponentAlignment.addSubcomponentToNewAlignment(newAlignment, alignmentSectionToSubcomponents);
    }
  }

  private static setInitialDropdownState(previousAlignment: HORIZONTAL_ALIGNMENT_SECTIONS, currentSubcomponentIndex: number): void {
    childComponentAlignmentDropdownState.setInitialAlignment(previousAlignment);
    childComponentAlignmentDropdownState.setInitialAlignmentIndex(currentSubcomponentIndex);
  }

  private static indexOfSubcomponent(subcomponents: Subcomponent[], subcomponent: Subcomponent): number {
    for (let i = 0; i < subcomponents.length; i += 1) {
      if (subcomponents[i] === subcomponent) {
        return i;
      }
    }
  }

  private static saveStateAndRemoveSubcomponent(subcomponents: Subcomponent[], currentSubcomponentIndex: number): void {
    childComponentAlignmentDropdownState.setChildBaseComponent(subcomponents[currentSubcomponentIndex]);
    subcomponents.splice(currentSubcomponentIndex, 1);
  }

  private static setStateAndRemoveSubcomponent(previousAlignment: HORIZONTAL_ALIGNMENT_SECTIONS, subcomponent: Subcomponent): void {
    const previousAlignmentSubcomponents = subcomponent.seedComponent.parentLayer.alignmentSectionToSubcomponents[previousAlignment];
    const currentSubcomponentIndex = ChangeChildComponentAlignment.indexOfSubcomponent(previousAlignmentSubcomponents, subcomponent);
    ChangeChildComponentAlignment.saveStateAndRemoveSubcomponent(previousAlignmentSubcomponents, currentSubcomponentIndex);
    if (childComponentAlignmentDropdownState.getInitialAlignmentIndex() < 0) {
      ChangeChildComponentAlignment.setInitialDropdownState(previousAlignment, currentSubcomponentIndex);
    }
  }

  private static updateDropdownStructureIfFound(traversalState: DropdownStructureTraversalState): DropdownTraversalResult {
    const targetDetails = this as any as TargetDetails;
    if (TraverseComponentViaDropdownStructure.isActualObjectNameMatching(targetDetails, traversalState)) {
      const { masterComponent, parentLayerAlignmentSectionToSubcomponents } = targetDetails;
      UpdateContainerComponentDropdownItemNames.updateViaParentLayerDropdownStructure(masterComponent,
        traversalState.subcomponentDropdownStructure, parentLayerAlignmentSectionToSubcomponents);
      return { stopTraversal: true };
    }
    return {};
  }

  private static updateNames(newAlignment: HORIZONTAL_ALIGNMENT_SECTIONS, subcomponent: Subcomponent, masterComponent: WorkshopComponent): void {
    const targetDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent, masterComponent.activeSubcomponentName) as TargetDetails;
    const { alignmentSectionToSubcomponents } = subcomponent.seedComponent.parentLayer;
    targetDetails.parentLayerAlignmentSectionToSubcomponents = alignmentSectionToSubcomponents;
    TraverseComponentViaDropdownStructure.traverse(
      masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      ChangeChildComponentAlignment.updateDropdownStructureIfFound.bind(targetDetails));
    // UX - check if need to set the subcomponent to the right of the alignment
    // masterComponent.activeSubcomponentName = newAlignmentSubcomponents[newAlignmentSubcomponents.length - 1].name;
    SetActiveComponentUtils.setActiveSubcomponent(masterComponent, alignmentSectionToSubcomponents[newAlignment][0].name);
  }

  public static change(masterComponent: WorkshopComponent, previousAlignment: HORIZONTAL_ALIGNMENT_SECTIONS, newAlignment: HORIZONTAL_ALIGNMENT_SECTIONS,
      subcomponent: Subcomponent, shouldSubcomponentNamesBeUpdated: boolean): void {
    if (shouldSubcomponentNamesBeUpdated) {
      ChangeChildComponentAlignment.updateNames(newAlignment, subcomponent, masterComponent);
    } else if (newAlignment !== previousAlignment) {
      ChangeChildComponentAlignment.setStateAndRemoveSubcomponent(previousAlignment, subcomponent);
      ChangeChildComponentAlignment.addSubcomponentToAlignment(previousAlignment, newAlignment, subcomponent);
    }
  }
}
