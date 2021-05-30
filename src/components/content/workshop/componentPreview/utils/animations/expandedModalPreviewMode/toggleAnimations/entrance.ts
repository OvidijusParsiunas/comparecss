import { COMPONENT_PREVIEW_CLASSES } from '../../../../../../../../consts/componentPreviewClasses';
import { BackdropProperties } from '../../../../../../../../interfaces/workshopComponent';
import { fulPreviewModeState } from '../../../fullPreviewMode/fullPreviewModeState';
import { EntranceAnimation } from '../../../../../../../../interfaces/animations';
import { AssembleAnimationValues } from '../utils/assembleAnimationValues';
import GeneralUtils from '../../utils/generalUtils';
import { animationState } from '../../state';
import { ComponentOptions } from 'vue';
import {
  MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, OPACITY_INVISIBLE, OPACITY_VISIBLE, CLASSLIST_METHODS,
  MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS, POINTER_EVENTS_NONE, POINTER_EVENTS_REMOVE,
  TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS, TOOLBAR_FADE_ANIMATION_DURATION_SECONDS, 
} from '../../consts/sharedConsts';
import {
  TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS, TOOLBAR_CONTAINER_GENERAL_CLASSES,
  EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES,
} from '../../../../../../../../consts/toolbarClasses';

export default class ModeToggleEntranceAnimation {

  private static TIME_FOR_BACKDROP_TO_BE_RENDERED_MILLISECONDS = 10;

  // UX - EXPANDED MODAL TOGGLE ANIMATION
  // private static toolbarFadeInAnimation(toolbarContainerElement: HTMLElement, animationDuration: string): void {
  //   GeneralUtils.opacityFadeAnimation(OPACITY_VISIBLE, animationDuration, toolbarContainerElement);
  //   const pendingToolbarEntranceAnimationUnset = window.setTimeout(() => {
  //     GeneralUtils.unsetAnimationProperties(toolbarContainerElement);
  //   }, GeneralUtils.secondsStringToMillisecondsNumber(animationDuration));
  //   animationState.setPendingToolbarEntranceAnimationUnsetState(pendingToolbarEntranceAnimationUnset);
  // }

  // private static startToolbarAnimation(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, animationDuration: string): void {
  //   toolbarElement.classList.add(TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS);
  //   toolbarContainerElement.classList.replace(TOOLBAR_CONTAINER_GENERAL_CLASSES.DEFAULT, TOOLBAR_CONTAINER_GENERAL_CLASSES.EXPANDED_MODAL_MODE_ACTIVE);
  //   if (animationState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
  //     toolbarContainerElement.classList.add(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
  //   }
  //   toolbarPositionToggleElement.style.display = 'block';
  //   ModeToggleEntranceAnimation.toolbarFadeInAnimation(toolbarContainerElement, animationDuration);
  // }

