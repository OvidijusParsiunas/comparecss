import { UpdateGenericComponentDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { DEFAULT_STYLES, LAYER_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { CoreSubcomponentRefs } from '../../../../../../../interfaces/coreSubcomponentRefs';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';

export class AddComponentsToButtonBaseUtils {
  
  private static overwriteButtonTextProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    const textContent = this as any as string;
    coreSubcomponentRefs.base.customStaticFeatures.subcomponentText.text = textContent;
    coreSubcomponentRefs.base.defaultCustomStaticFeatures.subcomponentText.text = textContent;
  }

  public static add(component: WorkshopComponent, textStyle: TEXT_STYLES, textContent: string, icon = false): void {
    const layerSubcomponent = AddNewLayerComponent.add(component, LAYER_STYLES.PLAIN, false);
    const textSubcomponent = AddNewGenericComponent.add(component, COMPONENT_TYPES.TEXT, textStyle,
      layerSubcomponent.coreSubcomponentRefs.base.name, [AddComponentsToButtonBaseUtils.overwriteButtonTextProperties.bind(textContent)]);
    // WORK1
    const otherSubcomponentsToTrigger = [textSubcomponent.coreSubcomponentRefs.base];
    if (icon) {
      const iconComponent = AddNewGenericComponent.add(component, COMPONENT_TYPES.ICON, DEFAULT_STYLES.DEFAULT,
        layerSubcomponent.coreSubcomponentRefs.base.name);
      otherSubcomponentsToTrigger.push(iconComponent.coreSubcomponentRefs.base);
    }
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(component, component.componentPreviewStructure.layers[0]);
    component.coreSubcomponentRefs.base.otherSubcomponentsToTrigger = otherSubcomponentsToTrigger;
    component.coreSubcomponentRefs.text = textSubcomponent.coreSubcomponentRefs.base;
  }
}
