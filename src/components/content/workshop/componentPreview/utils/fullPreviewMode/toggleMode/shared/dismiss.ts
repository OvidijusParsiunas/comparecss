import { COMPONENT_CARD_MARKER, COMPONENT_LIST_ITEM_MARKER, OPTION_MENU_BUTTON_MARKER } from '../../../../../../../../consts/elementClassMarkers';
import { WorkshopEventCallbackUtils } from '../../../../../toolbar/options/workshopEventCallbackUtils/workshopEventCallbackUtils';
import { WorkshopEventCallbackReturn } from '../../../../../../../../interfaces/workshopEventCallbackReturn';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../../consts/coreSubcomponentNames.enum';
import { SubcomponentProperties } from '../../../../../../../../interfaces/workshopComponent';
import { animationTypeToFunctionality } from '../../../animations/animationToFunctionality';
import { JAVASCRIPT_CLASSES } from '../../../../../../../../consts/javascriptClasses.enum';
import { CloseAnimation } from '../../../../../../../../interfaces/animations';
import AnimationUtils from '../../../animations/utils/animationUtils';
import { SET_METHODS } from '../../../animations/consts/sharedConsts';
import { fulPreviewModeState } from '../../fullPreviewModeState';
import { animationState } from '../../../animations/state';
import { ComponentOptions } from 'vue';
import ToggleOff from './toggleOff';

export default class Dismiss {

  private static readonly RESET_AFTER_CLOSE_ANIMATION_TIMEOUT_MILLISECONDS = 1000;
  private static readonly ALERT_BUTTON_NAMES = [CORE_SUBCOMPONENTS_NAMES.CLOSE];

  public static changeCloseButtonsJsClasses(componentPreviewComponent: ComponentOptions, methodName: SET_METHODS): void {
    Dismiss.ALERT_BUTTON_NAMES.forEach((buttonName) => {
      const buttonSubcomponentProperties: SubcomponentProperties = componentPreviewComponent.component.subcomponents[buttonName];
      buttonSubcomponentProperties.customFeatures.jsClasses[methodName](JAVASCRIPT_CLASSES.CLOSE_COMPONENT);
    });
  }

  private static removeComponent(componentElement: HTMLElement): void {
    componentElement.style.display = 'none';
    const pendingAnimationPreviewUnset = window.setTimeout(() => {
      AnimationUtils.cancelAnimationPreview(componentElement);
      componentElement.style.display = 'block';
    }, Dismiss.RESET_AFTER_CLOSE_ANIMATION_TIMEOUT_MILLISECONDS);
    animationState.setPendingAnimationPreviewUnsetState(pendingAnimationPreviewUnset);
  }

  private static closeAlert(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement): WorkshopEventCallbackReturn {
    const closeAnimation = animationTypeToFunctionality
      [componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.animations.close.type] as CloseAnimation;
    const animationDuration = componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.animations.close.duration;
    animationState.setIsAnimationPreviewInProgressState(true);
    setTimeout(closeAnimation.bind(this, animationDuration, componentElement,
      Dismiss.removeComponent.bind(Dismiss, componentElement)));
    return { shouldRepeat: false };
  }

  public static closeAlertCallback(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toggleFullPreviewModeOptionsCallback: () => void,
      event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    fulPreviewModeState.setIsAnimationInProgress(false);
    const buttonElement = WorkshopEventCallbackUtils.getParentElementIfSvg(event.target as HTMLElement);
    if ((buttonElement.classList.contains(JAVASCRIPT_CLASSES.CLOSE_COMPONENT))) {
      Dismiss.closeAlert(componentPreviewComponent, componentElement);
      return { shouldRepeat: true };
    }
    if (buttonElement.classList.contains(OPTION_MENU_BUTTON_MARKER)) {
      Dismiss.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.REMOVE);
      return { shouldRepeat: false };
    }
    if (buttonElement.classList.contains(COMPONENT_LIST_ITEM_MARKER) || buttonElement.classList.contains(COMPONENT_CARD_MARKER)) {
      ToggleOff.start(componentPreviewComponent, toolbarContainerElement, toggleFullPreviewModeOptionsCallback);
      return { shouldRepeat: false };
    }
    return { shouldRepeat: true };
  }
}
