import { GENERAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES } from '../../../../../../../consts/animationTypes.enum';
import { CustomFeatures, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { cardBase } from '../../cards/generators/base';

class ModalBase extends ComponentBuilder {

  private static createDefaultBaseCustomFeatures(): CustomFeatures {
    return {
      componentCenteringInScreen: ComponentBuilder.createComponentCenteringInParent(),
      backdrop: ComponentBuilder.createBackdropProperties(),
      animations: ComponentBuilder.createDisplayAnimationsProperties(GENERAL_ANIMATION_CLOSE_TYPES.FADE_OUT, MODAL_ANIMATION_OPEN_TYPES.FADE_IN),
      closeTriggers: ComponentBuilder.createComponentCloseTriggerProperties(),
    };
  }

  public static overwriteBaseCustomFeatures(cardComponent: WorkshopComponent): void {
    cardComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures = ModalBase.createDefaultBaseCustomFeatures();
    cardComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures = ModalBase.createDefaultBaseCustomFeatures();
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
