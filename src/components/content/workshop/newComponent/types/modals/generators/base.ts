import { GENERAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES } from '../../../../../../../consts/animationTypes.enum';
import { CustomFeatures, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { cardBase } from '../../cards/generators/base';

class ModalBase extends ComponentBuilder {

  private static createDefaultBaseCustomFeatures(): CustomFeatures {
    return {
      componentCenteringInParent: ComponentBuilder.createDefaultComponentCenteringInParent(),
      backdrop: ComponentBuilder.createDefaultBackdropProperties(),
      animations: ComponentBuilder.createDefaultAnimationsProperties(GENERAL_ANIMATION_CLOSE_TYPES.FADE_OUT, MODAL_ANIMATION_OPEN_TYPES.FADE_IN),
      closeTriggers: ComponentBuilder.createDefaultComponentCloseTriggerProperties(),
    };
  }

  public static overwriteBaseCustomFeatures(cardComponent: WorkshopComponent): void {
    cardComponent.subcomponents[cardComponent.coreSubcomponentNames.base].customFeatures = ModalBase.createDefaultBaseCustomFeatures();
    cardComponent.subcomponents[cardComponent.coreSubcomponentNames.base].defaultCustomFeatures = ModalBase.createDefaultBaseCustomFeatures();
  }
}

export const modalBase: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    const modalComponent = cardBase.createNewComponent();
    modalComponent.type = COMPONENT_TYPES.MODAL;
    ModalBase.overwriteBaseCustomFeatures(modalComponent);
    return modalComponent;
  },
}
