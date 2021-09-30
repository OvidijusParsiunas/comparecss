import { UpdateGenericComponentDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updateGenericComponentDropdownItemNames';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { AddLayerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { alertBase } from './base';

class DefaultAlert extends ComponentBuilder {

  private static overwriteCloseButtonProperties(closeButtonComponent: WorkshopComponent): void {
    closeButtonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    closeButtonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
    closeButtonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  private static overwriteTextProperties(textComponent: WorkshopComponent): void {
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomStaticFeatures.alignedLayerSection = ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER);
    textComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
  }

  public static addComponentsToBase(alertComponent: WorkshopComponent): void {
    const layerComponent = AddLayerComponent.add(alertComponent, LAYER_STYLES.PLAIN, false);
    const layerComponentBaseName = layerComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
    AddContainerComponent.add(alertComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layerComponentBaseName, [DefaultAlert.overwriteTextProperties]);
    AddContainerComponent.add(alertComponent, COMPONENT_TYPES.BUTTON,
      BUTTON_STYLES.CLOSE, layerComponentBaseName, [DefaultAlert.overwriteCloseButtonProperties]);
    UpdateGenericComponentDropdownItemNames.updateViaParentLayerPreviewStructure(alertComponent, alertComponent.componentPreviewStructure.layers[0]);
  }
}

export const defaultAlert: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const alertComponent = alertBase.createNewComponent(baseName);
    DefaultAlert.addComponentsToBase(alertComponent);
    return alertComponent;
  },
};
