import { modalLayerTopSpecificSettings } from '../../modals/generators/modalLayerTopSpecificSettings';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { LayerBuilder } from './layerBuilder';

function overwriteSubcomponentSpecificSettings(textComponent: WorkshopComponent): void {
  textComponent.subcomponents[textComponent.subcomponentNames.base].subcomponentSpecificSettings = modalLayerTopSpecificSettings;
}

export const defaultLayer: ComponentGenerator = {
  createNewComponent(importedComponentBaseName: string): WorkshopComponent {
    const layerComponent = LayerBuilder.create({ baseName: importedComponentBaseName });
    overwriteSubcomponentSpecificSettings(layerComponent);
    return layerComponent;
  },
};
