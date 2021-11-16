import { DropdownStructureTraversalState, DropdownTraversalResult, TargetDetails } from '../../../../../../interfaces/componentTraversal';
import { UpdateContainerComponentDropdownItemNames } from '../updateChildComponent/updateContainerComponentDropdownItemNames';
import { TraverseComponentViaDropdownStructure } from '../../componentTraversal/traverseComponentViaDropdownStructure';
import { AlignedSections, BaseSubcomponentRef } from '../../../../../../interfaces/componentPreviewStructure';
import { Subcomponent, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { childComponentAlignmentDropdownState } from './childComponentAlignmentDropdownState';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { SetActiveComponentUtils } from '../utils/setActiveComponentUtils';

export class ChangeChildComponentAlignment {

  private static addSubcomponentToNewAlignment(newAlignment: ALIGNED_SECTION_TYPES, alignedSections: AlignedSections): void {
    // alignedSections[newAlignment].push(subcomponentAlignmentDropdownState.getChildBaseSubcomponent());
    alignedSections[newAlignment].unshift(childComponentAlignmentDropdownState.getChildBaseSubcomponent());
  }

  private static addSubcomponentBackToInitialAlignment(previousAlignment: ALIGNED_SECTION_TYPES, newAlignment: ALIGNED_SECTION_TYPES,
      alignedSections: AlignedSections): void {
    if (previousAlignment !== newAlignment) {
      alignedSections[childComponentAlignmentDropdownState.getInitialAlignment()].splice(
        childComponentAlignmentDropdownState.getInitialAlignmentIndex(), 0, childComponentAlignmentDropdownState.getChildBaseSubcomponent());
    }
  }

  private static addSubcomponentToAlignment(previousAlignment: ALIGNED_SECTION_TYPES, newAlignment: ALIGNED_SECTION_TYPES,
      subcomponent: Subcomponent): void {
    const { alignedSections } = subcomponent.seedComponent.parentLayer.sections;
    if (newAlignment === childComponentAlignmentDropdownState.getInitialAlignment()) {
      ChangeChildComponentAlignment.addSubcomponentBackToInitialAlignment(previousAlignment, newAlignment, alignedSections);
    } else if (childComponentAlignmentDropdownState.getChildBaseSubcomponent()) {
      ChangeChildComponentAlignment.addSubcomponentToNewAlignment(newAlignment, alignedSections);
    }
  }

  private static setInitialDropdownState(previousAlignment: ALIGNED_SECTION_TYPES, currentSubcomponentIndex: number): void {
    childComponentAlignmentDropdownState.setInitialAlignment(previousAlignment);
    childComponentAlignmentDropdownState.setInitialAlignmentIndex(currentSubcomponentIndex);
  }

  private static indexOfSubcomponent(subcomponents: BaseSubcomponentRef[], subcomponent: Subcomponent): number {
    for (let i = 0; i < subcomponents.length; i += 1) {
      if (subcomponents[i].subcomponent === subcomponent) {
        return i;
      }
    }
  }

  private static saveStateAndRemoveSubcomponent(subcomponents: BaseSubcomponentRef[], currentSubcomponentIndex: number): void {
    childComponentAlignmentDropdownState.setChildBaseComponent(subcomponents[currentSubcomponentIndex]);
    subcomponents.splice(currentSubcomponentIndex, 1);
  }

  private static setStateAndRemoveSubcomponent(previousAlignment: ALIGNED_SECTION_TYPES, subcomponent: Subcomponent): void {
    const previousAlignmentSubcomponents = subcomponent.seedComponent.parentLayer.sections.alignedSections[previousAlignment];
    const currentSubcomponentIndex = ChangeChildComponentAlignment.indexOfSubcomponent(previousAlignmentSubcomponents, subcomponent);
    ChangeChildComponentAlignment.saveStateAndRemoveSubcomponent(previousAlignmentSubcomponents, currentSubcomponentIndex);
    if (childComponentAlignmentDropdownState.getInitialAlignmentIndex() < 0) {
      ChangeChildComponentAlignment.setInitialDropdownState(previousAlignment, currentSubcomponentIndex);
    }
  }

  private static updateDropdownStructureIfFound(traversalState: DropdownStructureTraversalState): DropdownTraversalResult {
    const targetDetails = this as any as TargetDetails;
    if (TraverseComponentViaDropdownStructure.isActualObjectNameMatching(targetDetails, traversalState)) {
      const { masterComponent, parentLayerAlignedSections } = targetDetails;
      UpdateContainerComponentDropdownItemNames.updateViaParentLayerDropdownStructure(masterComponent,
        traversalState.subcomponentDropdownStructure, parentLayerAlignedSections);
      return { stopTraversal: true };
    }
    return {};
  }

  private static updateNames(newAlignment: ALIGNED_SECTION_TYPES, subcomponent: Subcomponent, masterComponent: WorkshopComponent): void {
    const targetDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent, masterComponent.activeSubcomponentName) as TargetDetails;
    const { alignedSections } = subcomponent.seedComponent.parentLayer.sections;
    targetDetails.parentLayerAlignedSections = alignedSections;
    TraverseComponentViaDropdownStructure.traverse(
      masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      ChangeChildComponentAlignment.updateDropdownStructureIfFound.bind(targetDetails));
    // UX - check if need to set the subcomponent to the right of the alignment
    // masterComponent.activeSubcomponentName = newAlignmentSubcomponents[newAlignmentSubcomponents.length - 1].name;
    SetActiveComponentUtils.setActiveSubcomponent(masterComponent, alignedSections[newAlignment][0].subcomponent.name);
  }

  public static change(masterComponent: WorkshopComponent, previousAlignment: ALIGNED_SECTION_TYPES, newAlignment: ALIGNED_SECTION_TYPES,
      subcomponent: Subcomponent, shouldSubcomponentNamesBeUpdated: boolean): void {
    if (shouldSubcomponentNamesBeUpdated) {
      ChangeChildComponentAlignment.updateNames(newAlignment, subcomponent, masterComponent);
    } else if (newAlignment !== previousAlignment) {
      ChangeChildComponentAlignment.setStateAndRemoveSubcomponent(previousAlignment, subcomponent);
      ChangeChildComponentAlignment.addSubcomponentToAlignment(previousAlignment, newAlignment, subcomponent);
    }
  }
}
