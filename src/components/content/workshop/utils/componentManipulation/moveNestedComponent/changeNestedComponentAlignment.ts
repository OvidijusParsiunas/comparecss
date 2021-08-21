import { UpdateGenericComponentDropdownOptionNames } from '../updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { ComponentPreviewStructureSearchUtils } from '../addNewNestedComponent/utils/componentPreviewStractureSearchUtils';
import { AlignedSections, NestedComponent } from '../../../../../../interfaces/componentPreviewStructure';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { nestedComponentAlignmentDropdownState } from './nestedComponentAlignmentDropdownState';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';

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

  private static updateNames(newAlignment: ALIGNED_SECTION_TYPES, subcomponentProperties: SubcomponentProperties, parentComponent: WorkshopComponent): void {
    const parentLayer = ComponentPreviewStructureSearchUtils.getLayerByName(parentComponent, subcomponentProperties.parentLayer.name);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(parentComponent, parentLayer, true);
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
