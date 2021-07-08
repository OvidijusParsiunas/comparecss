import { GENERAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES } from '../../../../../../../consts/animationTypes.enum';
import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { CustomFeatures, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { cardBase } from '../../cards/generators/cardBaseBuilder';
import { ComponentBuilder } from '../../shared/componentBuilder';

export class ModalBuilder extends ComponentBuilder {

  private static createDefaultBaseCustomFeatures(): CustomFeatures {
    return {
      componentCenteringInParent: ComponentBuilder.createDefaultComponentCenteringInParent(),
      backdrop: ComponentBuilder.createDefaultBackdropProperties(),
      animations: ComponentBuilder.createDefaultAnimationsProperties(GENERAL_ANIMATION_CLOSE_TYPES.FADE_OUT, MODAL_ANIMATION_OPEN_TYPES.FADE_IN),
      closeTriggers: ComponentBuilder.createDefaultComponentCloseTriggerProperties(),
    };
  }

  private static overwriteBaseSubcomponentCustomFeatures(cardComponent: WorkshopComponent): void {
    cardComponent.subcomponents[cardComponent.coreSubcomponentNames.base].customFeatures = ModalBuilder.createDefaultBaseCustomFeatures();
    cardComponent.subcomponents[cardComponent.coreSubcomponentNames.base].defaultCustomFeatures = ModalBuilder.createDefaultBaseCustomFeatures();
  }

  // WORK2
  public static create(componentStyle: NewComponentStyleProperties = {}): WorkshopComponent {
    componentStyle.componentType = COMPONENT_TYPES.MODAL;
    const modalComponent = cardBase.createNewComponent();
    modalComponent.type = COMPONENT_TYPES.MODAL;
    ModalBuilder.overwriteBaseSubcomponentCustomFeatures(modalComponent);
    return modalComponent;
  }
}
