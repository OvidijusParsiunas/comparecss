import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { textSpecificSettings } from '../settings/textSpecificSettings';
import { iconBase } from './base';

function addSubcomponentSpecificSettings(textComponent: WorkshopComponent): void {
  textComponent.coreSubcomponentRefs.base.subcomponentSpecificSettings = textSpecificSettings;
}

export const defaultIcon: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const textComponent = iconBase.createNewComponent(baseName);
    addSubcomponentSpecificSettings(textComponent);
    return textComponent;
  },
};
