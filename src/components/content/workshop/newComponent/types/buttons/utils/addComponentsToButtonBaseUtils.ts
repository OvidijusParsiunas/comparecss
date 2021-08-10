import { UpdateGenericComponentDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { LAYER_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';

export class AddComponentsToButtonBaseUtils {
  
  private static overwriteButtonTextProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    const textContent = this as any as string;
    subcomponents[coreSubcomponentNames.base].customStaticFeatures.subcomponentText.text = textContent;
    subcomponents[coreSubcomponentNames.base].defaultCustomStaticFeatures.subcomponentText.text = textContent;
  }

  public static add(component: WorkshopComponent, textStyle: TEXT_STYLES, textContent: string): void {
    const layerSubcomponent = AddNewLayerComponent.add(component, LAYER_STYLES.PLAIN, false);
    const textSubcomponent = AddNewGenericComponent.add(component, COMPONENT_TYPES.TEXT, textStyle,
      layerSubcomponent.coreSubcomponentNames.base, [AddComponentsToButtonBaseUtils.overwriteButtonTextProperties.bind(textContent)]);
    const { coreSubcomponentNames, coreSubcomponentRefs } = component;
    component.componentPreviewStructure.baseSubcomponentProperties.nameOfAnotherSubcomponetToTrigger = textSubcomponent.coreSubcomponentNames.base;
    coreSubcomponentNames.text = textSubcomponent.coreSubcomponentNames.base;
    coreSubcomponentRefs.text = textSubcomponent.coreSubcomponentRefs.base;
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(component, component.componentPreviewStructure.layers[0]);
  }
}
