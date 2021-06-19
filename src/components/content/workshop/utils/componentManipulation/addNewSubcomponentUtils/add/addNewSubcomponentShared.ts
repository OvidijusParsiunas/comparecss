import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { NewImportedComponentProperties } from '../../../../../../../interfaces/addNewSubcomponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { ImportedComponentGenerator } from '../../../importComponent/importedComponentGenerator';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';

export class AddNewSubcomponentShared {

  protected static readonly subcomponentTypeToName: { [key in SUBCOMPONENT_TYPES]?: CORE_SUBCOMPONENTS_NAMES } = {
    [SUBCOMPONENT_TYPES.LAYER]: CORE_SUBCOMPONENTS_NAMES.LAYER,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON]: CORE_SUBCOMPONENTS_NAMES.CLOSE,
    [SUBCOMPONENT_TYPES.BUTTON]: CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_BUTTON,
    [SUBCOMPONENT_TYPES.SECTION_TEXT]: CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_TEXT,
    [SUBCOMPONENT_TYPES.TEXT]: CORE_SUBCOMPONENTS_NAMES.TEXT,
    [SUBCOMPONENT_TYPES.AVATAR]: CORE_SUBCOMPONENTS_NAMES.AVATAR,
  }

  protected static addNewSubcomponentsToExistingSubcomponents(currentlySelectedComponent: WorkshopComponent, newSubcomponents: Subcomponents): void {
    currentlySelectedComponent.subcomponents = {
      ...currentlySelectedComponent.subcomponents,
      ...newSubcomponents,
    };
  }

  protected static createNewImportedComponent(parentSubcomponentType: SUBCOMPONENT_TYPES, componentGenerator: ComponentGenerator,
      overwritePropertiesFunc?: any): NewImportedComponentProperties {
    const baseName = UniqueSubcomponentNameGenerator.generate(
      AddNewSubcomponentShared.subcomponentTypeToName[parentSubcomponentType]);
    const subcomponents = ImportedComponentGenerator.createImportedComponentSubcomponents(componentGenerator, baseName);
    const { subcomponentNames } = subcomponents[baseName].importedComponent.componentRef;
    if (overwritePropertiesFunc) overwritePropertiesFunc(subcomponents, subcomponentNames);
    return { baseName, subcomponents };
  }
}
