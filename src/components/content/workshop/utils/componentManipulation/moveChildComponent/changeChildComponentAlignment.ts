import { UpdateGenericComponentDropdownOptionNames } from '../updateChildComponent/updateGenericComponentDropdownOptionNames';
import { AlignedSections, BaseSubcomponentRef } from '../../../../../../interfaces/componentPreviewStructure';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ComponentTraversalState, TargetDetails } from '../../../../../../interfaces/componentTraversal';
import { childComponentAlignmentDropdownState } from './childComponentAlignmentDropdownState';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { ActiveComponentUtils } from '../../activeComponent/activeComponentUtils';

export class ChangeChildComponentAlignment {

  private static addSubcomponentToNewAlignment(newAlignment: ALIGNED_SECTION_TYPES, alignedSections: AlignedSections): void {
    // alignedSections[newAlignment].push(subcomponentAlignmentDropdownState.getChildComponent());
    alignedSections[newAlignment].unshift(childComponentAlignmentDropdownState.getChildComponent());
  }

  private static addSubcomponentBackToInitialAlignment(previousAlignment: ALIGNED_SECTION_TYPES, newAlignment: ALIGNED_SECTION_TYPES,
      alignedSections: AlignedSections): void {
    if (previousAlignment !== newAlignment) {
      alignedSections[childComponentAlignmentDropdownState.getInitialAlignment()].splice(
        childComponentAlignmentDropdownState.getInitialAlignmentIndex(), 0, childComponentAlignmentDropdownState.getChildComponent());
    }
  }

  private static addSubcomponentToAlignment(previousAlignment: ALIGNED_SECTION_TYPES, newAlignment: ALIGNED_SECTION_TYPES,
      subcomponentProperties: SubcomponentProperties): void {
    const { alignedSections } = subcomponentProperties.parentLayer.sections;
    if (newAlignment === childComponentAlignmentDropdownState.getInitialAlignment()) {
      ChangeChildComponentAlignment.addSubcomponentBackToInitialAlignment(previousAlignment, newAlignment, alignedSections);
    } else if (childComponentAlignmentDropdownState.getChildComponent()) {
      ChangeChildComponentAlignment.addSubcomponentToNewAlignment(newAlignment, alignedSections);
    }
  }

  private static setInitialDropdownState(previousAlignment: ALIGNED_SECTION_TYPES, currentSubcomponentIndex: number): void {
    childComponentAlignmentDropdownState.setInitialAlignment(previousAlignment);
    childComponentAlignmentDropdownState.setInitialAlignmentIndex(currentSubcomponentIndex);
  }

  private static indexOfSubcomponent(subcomponents: BaseSubcomponentRef[], subcomponentProperties: SubcomponentProperties): number {
    for (let i = 0; i < subcomponents.length; i += 1) {
      if (subcomponents[i].subcomponentProperties === subcomponentProperties) {
        return i;
      }
    }
  }

  private static saveStateAndRemoveSubcomponent(subcomponents: BaseSubcomponentRef[], currentSubcomponentIndex: number): void {
    childComponentAlignmentDropdownState.setChildComponent(subcomponents[currentSubcomponentIndex]);
    subcomponents.splice(currentSubcomponentIndex, 1);
  }

  private static setStateAndRemoveSubcomponent(previousAlignment: ALIGNED_SECTION_TYPES, subcomponentProperties: SubcomponentProperties): void {
    const previousAlignmentSubcomponents = subcomponentProperties.parentLayer.sections.alignedSections[previousAlignment];
    const currentSubcomponentIndex = ChangeChildComponentAlignment.indexOfSubcomponent(previousAlignmentSubcomponents, subcomponentProperties);
    ChangeChildComponentAlignment.saveStateAndRemoveSubcomponent(previousAlignmentSubcomponents, currentSubcomponentIndex);
    if (childComponentAlignmentDropdownState.getInitialAlignmentIndex() < 0) {
      ChangeChildComponentAlignment.setInitialDropdownState(previousAlignment, currentSubcomponentIndex);
    }
  }

  private static updateDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const targetDetails = this as any as TargetDetails;
    if (ComponentTraversalUtils.isActualObjectNameMatching(targetDetails, componentTraversalState)) {
      const { parentComponent, parentLayerAlignedSections } = targetDetails;
      UpdateGenericComponentDropdownOptionNames.updateViaParentLayerDropdownStructure(parentComponent,
        componentTraversalState.subcomponentDropdownStructure, parentLayerAlignedSections);
      return componentTraversalState;
    }
    return null;
  }

  private static updateNames(newAlignment: ALIGNED_SECTION_TYPES, subcomponentProperties: SubcomponentProperties, parentComponent: WorkshopComponent): void {
    const { masterComponent } = ActiveComponentUtils.getActiveHighLevelComponents(parentComponent);
    const targetDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent, masterComponent.activeSubcomponentName);
    targetDetails.parentLayerAlignedSections = subcomponentProperties.parentLayer.sections.alignedSections;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      ChangeChildComponentAlignment.updateDropdownStructureIfFound.bind(targetDetails));
    // UX - check if need to set the subcomponent to the right of the alignment
    // parentComponent.activeSubcomponentName = newAlignmentSubcomponents[newAlignmentSubcomponents.length - 1].name;
    const newAlignmentSubcomponents = subcomponentProperties.parentLayer.sections.alignedSections[newAlignment];
    parentComponent.activeSubcomponentName = newAlignmentSubcomponents[0].subcomponentProperties.name;
  }

  public static change(previousAlignment: ALIGNED_SECTION_TYPES, newAlignment: ALIGNED_SECTION_TYPES, subcomponentProperties: SubcomponentProperties,
      shouldSubcomponentNamesBeUpdated: boolean, parentComponent: WorkshopComponent): void {
    if (shouldSubcomponentNamesBeUpdated) {
      ChangeChildComponentAlignment.updateNames(newAlignment, subcomponentProperties, parentComponent);
    } else if (newAlignment !== previousAlignment) {
      ChangeChildComponentAlignment.setStateAndRemoveSubcomponent(previousAlignment, subcomponentProperties);
      ChangeChildComponentAlignment.addSubcomponentToAlignment(previousAlignment, newAlignment, subcomponentProperties);
    }
  }
}
