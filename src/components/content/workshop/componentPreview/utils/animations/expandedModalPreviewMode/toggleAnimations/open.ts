import { COMPONENT_PREVIEW_CLASSES } from '../../../../../../../../consts/componentPreviewClasses';
import { BackdropProperties } from '../../../../../../../../interfaces/workshopComponent';
import { fulPreviewModeState } from '../../../fullPreviewMode/fullPreviewModeState';
import FullPreviewModeUtils from '../../../fullPreviewMode/toggleMode/generalUtils';
import { OpenAnimation } from '../../../../../../../../interfaces/animations';
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

export default class ModeToggleOpenAnimation {

  private static TIME_FOR_BACKDROP_TO_BE_RENDERED_MILLISECONDS = 10;
  private static INTERIM_FOR_MODAL_CLOSE_EVENT_PREVENTION_MILLISECONDS = 200;

  // UX - EXPANDED MODAL TOGGLE ANIMATION
  // private static toolbarFadeInAnimation(toolbarContainerElement: HTMLElement, animationDuration: string): void {
  //   GeneralUtils.opacityFadeAnimation(OPACITY_VISIBLE, animationDuration, toolbarContainerElement);
  //   const pendingToolbarOpenAnimationUnset = window.setTimeout(() => {
  //     GeneralUtils.unsetAnimationProperties(toolbarContainerElement);
  //   }, GeneralUtils.secondsStringToMillisecondsNumber(animationDuration));
  //   animationState.setPendingToolbarOpenAnimationUnsetState(pendingToolbarOpenAnimationUnset);
  // }

  // private static startToolbarAnimation(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, animationDuration: string): void {
  //   toolbarElement.classList.add(TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS);
  //   toolbarContainerElement.classList.replace(TOOLBAR_CONTAINER_GENERAL_CLASSES.DEFAULT, TOOLBAR_CONTAINER_GENERAL_CLASSES.EXPANDED_MODAL_MODE_ACTIVE);
  //   if (animationState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
  //     toolbarContainerElement.classList.add(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
  //   }
  //   toolbarPositionToggleElement.style.display = 'block';
  //   ModeToggleOpenAnimation.toolbarFadeInAnimation(toolbarContainerElement, animationDuration);
  // }

  private static toolbarFadeInAnimation(toolbarContainerElement: HTMLElement, animationDurationSeconds: string, animationDurationMilliseconds: number): void {
    GeneralUtils.opacityFadeAnimation(OPACITY_VISIBLE, animationDurationSeconds, toolbarContainerElement);
    const pendingToolbarOpenAnimationUnset = window.setTimeout(() => {
      GeneralUtils.unsetAnimationProperties(toolbarContainerElement);
      GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_REMOVE);
      animationState.setIsToolbarFadeAnimationInProgressState(false);
    }, animationDurationMilliseconds);
    animationState.setPendingToolbarOpenAnimationUnsetState(pendingToolbarOpenAnimationUnset);
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
    ModeToggleOpenAnimation.prepareToolbarAnimation(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
    const [toolbarAnimationDurationSeconds, toolbarAnimationDurationMilliseconds] = ModeToggleOpenAnimation
      .getNewToolbarAnimationDuration(animationDelay);
    const pendingToolbarOpenFadeInAnimation = window.setTimeout(() => {
      ModeToggleOpenAnimation.toolbarFadeInAnimation(toolbarContainerElement, toolbarAnimationDurationSeconds, toolbarAnimationDurationMilliseconds);
    }, toolbarAnimationDurationMilliseconds);
    animationState.setPendingToolbarOpenFadeInAnimationState(pendingToolbarOpenFadeInAnimation);
  }

  private static startToolbarAnimationWithFadeOut(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      toolbarPositionToggleElement: HTMLElement, animationDelay: string): void {
    GeneralUtils.opacityFadeAnimation(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, toolbarContainerElement);
    window.setTimeout(() => {
      ModeToggleOpenAnimation.startToolbarAnimation(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, animationDelay);
    }, MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS);
  }

  private static displayBackdrop(backdropProperties: BackdropProperties): void {
    backdropProperties.visible = true;
    setTimeout(() => {
      backdropProperties.opacity = 1;
    }, ModeToggleOpenAnimation.TIME_FOR_BACKDROP_TO_BE_RENDERED_MILLISECONDS);
  }

