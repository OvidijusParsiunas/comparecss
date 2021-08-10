import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';

export class AddNewComponentShared {

  protected static addNewComponentToSubcomponentNameToDropdownOptionNameMap(parentComponent: WorkshopComponent,
      newComponent: WorkshopComponent, isEditable = true): void {
    if (!isEditable) return;
    const baseName = newComponent.coreSubcomponentRefs.base.name;
    parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[baseName] = baseName;
  }

  private static addParentAuxiliaryComponentReference(newComponent: WorkshopComponent, activeBaseComponent: WorkshopComponent): void {
    Object.keys(newComponent.subcomponents)
      .forEach((subcomponentName) => newComponent.subcomponents[subcomponentName].parentAuxiliaryComponent = activeBaseComponent);
  }

  protected static createNewComponentSubcomponents(componentGenerator: ComponentGenerator, activeBaseComponent: WorkshopComponent,
      newComponentName: string): Subcomponents {
    const newComponent = componentGenerator.createNewComponent(newComponentName);
    newComponent.subcomponents[newComponentName].nestedComponent = { ref: newComponent, inSync: false };
    if (activeBaseComponent.coreBaseComponent) {
      AddNewComponentShared.addParentAuxiliaryComponentReference(newComponent, activeBaseComponent);
    }
    return newComponent.subcomponents;
  }
}
