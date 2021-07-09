import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { LAYER_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import ReferenceSharingUtils from '../utils/referenceSharingUtils';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { buttonBase } from './base';

export class DefaultButton extends ComponentBuilder {

  private static overwriteButtonTextProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customStaticFeatures.subcomponentText.text = 'Button';
    subcomponents[coreSubcomponentNames.base].defaultCustomStaticFeatures.subcomponentText.text = 'Button';
  }

  public static addComponentsToBase(buttonComponent: WorkshopComponent): void {
    const layerSubcomponent = AddNewLayerComponent.add(buttonComponent, LAYER_STYLES.PLAIN, false);
    const textSubcomponent = AddNewGenericComponent.add(buttonComponent, COMPONENT_TYPES.TEXT, TEXT_STYLES.BUTTON,
      layerSubcomponent.coreSubcomponentNames.base, [DefaultButton.overwriteButtonTextProperties]);
    const { coreSubcomponentNames } = buttonComponent;
    buttonComponent.componentPreviewStructure.baseSubcomponentProperties.nameOfAnotherSubcomponetToTrigger = textSubcomponent.coreSubcomponentNames.base;
    coreSubcomponentNames.text = textSubcomponent.coreSubcomponentNames.base;
  }

  public static addReferences(buttonComponent: WorkshopComponent): void {
    const { coreSubcomponentNames } = buttonComponent;
    ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents(buttonComponent.subcomponents, coreSubcomponentNames);
    ReferenceSharingUtils.appendBaseSubcomponentRefToAllChildSubcomponents(buttonComponent.subcomponents, coreSubcomponentNames);
    buttonComponent.referenceSharingExecutables = [ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents];
  }
}

export const defaultButton: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const buttonComponent = buttonBase.createNewComponent(baseName);
    DefaultButton.addComponentsToBase(buttonComponent);
    DefaultButton.addReferences(buttonComponent);
    return buttonComponent;
  },
}
