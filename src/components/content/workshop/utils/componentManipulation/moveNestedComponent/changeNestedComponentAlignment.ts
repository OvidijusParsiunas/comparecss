import { UpdateGenericComponentDropdownOptionNames } from '../updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { AlignedSections, NestedComponent } from '../../../../../../interfaces/componentPreviewStructure';
import { ComponentTraversalState, TargetDetails } from '../../../../../../interfaces/componentTraversal';
import { nestedComponentAlignmentDropdownState } from './nestedComponentAlignmentDropdownState';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { ActiveComponentUtils } from '../../activeComponent/activeComponentUtils';

export class ChangeNestedComponentAlignment {

  private static addSubcomponentToNewAlignment(newAlignment: ALIGNED_SECTION_TYPES, alignedSections: AlignedSections): void {
    // alignedSections[newAlignment].push(subcomponentAlignmentDropdownState.getNestedComponent());
    alignedSections[newAlignment].unshift(nestedComponentAlignmentDropdownState.getNestedComponent());
  }

  private static addSubcomponentBackToInitialAlignment(previousAlignment: ALIGNED_SECTION_TYPES, newAlignment: ALIGNED_SECTION_TYPES,
      alignedSections: AlignedSections): void {
    if (previousAlignment !== newAlignment) {
      alignedSections[nestedComponentAlignmentDropdownState.getInitialAlignment()].splice(
        nestedComponentAlignmentDropdownState.getInitialAlignmentIndex(), 0, nestedComponentAlignmentDropdownState.getNestedComponent());
    }
  }

  private static addSubcomponentToAlignment(previousAlignment: ALIGNED_SECTION_TYPES, newAlignment: ALIGNED_SECTION_TYPES,
      subcomponentProperties: SubcomponentProperties): void {
    const { alignedSections } = subcomponentProperties.parentLayer.sections;
    if (newAlignment === nestedComponentAlignmentDropdownState.getInitialAlignment()) {
      ChangeNestedComponentAlignment.addSubcomponentBackToInitialAlignment(previousAlignment, newAlignment, alignedSections);
    } else if (nestedComponentAlignmentDropdownState.getNestedComponent()) {
      ChangeNestedComponentAlignment.addSubcomponentToNewAlignment(newAlignment, alignedSections);
    }
  }

  private static setInitialDropdownState(previousAlignment: ALIGNED_SECTION_TYPES, currentSubcomponentIndex: number): void {
    nestedComponentAlignmentDropdownState.setInitialAlignment(previousAlignment);
    nestedComponentAlignmentDropdownState.setInitialAlignmentIndex(currentSubcomponentIndex);
  }

  private static indexOfNestedComponents(nestedComponents: NestedComponent[], subcomponentProperties: SubcomponentProperties): number {
    for (let i = 0; i < nestedComponents.length; i += 1) {
      if (nestedComponents[i].subcomponentProperties === subcomponentProperties) {
        return i;
      }
    }
  }

  private static saveStateAndRemoveSubcomponent(nestedComponents: NestedComponent[], currentSubcomponentIndex: number): void {
    nestedComponentAlignmentDropdownState.setNestedComponent(nestedComponents[currentSubcomponentIndex]);
    nestedComponents.splice(currentSubcomponentIndex, 1);
  }

  private static setStateAndRemoveSubcomponent(previousAlignment: ALIGNED_SECTION_TYPES, subcomponentProperties: SubcomponentProperties): void {
    const previousAlignmentSubcomponents = subcomponentProperties.parentLayer.sections.alignedSections[previousAlignment];
    const currentSubcomponentIndex = ChangeNestedComponentAlignment.indexOfNestedComponents(previousAlignmentSubcomponents, subcomponentProperties);
    ChangeNestedComponentAlignment.saveStateAndRemoveSubcomponent(previousAlignmentSubcomponents, currentSubcomponentIndex);
    if (nestedComponentAlignmentDropdownState.getInitialAlignmentIndex() < 0) {
      ChangeNestedComponentAlignment.setInitialDropdownState(previousAlignment, currentSubcomponentIndex);
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
    const { coreBaseComponent } = ActiveComponentUtils.getBaseComponents(parentComponent);
    const targetDetails = ComponentTraversalUtils.generateTargetDetails(coreBaseComponent, coreBaseComponent.activeSubcomponentName);
    targetDetails.parentLayerAlignedSections = subcomponentProperties.parentLayer.sections.alignedSections;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      coreBaseComponent.componentPreviewStructure.subcomponentDropdownStructure,
      ChangeNestedComponentAlignment.updateDropdownStructureIfFound.bind(targetDetails));
    // UX - check if need to set the subcomponent to the right of the alignment
    // parentComponent.activeSubcomponentName = newAlignmentSubcomponents[newAlignmentSubcomponents.length - 1].name;
    const newAlignmentSubcomponents = subcomponentProperties.parentLayer.sections.alignedSections[newAlignment];
    parentComponent.activeSubcomponentName = newAlignmentSubcomponents[0].name;
  }

  public static change(previousAlignment: ALIGNED_SECTION_TYPES, newAlignment: ALIGNED_SECTION_TYPES, subcomponentProperties: SubcomponentProperties,
      shouldSubcomponentNamesBeUpdated: boolean, parentComponent: WorkshopComponent): void {
    if (shouldSubcomponentNamesBeUpdated) {
      ChangeNestedComponentAlignment.updateNames(newAlignment, subcomponentProperties, parentComponent);
    } else if (newAlignment !== previousAlignment) {
      ChangeNestedComponentAlignment.setStateAndRemoveSubcomponent(previousAlignment, subcomponentProperties);
      ChangeNestedComponentAlignment.addSubcomponentToAlignment(previousAlignment, newAlignment, subcomponentProperties);
    }
  }
}
