import { modalTextSpecificSettings } from '../../modals/properties/modalTextSpecificSettings';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { TextBuilder } from './textBuilder';

function addSubcomponentSpecificSettings(textComponent: WorkshopComponent): void {
  textComponent.subcomponents[textComponent.subcomponentNames.base].subcomponentSpecificSettings = modalTextSpecificSettings;
}

export const defaultText: ComponentGenerator = {
  createNewComponent(importedComponentBaseName: string): WorkshopComponent {
    const textComponent = TextBuilder.create({ baseName: importedComponentBaseName });
    addSubcomponentSpecificSettings(textComponent);
    return textComponent;
  },
};