  private static setComponentPreviewContainerToModalView(modalContainerElement: HTMLElement): void {
    modalContainerElement.classList.replace(COMPONENT_PREVIEW_CLASSES.DEFAULT, COMPONENT_PREVIEW_CLASSES.EXPANDED_MODAL_MODE_ACTIVE);
    setTimeout(() => {
      modalContainerElement.style.opacity = OPACITY_VISIBLE;
    }, ModeToggleOpenAnimation.TIME_FOR_BACKDROP_TO_BE_RENDERED_MILLISECONDS);
  }

  private static startModalAndBackdropAnimation(modalContainerElement: HTMLElement, modalElement: HTMLElement,
      modalOverlayElement: HTMLElement, backdropProperties: BackdropProperties, modalOpenAnimation: OpenAnimation,
      animationDuration: string, animationDelay?: string): void {
    GeneralUtils.toggleModalStaticPosition(modalElement, modalOverlayElement, CLASSLIST_METHODS.REMOVE);
    ModeToggleOpenAnimation.setComponentPreviewContainerToModalView(modalContainerElement);
    ModeToggleOpenAnimation.displayBackdrop(backdropProperties);
    setTimeout(() => { modalOpenAnimation(animationDuration, modalElement, GeneralUtils.unsetAnimationProperties,
      modalContainerElement, animationDelay); });
  }

  private static updateStateAndToolbarElement(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement): void {
    FullPreviewModeUtils.setToolbarContainerPositionToDefault(toolbarContainerElement, toolbarElement, true);
    // this is used to prevent the user from accidentally double clicking temp button and quickly closing the modal 
    animationState.setIsModalCloseEventPreventedState(true);
    setTimeout(animationState.setIsModalCloseEventPreventedState.bind(this, false),
      ModeToggleOpenAnimation.INTERIM_FOR_MODAL_CLOSE_EVENT_PREVENTION_MILLISECONDS);
  }

  private static startModalAndToolbarAnimationWithFadeOut(modalContainerElement: HTMLElement, modalElement: HTMLElement,
      modalOverlayElement: HTMLElement, backdropProperties: BackdropProperties, toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement, isFullPreviewModeOn: boolean, modalOpenAnimation: OpenAnimation, animationDuration: string,
      animationDelay?: string): void {
    GeneralUtils.opacityFadeAnimation(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, modalElement);
    window.setTimeout(() => {
      if (isFullPreviewModeOn) ModeToggleOpenAnimation.updateStateAndToolbarElement(toolbarContainerElement, toolbarElement);
      ModeToggleOpenAnimation.startModalAndBackdropAnimation(modalContainerElement, modalElement, modalOverlayElement,
        backdropProperties, modalOpenAnimation, animationDuration, animationDelay);
    }, MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS);
  }

  public static start(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      toolbarPositionToggleElement?: HTMLElement): void {
    const { modalOpenAnimation, animationDuration, animationDelay, backdropProperties, modalElement, modalOverlayElement,
      modalContainerElement } = AssembleAnimationValues.assembleOpenAnimationValues(componentPreviewComponent);
    if (animationState.getIsModeToggleAnimationInProgressState()) {
      GeneralUtils.startModalAndToolbarAnimationWithFadeOut(modalElement);
      const newAnimationDuration = GeneralUtils.getNewAnimationDuration();
      ModeToggleOpenAnimation.startModalAndBackdropAnimation(modalContainerElement, modalElement, modalOverlayElement,
        backdropProperties, modalOpenAnimation, newAnimationDuration);
      ModeToggleOpenAnimation.startToolbarAnimation(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, animationDelay);
    } else {
      GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_NONE);
      ModeToggleOpenAnimation.startModalAndToolbarAnimationWithFadeOut(modalContainerElement, modalElement, modalOverlayElement,
        backdropProperties, toolbarContainerElement, toolbarElement, componentPreviewComponent.isFullPreviewModeOn, modalOpenAnimation,
        animationDuration, animationDelay);
      ModeToggleOpenAnimation.startToolbarAnimationWithFadeOut(toolbarContainerElement, toolbarElement,
        toolbarPositionToggleElement, animationDelay);
    }
    animationState.setIsModeToggleAnimationInProgressState(true);
  }
}
