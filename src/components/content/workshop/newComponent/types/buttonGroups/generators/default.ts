import { UpdateContainerComponentDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateContainerComponentDropdownItemNames';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { AddLayerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { buttonGroupBase } from './base';

class DefaultButtonGroup extends ComponentBuilder {

  private static setComponentToRemovable(component: WorkshopComponent): void {
    component.baseSubcomponent.isRemovable = true;
  }

  public static addComponentsToBase(buttonGroupComponent: WorkshopComponent): void {
    const layerComponent = AddLayerComponent.add(buttonGroupComponent, LAYER_STYLES.PLAIN, false);
    const layerComponentBaseName = layerComponent.baseSubcomponent.name;
    AddContainerComponent.add(buttonGroupComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT, layerComponentBaseName);
    AddContainerComponent.add(buttonGroupComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT, layerComponentBaseName);
    AddContainerComponent.add(buttonGroupComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT, layerComponentBaseName);
    AddContainerComponent.add(buttonGroupComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLES.DEFAULT, layerComponentBaseName);
    UpdateContainerComponentDropdownItemNames.updateViaParentLayerPreviewStructure(buttonGroupComponent, buttonGroupComponent.componentPreviewStructure.layers[0]);
  }

  public static setPropertyOverwritables(buttonGroupComponent: WorkshopComponent): void {
    buttonGroupComponent.newChildComponents.propertyOverwritables = {
      postBuildFuncs: {
        [COMPONENT_TYPES.BUTTON]: [DefaultButtonGroup.setComponentToRemovable],
      },
      onBuildProperties: {
        [COMPONENT_TYPES.BUTTON]: { alignmentSection: ALIGNED_SECTION_TYPES.LEFT },
      },
    };
  }
}

export const defaultButtonGroup: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const buttonGroupComponent = buttonGroupBase.createNewComponent(presetProperties);
    DefaultButtonGroup.setPropertyOverwritables(buttonGroupComponent);
    DefaultButtonGroup.addComponentsToBase(buttonGroupComponent);
    return buttonGroupComponent;
  },
};