  private static toolbarFadeInAnimation(toolbarContainerElement: HTMLElement, animationDurationSeconds: string, animationDurationMilliseconds: number): void {
    GeneralUtils.opacityFadeAnimation(OPACITY_VISIBLE, animationDurationSeconds, toolbarContainerElement);
    const pendingToolbarEntranceAnimationUnset = window.setTimeout(() => {
      GeneralUtils.unsetAnimationProperties(toolbarContainerElement);
      GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_REMOVE);
      animationState.setIsToolbarFadeAnimationInProgressState(false);
    }, animationDurationMilliseconds);
    animationState.setPendingToolbarEntranceAnimationUnsetState(pendingToolbarEntranceAnimationUnset);
  }

  private static getNewToolbarAnimationDuration(modalAnimationDelay: string): [string, number] {
    const modalAnimationDelayMilliseconds = GeneralUtils.secondsStringToMillisecondsNumber(modalAnimationDelay);
    if (modalAnimationDelayMilliseconds < TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS) {
      return [modalAnimationDelay, modalAnimationDelayMilliseconds];
    }
    return [TOOLBAR_FADE_ANIMATION_DURATION_SECONDS, TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS];
  }

  private static prepareToolbarAnimation(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      toolbarPositionToggleElement: HTMLElement): void {
    toolbarElement.classList.add(TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS);
    toolbarContainerElement.classList.replace(TOOLBAR_CONTAINER_GENERAL_CLASSES.DEFAULT, TOOLBAR_CONTAINER_GENERAL_CLASSES.EXPANDED_MODAL_MODE_ACTIVE);
    if (animationState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM
        && !fulPreviewModeState.getIsExpandedModalPreviewModeActivated()) {
      toolbarContainerElement.classList.add(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
    }
    if (toolbarPositionToggleElement) toolbarPositionToggleElement.style.display = 'block';
  }

  private static startToolbarAnimation(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      toolbarPositionToggleElement: HTMLElement, animationDelay: string): void {
    ModeToggleEntranceAnimation.prepareToolbarAnimation(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
    const [toolbarAnimationDurationSeconds, toolbarAnimationDurationMilliseconds] = ModeToggleEntranceAnimation
      .getNewToolbarAnimationDuration(animationDelay);
    const pendingToolbarEntranceFadeInAnimation = window.setTimeout(() => {
      ModeToggleEntranceAnimation.toolbarFadeInAnimation(toolbarContainerElement, toolbarAnimationDurationSeconds, toolbarAnimationDurationMilliseconds);
    }, toolbarAnimationDurationMilliseconds);
    animationState.setPendingToolbarEntranceFadeInAnimationState(pendingToolbarEntranceFadeInAnimation);
  }

  private static startToolbarAnimationWithFadeOut(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      toolbarPositionToggleElement: HTMLElement, animationDelay: string): void {
    GeneralUtils.opacityFadeAnimation(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, toolbarContainerElement);
    window.setTimeout(() => {
      ModeToggleEntranceAnimation.startToolbarAnimation(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, animationDelay);
    }, MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS);
  }

  private static displayBackdrop(backdropProperties: BackdropProperties): void {
    backdropProperties.visible = true;
    setTimeout(() => {
      backdropProperties.opacity = 1;
    }, ModeToggleEntranceAnimation.TIME_FOR_BACKDROP_TO_BE_RENDERED_MILLISECONDS);
  }

  private static setComponentPreviewContainerToModalView(modalContainerElement: HTMLElement): void {
    modalContainerElement.classList.replace(COMPONENT_PREVIEW_CLASSES.DEFAULT, COMPONENT_PREVIEW_CLASSES.EXPANDED_MODAL_MODE_ACTIVE);
    setTimeout(() => {
      modalContainerElement.style.opacity = OPACITY_VISIBLE;
    }, ModeToggleEntranceAnimation.TIME_FOR_BACKDROP_TO_BE_RENDERED_MILLISECONDS);
  }

  private static startModalAndBackdropAnimation(modalContainerElement: HTMLElement, modalElement: HTMLElement,
      modalOverlayElement: HTMLElement, backdropProperties: BackdropProperties, modalEntranceAnimation: EntranceAnimation,
      animationDuration: string, animationDelay?: string): void {
    GeneralUtils.toggleModalStaticPosition(modalElement, modalOverlayElement, CLASSLIST_METHODS.REMOVE);
    ModeToggleEntranceAnimation.setComponentPreviewContainerToModalView(modalContainerElement);
    ModeToggleEntranceAnimation.displayBackdrop(backdropProperties);
    setTimeout(() => { modalEntranceAnimation(animationDuration, modalElement, GeneralUtils.unsetAnimationProperties,
      modalContainerElement, animationDelay); });
  }

  private static startModalAndToolbarAnimationWithFadeOut(modalContainerElement: HTMLElement, modalElement: HTMLElement,
      modalOverlayElement: HTMLElement, backdropProperties: BackdropProperties, modalEntranceAnimation: EntranceAnimation,
      animationDuration: string, animationDelay?: string): void {
    GeneralUtils.opacityFadeAnimation(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, modalElement);
    window.setTimeout(() => {
      ModeToggleEntranceAnimation.startModalAndBackdropAnimation(modalContainerElement, modalElement, modalOverlayElement,
        backdropProperties, modalEntranceAnimation, animationDuration, animationDelay);
    }, MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS);
  }

  public static start(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      toolbarPositionToggleElement?: HTMLElement): void {
    const { modalEntranceAnimation, animationDuration, animationDelay, backdropProperties, modalElement, modalOverlayElement,
      modalContainerElement } = AssembleAnimationValues.assembleEntranceAnimationValues(componentPreviewComponent);
    if (animationState.getIsModeToggleAnimationInProgressState()) {
      GeneralUtils.startModalAndToolbarAnimationWithFadeOut(modalElement);
      const newAnimationDuration = GeneralUtils.getNewAnimationDuration();
      ModeToggleEntranceAnimation.startModalAndBackdropAnimation(modalContainerElement, modalElement, modalOverlayElement,
        backdropProperties, modalEntranceAnimation, newAnimationDuration);
      ModeToggleEntranceAnimation.startToolbarAnimation(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, animationDelay);
    } else {
      GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_NONE);
      ModeToggleEntranceAnimation.startModalAndToolbarAnimationWithFadeOut(modalContainerElement, modalElement, modalOverlayElement,
        backdropProperties, modalEntranceAnimation, animationDuration, animationDelay);
      ModeToggleEntranceAnimation.startToolbarAnimationWithFadeOut(toolbarContainerElement, toolbarElement,
        toolbarPositionToggleElement, animationDelay);
    }
    animationState.setIsModeToggleAnimationInProgressState(true);
  }
}
