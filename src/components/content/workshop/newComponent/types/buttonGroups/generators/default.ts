import { UpdateContainerComponentDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateContainerComponentDropdownItemNames';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { DEFAULT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { buttonGroupBase } from './base';

class DefaultButtonGroup extends ComponentBuilder {

  public static addComponentsToBase(buttonGroupComponent: WorkshopComponent): void {
    const layerComponent = buttonGroupComponent.componentPreviewStructure.layers[0];
    const layerComponentBaseName = layerComponent.subcomponentProperties.name;
    AddContainerComponent.add(buttonGroupComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT, layerComponentBaseName);
    AddContainerComponent.add(buttonGroupComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT, layerComponentBaseName);
    AddContainerComponent.add(buttonGroupComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT, layerComponentBaseName);
    AddContainerComponent.add(buttonGroupComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT, layerComponentBaseName);
    UpdateContainerComponentDropdownItemNames.updateViaParentLayerPreviewStructure(buttonGroupComponent, layerComponent);
  }
}

export const defaultButtonGroup: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const buttonGroupComponent = buttonGroupBase.createNewComponent(presetProperties);
    DefaultButtonGroup.addComponentsToBase(buttonGroupComponent);
    return buttonGroupComponent;
  },
};
