import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';

export class AddNewComponentShared {

  protected static addNewComponentToSubcomponentNameToDropdownOptionNameMap(parentComponent: WorkshopComponent,
      newComponent: WorkshopComponent, isEditable = true): void {
    if (!isEditable) return;
    const baseName = newComponent.coreSubcomponentNames.base;
    parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[baseName] = baseName;
  }

  protected static createNewComponentSubcomponents(componentGenerator: ComponentGenerator, newComponentName: string): Subcomponents {
    const newComponent = componentGenerator.createNewComponent(newComponentName);
    newComponent.subcomponents[newComponentName].nestedComponent = { ref: newComponent, inSync: false };
    return newComponent.subcomponents;
  }
}
