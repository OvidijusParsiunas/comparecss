import { UpdateGenericComponentDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { UpdateDropdownOptionNamesShared } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
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
  }

  private static overwriteTextProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
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

  public static overwriteBaseNewNestedComponentsOptions(alertComponent: WorkshopComponent): void {
    const { subcomponents, coreSubcomponentNames } = alertComponent;
    const nestedDropdownStructure = UpdateDropdownOptionNamesShared.generateNestedDropdownStructure([
      NESTED_COMPONENTS_BASE_NAMES.TEXT, NESTED_COMPONENTS_BASE_NAMES.CLOSE]);
    subcomponents[coreSubcomponentNames.base].newNestedComponentsOptions = nestedDropdownStructure;
  }
}

export const defaultAlert: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const alertComponent = alertBase.createNewComponent(baseName);
    DefaultAlert.overwriteBaseNewNestedComponentsOptions(alertComponent);
    DefaultAlert.addComponentsToBase(alertComponent);
    return alertComponent;
  },
};
