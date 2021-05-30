import { animationTypeToFunctionality } from '../../../animations/animationToFunctionality';
import { WorkshopEventCallbackUtils } from '../../../../../toolbar/options/workshopEventCallbackUtils/workshopEventCallbackUtils';
import { WorkshopEventCallbackReturn } from '../../../../../../../../interfaces/workshopEventCallbackReturn';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../../consts/coreSubcomponentNames.enum';
import { OPTION_MENU_BUTTON_MARKER } from '../../../../../../../../consts/elementClassMarkers';
import { SubcomponentProperties } from '../../../../../../../../interfaces/workshopComponent';
import { JAVASCRIPT_CLASSES } from '../../../../../../../../consts/javascriptClasses.enum';
import { ExitAnimation } from '../../../../../../../../interfaces/animations';
import AnimationUtils from '../../../animations/utils/animationUtils';
import { SET_METHODS } from '../../../animations/consts/sharedConsts';
import { fulPreviewModeState } from '../../fullPreviewModeState';
import { animationState } from '../../../animations/state';
import FullPreviewModeUtils from '../generalUtils';
import { ComponentOptions } from 'vue';

export default class DismissAlert {

  private static readonly RESET_AFTER_EXIT_ANIMATION_TIMEOUT_MILLISECONDS = 1000;
  private static readonly ALERT_BUTTON_NAMES = [CORE_SUBCOMPONENTS_NAMES.CLOSE];

  public static changeCloseButtonsJsClasses(componentPreviewComponent: ComponentOptions, methodName: SET_METHODS): void {
    DismissAlert.ALERT_BUTTON_NAMES.forEach((buttonName) => {
      const buttonSubcomponentProperties: SubcomponentProperties = componentPreviewComponent.component.subcomponents[buttonName];
      buttonSubcomponentProperties.customFeatures.jsClasses[methodName](JAVASCRIPT_CLASSES.CLOSE_COMPONENT);
    });
  }

  private static removeComponent(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement): void {
    componentElement.style.display = 'none';
    setTimeout(() => {
      AnimationUtils.cancelAnimationPreview(componentElement);
      componentElement.style.display = 'block';
      FullPreviewModeUtils.createWorkshopEventCallback(componentPreviewComponent,
      DismissAlert.closeAlertCallback.bind(this, componentPreviewComponent, componentElement));
    }, DismissAlert.RESET_AFTER_EXIT_ANIMATION_TIMEOUT_MILLISECONDS);
  }

  private static closeAlert(componentPreviewComponent: ComponentOptions, componentPreviewElement: HTMLElement): WorkshopEventCallbackReturn {
    const closeAnimation = animationTypeToFunctionality
      [componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.animations.exit.type] as ExitAnimation;
    const animationDuration = componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.animations.exit.duration;
    animationState.setIsAnimationPreviewInProgressState(true);
    setTimeout(closeAnimation.bind(this, animationDuration, componentPreviewElement, DismissAlert.removeComponent.bind(DismissAlert, componentPreviewComponent)));
    return { shouldRepeat: false };
  }

  public static closeAlertCallback(componentPreviewComponent: ComponentOptions, componentPreviewElement: HTMLElement,
      event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    fulPreviewModeState.setIsAnimationInProgress(false);
    const buttonElement = WorkshopEventCallbackUtils.getParentElementIfSvg(event.target as HTMLElement);
    if ((buttonElement.classList.contains(JAVASCRIPT_CLASSES.CLOSE_COMPONENT))) {
      return DismissAlert.closeAlert(componentPreviewComponent, componentPreviewElement);
    }
    if (buttonElement.classList.contains(OPTION_MENU_BUTTON_MARKER)) {
      DismissAlert.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.REMOVE);
      return { shouldRepeat: false };
    }
    return { shouldRepeat: true };
  }
}
