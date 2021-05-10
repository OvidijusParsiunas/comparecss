import { ModalEntranceAnimation, ModalExitAnimation } from '../../../../../../../interfaces/modalAnimations';
import { modalAnimationTypeToFunctionality } from '../animationInitializers/modalAnimationTypeToFunctionality';
import { BackdropProperties } from '../../../../../../../interfaces/workshopComponent';
import { ComponentOptions } from 'vue';

type EntranceAnimationFunc = (animationFunc: ModalEntranceAnimation, animationDuration: string, animationDelay: string,
  backdropProperties: BackdropProperties, modalElement: HTMLElement, modalOverlayElement: HTMLElement, componentPreviewContainerElement: HTMLElement,
  toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement?: HTMLElement) => void;
  
type ExitAnimationFunc = (animationFunc: ModalExitAnimation, animationDuration: string, setOptionToDefaultCallback: () => void,
  componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement, modalOverlayElement: HTMLElement,
  toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement?: HTMLElement) => void;

export default class InitiateToggledModalAnimations {

  public static startModalEntranceAnimation(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      animationFunc: EntranceAnimationFunc, toolbarPositionToggleElement?: HTMLElement): void {
    animationFunc(
      modalAnimationTypeToFunctionality[componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.modalAnimations.entrance.type],
      componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.modalAnimations.entrance.duration,
      componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.modalAnimations.entrance.delay,
      componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.backdrop,
      componentPreviewComponent.$refs.baseComponent.$refs.componentPreview,
      componentPreviewComponent.$refs.baseComponent.$refs.componentPreviewOverlay,
      componentPreviewComponent.$refs.componentPreviewContainer,
      toolbarContainerElement,
      toolbarElement,
      toolbarPositionToggleElement);
  }

  public static startModalExitAnimation(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      animationFunc: ExitAnimationFunc, exitAnimationCallback?: () => void, toolbarPositionToggleElement?: HTMLElement): void {
    animationFunc(
      modalAnimationTypeToFunctionality[componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.modalAnimations.exit.type],
      componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.modalAnimations.exit.duration,
      exitAnimationCallback,
      componentPreviewComponent.$refs.componentPreviewContainer,
      componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.backdrop,
      componentPreviewComponent.$refs.baseComponent.$refs.componentPreview,
      componentPreviewComponent.$refs.baseComponent.$refs.componentPreviewOverlay,
      toolbarContainerElement,
      toolbarElement,
      toolbarPositionToggleElement);
  }
}
