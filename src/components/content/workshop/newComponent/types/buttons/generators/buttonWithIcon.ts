import { UpdateGenericComponentDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateGenericComponentDropdownItemNames';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { DEFAULT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { defaultButton } from './default';

class ButtonWithIcon {

  public static addIcon(buttonComponent: WorkshopComponent): void {
    const layer = buttonComponent.componentPreviewStructure.layers[0];
    AddContainerComponent.add(buttonComponent, COMPONENT_TYPES.ICON, DEFAULT_STYLES.DEFAULT, layer.subcomponentProperties.name);
    UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(buttonComponent, layer);
  }

  private static overwriteIconProperties(iconComponent: WorkshopComponent): void {
    iconComponent.baseSubcomponent.isRemovable = true;
  }

  public static setPropertyOverwritables(buttonComponent: WorkshopComponent): void {
    buttonComponent.newChildComponents.propertyOverwritables = {
      postBuildCallbacks: {
        [COMPONENT_TYPES.ICON]: ButtonWithIcon.overwriteIconProperties,
      },
    };
  }
}

export const buttonWithIcon: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const buttonComponent = defaultButton.createNewComponent(presetProperties);
    ButtonWithIcon.setPropertyOverwritables(buttonComponent);
    ButtonWithIcon.addIcon(buttonComponent);
    return buttonComponent;
  },
}
