import { DropdownOptionsDisplayStatusUtils } from '../../../dropdownOptionsDisplayStatusUtils/dropdownOptionsDisplayStatusUtils';
import { DROPDOWN_OPTION_DISPLAY_STATUS_REF } from '../../../../../../../interfaces/dropdownOptionDisplayStatus';
import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';

export class AddNewNestedComponentShared {

  // WORK1: will probably be able to remove this, and when that happens this class can be removed
  private static applyOptionalSubcomponentProperty(newComponent: WorkshopComponent, newComponentName: string): void {
    newComponent.componentPreviewStructure.subcomponentDropdownStructure
      [newComponentName][DROPDOWN_OPTION_DISPLAY_STATUS_REF] = DropdownOptionsDisplayStatusUtils.createDefaultOptionDisplayStatus();
  }

  protected static createNewComponentSubcomponents(componentGenerator: ComponentGenerator, newComponentName: string): Subcomponents {
    const newComponent = componentGenerator.createNewComponent(newComponentName);
    AddNewNestedComponentShared.applyOptionalSubcomponentProperty(newComponent, newComponentName);
    newComponent.subcomponents[newComponentName].nestedComponent = { ref: newComponent, inSync: false };
    return newComponent.subcomponents;
  }
}
