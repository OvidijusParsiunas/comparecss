import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class AddNewComponentShared {

  protected static addNewComponentToSubcomponentNameToDropdownOptionNameMap(parentComponent: WorkshopComponent,
      newComponent: WorkshopComponent, isEditable = true): void {
    if (!isEditable) return;
    const baseName = newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
    parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[baseName] = baseName;
  }

  private static setParentComponentReference(newComponent: WorkshopComponent, activeBaseComponent: WorkshopComponent): void {
    Object.keys(newComponent.subcomponents)
      .forEach((subcomponentName) => newComponent.subcomponents[subcomponentName].parentBaseComponentRef = activeBaseComponent);
  }

  protected static createNewComponentViaGenerator(componentGenerator: ComponentGenerator, activeBaseComponent: WorkshopComponent,
      newComponentName: string): WorkshopComponent {
    const newComponent = componentGenerator.createNewComponent(newComponentName);
    newComponent.subcomponents[newComponentName].nestedComponent = { ref: newComponent, inSync: false };
    AddNewComponentShared.setParentComponentReference(newComponent, activeBaseComponent);
    return newComponent;
  }
}
