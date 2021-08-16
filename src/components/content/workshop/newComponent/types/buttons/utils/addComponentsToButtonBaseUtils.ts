import { UpdateGenericComponentDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { DEFAULT_STYLES, LAYER_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { CoreSubcomponentRefs } from '../../../../../../../interfaces/coreSubcomponentRefs';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';

export class AddComponentsToButtonBaseUtils {
  
  private static overwriteButtonTextProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    const textContent = this as any as string;
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures.subcomponentText.text = textContent;
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomStaticFeatures.subcomponentText.text = textContent;
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteIconProperties(coreSubcomponentRefs: CoreSubcomponentRefs): void {
    coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  public static add(component: WorkshopComponent, textStyle: TEXT_STYLES, textContent: string, icon = false): void {
    const layerComponent = AddNewLayerComponent.add(component, LAYER_STYLES.PLAIN, false);
    const textComponent = AddNewGenericComponent.add(component, COMPONENT_TYPES.TEXT, textStyle,
      layerComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [AddComponentsToButtonBaseUtils.overwriteButtonTextProperties.bind(textContent)]);
    // WORK1
    component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].otherSubcomponentsToTrigger[SUBCOMPONENT_TYPES.TEXT] = textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    if (icon) {
      const iconComponent = AddNewGenericComponent.add(component, COMPONENT_TYPES.ICON, DEFAULT_STYLES.DEFAULT,
        layerComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, [AddComponentsToButtonBaseUtils.overwriteIconProperties]);
      component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].otherSubcomponentsToTrigger[SUBCOMPONENT_TYPES.ICON] = iconComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    }
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(component, component.componentPreviewStructure.layers[0]);
    component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT] = textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
  }
}
