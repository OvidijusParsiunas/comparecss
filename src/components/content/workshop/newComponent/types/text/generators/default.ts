import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { textSpecificSettings } from '../settings/textSpecificSettings';
import { TextBuilder } from './textBuilder';

function addSubcomponentSpecificSettings(textComponent: WorkshopComponent): void {
  textComponent.subcomponents[textComponent.coreSubcomponentNames.base].subcomponentSpecificSettings = textSpecificSettings;
}

export const defaultText: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const textComponent = TextBuilder.create({ baseName });
    addSubcomponentSpecificSettings(textComponent);
    return textComponent;
  },
};
