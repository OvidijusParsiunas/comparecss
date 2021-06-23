import { modalLayerTopSpecificSettings } from '../../modals/generators/modalLayerTopSpecificSettings';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { LayerBuilder } from './layerBuilder';

function overwriteSubcomponentSpecificSettings(textComponent: WorkshopComponent): void {
  textComponent.subcomponents[textComponent.subcomponentNames.base].subcomponentSpecificSettings = modalLayerTopSpecificSettings;
}

export const defaultLayer: ComponentGenerator = {
  createNewComponent(importedComponentBaseName: string): WorkshopComponent {
    // WORK1: make sure shadow is always casted to bottom except the last layer which should not have a shadow
    const layerComponent = LayerBuilder.create({ baseName: importedComponentBaseName });
    overwriteSubcomponentSpecificSettings(layerComponent);
    return layerComponent;
  },
};
