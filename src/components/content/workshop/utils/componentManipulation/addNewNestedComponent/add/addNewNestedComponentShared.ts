import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { EntityDisplayStatusUtils } from '../../../entityDisplayStatus/entityDisplayStatusUtils';
import { ENTITY_DISPLAY_STATUS_REF } from '../../../../../../../interfaces/entityDisplayStatus';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';

export class AddNewNestedComponentShared {

  // WORK1: will probably be able to remove this, and when that happens this class can be removed
  private static applyOptionalSubcomponentProperty(newComponent: WorkshopComponent, newComponentName: string): void {
    const baseSubcomponent = newComponent.subcomponents[newComponentName];
    baseSubcomponent.subcomponentDisplayStatus = EntityDisplayStatusUtils.createDefaultEntityDisplayStatus();
    newComponent.componentPreviewStructure.subcomponentDropdownStructure
      [newComponentName][ENTITY_DISPLAY_STATUS_REF] = baseSubcomponent.subcomponentDisplayStatus;
  }

  protected static createNewComponentSubcomponents(componentGenerator: ComponentGenerator, newComponentName: string): Subcomponents {
    const newComponent = componentGenerator.createNewComponent(newComponentName);
    AddNewNestedComponentShared.applyOptionalSubcomponentProperty(newComponent, newComponentName);
    newComponent.subcomponents[newComponentName].nestedComponent = { ref: newComponent, inSync: false };
    return newComponent.subcomponents;
  }
}
