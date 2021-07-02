import { COMPONENT_CARD_MARKER, COMPONENT_LIST_ITEM_MARKER, OPTION_MENU_BUTTON_MARKER } from '../../../../../../../../consts/elementClassMarkers';
import { WorkshopEventCallbackUtils } from '../../../../../toolbar/options/workshopEventCallbackUtils/workshopEventCallbackUtils';
import { ToggleFullPreviewModeOffCallbacks } from '../../../../../../../../interfaces/toggleFullPreviewModeEvent';
import { WorkshopEventCallbackReturn } from '../../../../../../../../interfaces/workshopEventCallbackReturn';
import { OtherWorkshopEventCallbackDetails } from '../../../../../../../../interfaces/workshopEventCallback';
import { PARENT_SUBCOMPONENT_NAME } from '../../../../../../../../consts/baseSubcomponentNames.enum';
import { SubcomponentProperties } from '../../../../../../../../interfaces/workshopComponent';
import { animationTypeToFunctionality } from '../../../animations/animationToFunctionality';
import { JAVASCRIPT_CLASSES } from '../../../../../../../../consts/javascriptClasses.enum';
import { TEXT_STYLES } from '../../../../../../../../consts/componentStyles.enum';
import { CloseAnimation } from '../../../../../../../../interfaces/animations';
import AnimationUtils from '../../../animations/utils/animationUtils';
import { SET_METHODS } from '../../../animations/consts/sharedConsts';
import { fulPreviewModeState } from '../../fullPreviewModeState';
import { animationState } from '../../../animations/state';
import GeneralUtils from '../generalUtils';
import { ComponentOptions } from 'vue';
import ToggleOff from './toggleOff';

export default class Dismiss {

  private static readonly RESET_AFTER_CLOSE_ANIMATION_TIMEOUT_MILLISECONDS = 1000;

  public static changeCloseButtonsJsClasses(componentPreviewComponent: ComponentOptions, methodName: SET_METHODS): void {
    const { subcomponents } = componentPreviewComponent.component;
    const subcomponentNames = Object.keys(subcomponents);
    for (let i = 0; i < subcomponentNames.length; i += 1) {
      if (subcomponents[subcomponentNames[i]].style === TEXT_STYLES.CLOSE_BUTTON) {
        const buttonSubcomponentProperties: SubcomponentProperties = subcomponents[subcomponentNames[i]];
        buttonSubcomponentProperties.customFeatures.jsClasses[methodName](JAVASCRIPT_CLASSES.CLOSE_COMPONENT);
        break;
      }
    }
  }

  private static removeComponent(componentElement: HTMLElement): void {
    componentElement.style.display = 'none';
    const pendingAnimationPreviewUnset = window.setTimeout(() => {
      AnimationUtils.cancelAnimationPreview(componentElement);
      componentElement.style.display = 'block';
    }, Dismiss.RESET_AFTER_CLOSE_ANIMATION_TIMEOUT_MILLISECONDS);
    animationState.setPendingAnimationPreviewUnsetState(pendingAnimationPreviewUnset);
  }

  private static close(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement): WorkshopEventCallbackReturn {
    const { type, duration } = componentPreviewComponent.component[PARENT_SUBCOMPONENT_NAME.BASE].customFeatures.animations.close;
    const closeAnimation = animationTypeToFunctionality[type] as CloseAnimation;
    const animationDuration = duration;
    animationState.setIsAnimationPreviewInProgressState(true);
    setTimeout(closeAnimation.bind(this, animationDuration, componentElement,
      Dismiss.removeComponent.bind(Dismiss, componentElement)));
    return { shouldRepeat: false };
  }

  public static closeCallback(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toggleFullPreviewModeOffCallbacks: ToggleFullPreviewModeOffCallbacks,
      event: Event | KeyboardEvent, otherWorkshopEventCallbackDetails: OtherWorkshopEventCallbackDetails): WorkshopEventCallbackReturn {
    fulPreviewModeState.setIsAnimationInProgress(false);
    const buttonElement = WorkshopEventCallbackUtils.getParentElementIfSvg(
      otherWorkshopEventCallbackDetails.lastMouseDownTarget || event.target as HTMLElement);
    if ((buttonElement.classList.contains(JAVASCRIPT_CLASSES.CLOSE_COMPONENT))) {
      Dismiss.close(componentPreviewComponent, componentElement);
      return { shouldRepeat: true };
    }
    if (buttonElement.classList.contains(OPTION_MENU_BUTTON_MARKER)) {
      Dismiss.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.REMOVE);
      return { shouldRepeat: false };
    }
    if (buttonElement.classList.contains(COMPONENT_LIST_ITEM_MARKER) || buttonElement.classList.contains(COMPONENT_CARD_MARKER)) {
      ToggleOff.start(componentPreviewComponent, toolbarContainerElement, toggleFullPreviewModeOffCallbacks.toggleFullPreviewModeOptionsCallback);
      toggleFullPreviewModeOffCallbacks.toggleFullPreviewModeOffWorkshopCallback(GeneralUtils.switchComponentsWithFadeOut,
        componentPreviewComponent.$refs.baseComponent.$refs.componentPreview);
      return { shouldRepeat: false };
    }
    return { shouldRepeat: true };
  }
}
