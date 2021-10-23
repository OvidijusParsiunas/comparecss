import { UpdateContainerComponentDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateContainerComponentDropdownItemNames';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { AddLayerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { alertBase } from './base';

class DefaultAlert extends ComponentBuilder {

  private static setComponentToRemovable(component: WorkshopComponent): void {
    component.baseSubcomponent.isRemovable = true;
  }

  public static addComponentsToBase(alertComponent: WorkshopComponent): void {
    const layerComponent = AddLayerComponent.add(alertComponent, LAYER_STYLES.PLAIN, false);
    const layerComponentBaseName = layerComponent.baseSubcomponent.name;
    AddContainerComponent.add(alertComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT, layerComponentBaseName);
    AddContainerComponent.add(alertComponent, COMPONENT_TYPES.BUTTON, BUTTON_STYLES.CLOSE, layerComponentBaseName);
    UpdateContainerComponentDropdownItemNames.updateViaParentLayerPreviewStructure(alertComponent, alertComponent.componentPreviewStructure.layers[0]);
  }

  public static setPropertyOverwritables(alertComponent: WorkshopComponent): void {
    alertComponent.newChildComponents.propertyOverwritables = {
      postBuildFuncs: {
        [COMPONENT_TYPES.TEXT]: [DefaultAlert.setComponentToRemovable],
        [COMPONENT_TYPES.BUTTON]: [DefaultAlert.setComponentToRemovable],
      },
      onBuildProperties: {
        [COMPONENT_TYPES.TEXT]: { alignmentSection: ALIGNED_SECTION_TYPES.CENTER },
        [COMPONENT_TYPES.BUTTON]: { alignmentSection: ALIGNED_SECTION_TYPES.RIGHT },
      },
    };
  }
}

export const defaultAlert: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const alertComponent = alertBase.createNewComponent(presetProperties);
    DefaultAlert.setPropertyOverwritables(alertComponent);
    DefaultAlert.addComponentsToBase(alertComponent);
    return alertComponent;
  },
};
