import { NewComponentProperties, OverwritePropertiesFunc } from '../../../../../../../interfaces/addNewSubcomponent';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { ImportedComponentGenerator } from '../../../importComponent/importedComponentGenerator';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';

export class AddNewSubcomponentShared {

  protected static readonly componentTypeToName: { [key in NEW_COMPONENT_TYPES]?: CORE_SUBCOMPONENTS_NAMES } = {
    [NEW_COMPONENT_TYPES.LAYER]: CORE_SUBCOMPONENTS_NAMES.LAYER,
    [NEW_COMPONENT_TYPES.BUTTON]: CORE_SUBCOMPONENTS_NAMES.BUTTON,
    [NEW_COMPONENT_TYPES.TEXT]: CORE_SUBCOMPONENTS_NAMES.TEXT,
    [NEW_COMPONENT_TYPES.AVATAR]: CORE_SUBCOMPONENTS_NAMES.AVATAR,
  }

  protected static addNewSubcomponentsToExistingSubcomponents(currentlySelectedComponent: WorkshopComponent, newSubcomponents: Subcomponents): void {
    currentlySelectedComponent.subcomponents = {
      ...currentlySelectedComponent.subcomponents,
      ...newSubcomponents,
    };
  }

  protected static createNewImportedComponent(componentType: NEW_COMPONENT_TYPES, componentGenerator: ComponentGenerator,
      overwritePropertiesFunc?: OverwritePropertiesFunc): NewComponentProperties {
    const baseName = UniqueSubcomponentNameGenerator.generate(
      AddNewSubcomponentShared.componentTypeToName[componentType]);
    const subcomponents = ImportedComponentGenerator.createImportedComponentSubcomponents(componentGenerator, baseName);
    const { subcomponentNames } = subcomponents[baseName].importedComponent.componentRef;
    if (overwritePropertiesFunc) overwritePropertiesFunc(subcomponents, subcomponentNames);
    return { baseName, subcomponents };
  }
}
