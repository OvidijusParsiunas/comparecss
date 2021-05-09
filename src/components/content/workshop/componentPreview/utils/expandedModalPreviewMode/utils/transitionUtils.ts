import { OPACITY_INVISIBLE, OPACITY_VISIBLE, ALL_PROPERTIES, LINEAR_SPEED_TRANSITION } from '../consts/sharedConsts';
import { ElementStyleProperties } from '../../../../../../../interfaces/elementStyleProperties';
import { ExitTransitionCallback } from '../../../../../../../interfaces/modalTransitions';
import { BackdropProperties } from '../../../../../../../interfaces/workshopComponent';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import GeneralUtils from './generalUtils';

export default class TransitionUtils {

  private static readonly ENTRANCE_TRANSITION_PREVIEW_DELAY_MILLISECONDS = 150;
  private static readonly EXIT_TRANSITION_DURATION_REDUCTION_ON_NEW_DURATION_MILLISECONDS = 420;

  public static cancelModalTransitionPreview(modalElement: HTMLElement): void {
    if (expandedModalPreviewModeState.getIsTransitionPreviewInProgressState()) {
      GeneralUtils.unsetTransitionProperties(modalElement);
      GeneralUtils.setModalPropertiesBackToDefault(modalElement);
      expandedModalPreviewModeState.cancelPendingModalTransitionFunctionality();
      expandedModalPreviewModeState.setIsPreviewTransitionInProgressState(false);
      modalElement.style.opacity = OPACITY_VISIBLE;
    }
  }

  private static finishModalEntranceTransition(modalElement: HTMLElement,
      unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void): void {
    if (unsetTransitionPropertiesCallback) unsetTransitionPropertiesCallback(modalElement);
    // the reason why the states are set to false here, because there is no callback
    expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(false);
    expandedModalPreviewModeState.setIsPreviewTransitionInProgressState(false);
  }

  private static setModalTransitionProperties(modalElement: HTMLElement, opacity: string, transitionProperty: string,
      transitionDuration: string, transitionTimingFunction: string, modalElementProperties?: ElementStyleProperties): void {
    modalElement.style.opacity = opacity;
    modalElement.style.transitionProperty = transitionProperty;
    modalElement.style.transitionDuration = transitionDuration;
    modalElement.style.transitionTimingFunction = transitionTimingFunction;
    for (const key in (modalElementProperties || {})) {
      modalElement.style[key] = modalElementProperties[key];
    }
  }

  private static startModalEntranceTransitionAfterDelay(transitionDuration: string, modalElement: HTMLElement, 
      unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void, modalElementProperties?: ElementStyleProperties): void {
    expandedModalPreviewModeState.setIsWaitingTransitionDelayState(false);
    TransitionUtils.setModalTransitionProperties(modalElement, OPACITY_VISIBLE,
      ALL_PROPERTIES, transitionDuration, LINEAR_SPEED_TRANSITION, modalElementProperties);
    expandedModalPreviewModeState.markBeginningTimeOfTransitionState();
    const pendingModalTransitionEnd = window.setTimeout(() => {
      TransitionUtils.finishModalEntranceTransition(modalElement, unsetTransitionPropertiesCallback);
    }, GeneralUtils.secondsStringToMillisecondsNumber(transitionDuration));
    expandedModalPreviewModeState.setPendingModalTransitionEndState(pendingModalTransitionEnd);
  }

  private static calculateTransitionDelay(componentPreviewContainerElement: HTMLElement, transitionDelay?: string): number {
    // if the componentPreviewContainerElement is present - we can assume that this is an expand mode toggle transition
    if (componentPreviewContainerElement) {
      if (transitionDelay) {
        return GeneralUtils.secondsStringToMillisecondsNumber(transitionDelay);
      }
      return 0;
    }
    return TransitionUtils.ENTRANCE_TRANSITION_PREVIEW_DELAY_MILLISECONDS;
  }

  public static startModalEntranceTransition(transitionDuration: string, modalElement: HTMLElement, 
      unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void, componentPreviewContainerElement?: HTMLElement,
      transitionDelay?: string, modalElementProperties?: ElementStyleProperties): void {
    const modalTransitionDelay = window.setTimeout(() => { 
      TransitionUtils.startModalEntranceTransitionAfterDelay(
        transitionDuration, modalElement, unsetTransitionPropertiesCallback, modalElementProperties); 
    }, TransitionUtils.calculateTransitionDelay(componentPreviewContainerElement, transitionDelay));
    expandedModalPreviewModeState.setModalTransitionDelayState(modalTransitionDelay);
  }

  private static startBackdropHideTransition(backdropProperties: BackdropProperties, transitionDuration: string): void {
    if (backdropProperties) {
      backdropProperties.exitTransitionDuration = transitionDuration;
      backdropProperties.opacity = 0;
    }
  }
  
  private static finishModalExitTransition(modalElement: HTMLElement, exitTransitionCallback: ExitTransitionCallback,
      componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties, toolbarElement: HTMLElement,
      innerToolbarElement: HTMLElement, modalOverlayElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement): void {
    exitTransitionCallback(modalElement, componentPreviewContainerElement, backdropProperties, toolbarElement,
      innerToolbarElement, modalOverlayElement, toolbarPositionToggleElement);
  }

  private static calculateTransitionDurationMilliseconds(wasPreviousTransitionInterrupted: boolean, transitionDuration: string): number {
    const transitionDurationMilliseconds = GeneralUtils.secondsStringToMillisecondsNumber(transitionDuration);
    return wasPreviousTransitionInterrupted
      ? transitionDurationMilliseconds - TransitionUtils.EXIT_TRANSITION_DURATION_REDUCTION_ON_NEW_DURATION_MILLISECONDS
      : transitionDurationMilliseconds;
  }

  public static startModalAndBackdropExitTransition(transitionDuration: string, modalElement: HTMLElement,
      exitTransitionCallback: ExitTransitionCallback, componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties,
      toolbarElement: HTMLElement, innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, modalOverlayElement?: HTMLElement,
      wasPreviousTransitionInterrupted?: boolean, modalElementProperties?: ElementStyleProperties): void {
    TransitionUtils.startBackdropHideTransition(backdropProperties, transitionDuration);
    TransitionUtils.setModalTransitionProperties(modalElement, OPACITY_INVISIBLE, ALL_PROPERTIES, transitionDuration,
      LINEAR_SPEED_TRANSITION, modalElementProperties);
    expandedModalPreviewModeState.markBeginningTimeOfTransitionState();
    const pendingModalTransitionEnd = window.setTimeout(() => {
      TransitionUtils.finishModalExitTransition(modalElement, exitTransitionCallback, componentPreviewContainerElement, backdropProperties, toolbarElement,
        innerToolbarElement, modalOverlayElement, toolbarPositionToggleElement);
    }, TransitionUtils.calculateTransitionDurationMilliseconds(wasPreviousTransitionInterrupted, transitionDuration));
    expandedModalPreviewModeState.setPendingModalTransitionEndState(pendingModalTransitionEnd);
  }
}
