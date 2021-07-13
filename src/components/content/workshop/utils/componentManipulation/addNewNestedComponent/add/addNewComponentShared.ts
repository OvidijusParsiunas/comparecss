import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { Subcomponents } from '../../../../../../../interfaces/workshopComponent';

export class AddNewComponentShared {

  protected static createNewComponentSubcomponents(componentGenerator: ComponentGenerator, newComponentName: string): Subcomponents {
    const newComponent = componentGenerator.createNewComponent(newComponentName);
    newComponent.subcomponents[newComponentName].nestedComponent = { ref: newComponent, inSync: false };
    return newComponent.subcomponents;
  }
}
