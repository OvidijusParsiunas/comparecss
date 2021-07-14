import { ComponentPreviewStructureSearchUtils } from '../addNewNestedComponent/utils/componentPreviewStractureSearchUtils';
import { AlignedSections, NestedSubcomponent } from '../../../../../../interfaces/componentPreviewStructure';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateGenericComponentNames } from '../updateNestedComponentNames/updateGenericComponentNames';
import { changeSubcomponentAlignmentState } from './changeSubcomponentAlignmentState';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';

// WORK2: rework
export class ChangeSubcomponentAlignment {

  private static updateNames(newAlignment: ALIGNED_SECTION_TYPES, subcomponentProperties: SubcomponentProperties, activeComponent: WorkshopComponent): void {
    const parentLayer = ComponentPreviewStructureSearchUtils.getLayerByName(activeComponent, subcomponentProperties.parentLayer.name);
    UpdateGenericComponentNames.updateViaLayerObject(activeComponent, parentLayer);
    activeComponent.activeSubcomponentName = subcomponentProperties.parentLayer.sections.alignedSections[newAlignment][0].name;
  }

  private static addSubcomponentToNewAlignment(newAlignment: ALIGNED_SECTION_TYPES, alignedSections: AlignedSections): void {
    alignedSections[newAlignment].unshift(changeSubcomponentAlignmentState.getSubcomponent());
  }

  private static addSubcomponentToInitialOpenDropdownSessionAlignment(previousAlignment: ALIGNED_SECTION_TYPES, newAlignment: ALIGNED_SECTION_TYPES,
      alignedSections: AlignedSections): void {
    const initialSubcomponentIndex = changeSubcomponentAlignmentState.getLastSubcomponentIndex();
    if (initialSubcomponentIndex >= 0 && previousAlignment !== newAlignment) {
      alignedSections[changeSubcomponentAlignmentState.getInitialAlignment()].splice(
        initialSubcomponentIndex, 0, changeSubcomponentAlignmentState.getSubcomponent());
    }
  }

  private static addSubcomponentToAlignment(previousAlignment: ALIGNED_SECTION_TYPES, newAlignment: ALIGNED_SECTION_TYPES,
      subcomponentProperties: SubcomponentProperties): void {
    const { alignedSections } = subcomponentProperties.parentLayer.sections;
    if (changeSubcomponentAlignmentState.getInitialAlignment() === newAlignment) {
      ChangeSubcomponentAlignment.addSubcomponentToInitialOpenDropdownSessionAlignment(previousAlignment, newAlignment, alignedSections);
    } else if (changeSubcomponentAlignmentState.getSubcomponent()) {
      ChangeSubcomponentAlignment.addSubcomponentToNewAlignment(newAlignment, alignedSections);
    }
  }
  private static removeSubcomponentAndSaveState(previousSectionArray: NestedSubcomponent[], nestedSubcomponentIndex: number): void {
    changeSubcomponentAlignmentState.setSubcomponent(previousSectionArray[nestedSubcomponentIndex]);
    previousSectionArray.splice(nestedSubcomponentIndex, 1);
  }

  private static setInitialOpenDropdownSessionState(previousAlignment: ALIGNED_SECTION_TYPES, nestedSubcomponentIndex: number): void {
    changeSubcomponentAlignmentState.setLastSubcomponentIndex(nestedSubcomponentIndex);
    changeSubcomponentAlignmentState.setInitialAlignment(previousAlignment);
  }

  private static indexOfSubcomponentInAlignedSections(previousSectionArray: NestedSubcomponent[], subcomponentProperties: SubcomponentProperties): number {
    for (let i = 0; i < previousSectionArray.length; i += 1) {
      if (previousSectionArray[i].subcomponentProperties === subcomponentProperties) {
        return i;
      }
    }
  }

  private static setCurrentAlignmentPositionStateAndRemove(previousAlignment: ALIGNED_SECTION_TYPES, subcomponentProperties: SubcomponentProperties): void {
    const previousSectionArray = subcomponentProperties.parentLayer.sections.alignedSections[previousAlignment];
    const nestedSubcomponentIndex = ChangeSubcomponentAlignment.indexOfSubcomponentInAlignedSections(previousSectionArray, subcomponentProperties);
    ChangeSubcomponentAlignment.removeSubcomponentAndSaveState(previousSectionArray, nestedSubcomponentIndex);
    if (changeSubcomponentAlignmentState.getLastSubcomponentIndex() < 0) {
      ChangeSubcomponentAlignment.setInitialOpenDropdownSessionState(previousAlignment, nestedSubcomponentIndex);
    }
  }

  public static change(previousAlignment: ALIGNED_SECTION_TYPES, newAlignment: ALIGNED_SECTION_TYPES, subcomponentProperties: SubcomponentProperties,
      shouldNamesBeUpdated: boolean, shouldSubcomponentBeRealigned: boolean, activeComponent: WorkshopComponent): void {
    if (shouldSubcomponentBeRealigned) {
      if (previousAlignment !== newAlignment) ChangeSubcomponentAlignment.setCurrentAlignmentPositionStateAndRemove(previousAlignment, subcomponentProperties);
      ChangeSubcomponentAlignment.addSubcomponentToAlignment(previousAlignment, newAlignment, subcomponentProperties);
    }
    if (shouldNamesBeUpdated) ChangeSubcomponentAlignment.updateNames(newAlignment, subcomponentProperties, activeComponent);
  }
}
