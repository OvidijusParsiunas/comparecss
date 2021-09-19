import { UpdateGenericComponentDropdownOptionNames } from '../../../../utils/componentManipulation/updateChildComponent/updateGenericComponentDropdownOptionNames';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { AddLayerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { DEFAULT_STYLES, LAYER_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';

export class AddComponentsToButtonBaseUtils {

  private static overwriteButtonTextProperties(textComponent: WorkshopComponent): void {
    const textContent = this as any as string;
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures.subcomponentText.text = textContent;
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomStaticFeatures.subcomponentText.text = textContent;
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteIconProperties(iconComponent: WorkshopComponent): void {
    iconComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  public static add(component: WorkshopComponent, textStyle: TEXT_STYLES, textContent: string, icon = false): void {
    const layerComponent = AddLayerComponent.add(component, LAYER_STYLES.PLAIN, false);
    AddContainerComponent.add(component, COMPONENT_TYPES.TEXT, textStyle,
      layerComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [AddComponentsToButtonBaseUtils.overwriteButtonTextProperties.bind(textContent)]);
    // WORK1
    if (icon) {
      AddContainerComponent.add(component, COMPONENT_TYPES.ICON, DEFAULT_STYLES.DEFAULT,
        layerComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [AddComponentsToButtonBaseUtils.overwriteIconProperties]);
    }
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(component, component.componentPreviewStructure.layers[0]);
  }
}
