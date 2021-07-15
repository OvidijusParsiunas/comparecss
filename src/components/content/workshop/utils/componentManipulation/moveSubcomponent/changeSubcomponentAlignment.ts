import { ComponentPreviewStructureSearchUtils } from '../addNewNestedComponent/utils/componentPreviewStractureSearchUtils';
import { AlignedSections, NestedSubcomponent } from '../../../../../../interfaces/componentPreviewStructure';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateGenericComponentNames } from '../updateNestedComponentNames/updateGenericComponentNames';
import { subcomponentAlignmentDropdownState } from './subcomponentAlignmentDropdownState';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';

export class ChangeSubcomponentAlignment {

  private static updateNames(newAlignment: ALIGNED_SECTION_TYPES, subcomponentProperties: SubcomponentProperties, parentComponent: WorkshopComponent): void {
    const parentLayer = ComponentPreviewStructureSearchUtils.getLayerByName(parentComponent, subcomponentProperties.parentLayer.name);
    UpdateGenericComponentNames.updateViaLayerObject(parentComponent, parentLayer);
    parentComponent.activeSubcomponentName = subcomponentProperties.parentLayer.sections.alignedSections[newAlignment][0].name;
  }

  private static addSubcomponentToNewAlignment(newAlignment: ALIGNED_SECTION_TYPES, alignedSections: AlignedSections): void {
    alignedSections[newAlignment].unshift(subcomponentAlignmentDropdownState.getNestedSubcomponent());
  }

  private static addSubcomponentBackToInitialAlignment(previousAlignment: ALIGNED_SECTION_TYPES, newAlignment: ALIGNED_SECTION_TYPES,
      alignedSections: AlignedSections): void {
    if (previousAlignment !== newAlignment) {
      alignedSections[subcomponentAlignmentDropdownState.getInitialAlignment()].splice(
        subcomponentAlignmentDropdownState.getInitialAlignmentIndex(), 0, subcomponentAlignmentDropdownState.getNestedSubcomponent());
    }
  }

  private static addSubcomponentToAlignment(previousAlignment: ALIGNED_SECTION_TYPES, newAlignment: ALIGNED_SECTION_TYPES,
      subcomponentProperties: SubcomponentProperties): void {
    const { alignedSections } = subcomponentProperties.parentLayer.sections;
    if (newAlignment === subcomponentAlignmentDropdownState.getInitialAlignment()) {
      ChangeSubcomponentAlignment.addSubcomponentBackToInitialAlignment(previousAlignment, newAlignment, alignedSections);
    } else if (subcomponentAlignmentDropdownState.getNestedSubcomponent()) {
      ChangeSubcomponentAlignment.addSubcomponentToNewAlignment(newAlignment, alignedSections);
    }
  }

  private static setInitialDropdownState(previousAlignment: ALIGNED_SECTION_TYPES, currentSubcomponentIndex: number): void {
    subcomponentAlignmentDropdownState.setInitialAlignment(previousAlignment);
    subcomponentAlignmentDropdownState.setInitialAlignmentIndex(currentSubcomponentIndex);
  }

  private static indexOfNestedSubcomponents(nestedSubcomponents: NestedSubcomponent[], subcomponentProperties: SubcomponentProperties): number {
    for (let i = 0; i < nestedSubcomponents.length; i += 1) {
      if (nestedSubcomponents[i].subcomponentProperties === subcomponentProperties) {
        return i;
      }
    }
  }

  private static saveStateAndRemoveSubcomponent(nestedSubcomponents: NestedSubcomponent[], currentSubcomponentIndex: number): void {
    subcomponentAlignmentDropdownState.setNestedSubcomponent(nestedSubcomponents[currentSubcomponentIndex]);
    nestedSubcomponents.splice(currentSubcomponentIndex, 1);
  }

  private static setStateAndRemoveSubcomponent(previousAlignment: ALIGNED_SECTION_TYPES, subcomponentProperties: SubcomponentProperties): void {
    const previousAlignmentSubcomponents = subcomponentProperties.parentLayer.sections.alignedSections[previousAlignment];
    const currentSubcomponentIndex = ChangeSubcomponentAlignment.indexOfNestedSubcomponents(previousAlignmentSubcomponents, subcomponentProperties);
    ChangeSubcomponentAlignment.saveStateAndRemoveSubcomponent(previousAlignmentSubcomponents, currentSubcomponentIndex);
    if (subcomponentAlignmentDropdownState.getInitialAlignmentIndex() < 0) {
      ChangeSubcomponentAlignment.setInitialDropdownState(previousAlignment, currentSubcomponentIndex);
    }
  }

  public static change(previousAlignment: ALIGNED_SECTION_TYPES, newAlignment: ALIGNED_SECTION_TYPES, subcomponentProperties: SubcomponentProperties,
      shouldSubcomponentNamesBeUpdated: boolean, shouldSubcomponentBeRealigned: boolean, parentComponent: WorkshopComponent): void {
    if (shouldSubcomponentBeRealigned) {
      if (newAlignment !== previousAlignment) ChangeSubcomponentAlignment.setStateAndRemoveSubcomponent(previousAlignment, subcomponentProperties);
      ChangeSubcomponentAlignment.addSubcomponentToAlignment(previousAlignment, newAlignment, subcomponentProperties);
    }
    if (shouldSubcomponentNamesBeUpdated) ChangeSubcomponentAlignment.updateNames(newAlignment, subcomponentProperties, parentComponent);
  }
}