import { UpdateGenericComponentDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateGenericComponentDropdownItemNames';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { AddLayerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { DEFAULT_STYLES, LAYER_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';

export class AddComponentsToButtonBaseUtils {

  private static overwriteButtonTextProperties(textComponent: WorkshopComponent): void {
    const textContent = this as any as string;
    textComponent.baseSubcomponent.customStaticFeatures.subcomponentText.text = textContent;
    textComponent.baseSubcomponent.defaultCustomStaticFeatures.subcomponentText.text = textContent;
    textComponent.baseSubcomponent.isRemovable = true;
  }

  private static overwriteIconProperties(iconComponent: WorkshopComponent): void {
    iconComponent.baseSubcomponent.isRemovable = true;
  }

  public static add(component: WorkshopComponent, textStyle: TEXT_STYLES, textContent: string, icon = false): void {
    const layerComponent = AddLayerComponent.add(component, LAYER_STYLES.PLAIN, false);
    AddContainerComponent.add(component, COMPONENT_TYPES.TEXT, textStyle,
      layerComponent.baseSubcomponent.name, [AddComponentsToButtonBaseUtils.overwriteButtonTextProperties.bind(textContent)]);
    if (icon) {
      AddContainerComponent.add(component, COMPONENT_TYPES.ICON, DEFAULT_STYLES.DEFAULT,
        layerComponent.baseSubcomponent.name, [AddComponentsToButtonBaseUtils.overwriteIconProperties]);
    }
    UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(component, component.componentPreviewStructure.layers[0]);
  }
}
