import { UpdateGenericComponentDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { alertBase } from './base';

class DefaultAlert extends ComponentBuilder {

  private static overwriteCloseButtonProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    subcomponents[coreSubcomponentNames.base].isRemovable = true;
  }

  private static overwriteTextProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
    subcomponents[coreSubcomponentNames.base].isRemovable = true;
  }

  public static addComponentsToBase(alertComponent: WorkshopComponent): void {
    const layerComponent = AddNewLayerComponent.add(alertComponent, LAYER_STYLES.PLAIN, false);
    const layerComponentBaseName = layerComponent.coreSubcomponentNames.base;
    AddNewGenericComponent.add(alertComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layerComponentBaseName, [DefaultAlert.overwriteTextProperties]);
    AddNewGenericComponent.add(alertComponent, COMPONENT_TYPES.BUTTON,
      BUTTON_STYLES.CLOSE, layerComponentBaseName, [DefaultAlert.overwriteCloseButtonProperties]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(alertComponent, alertComponent.componentPreviewStructure.layers[0]);
  }
}

export const defaultAlert: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const alertComponent = alertBase.createNewComponent(baseName);
    DefaultAlert.addComponentsToBase(alertComponent);
    return alertComponent;
  },
};
