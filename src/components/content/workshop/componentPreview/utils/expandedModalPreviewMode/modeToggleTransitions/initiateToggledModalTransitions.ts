import { ModalEntranceTransition, ModalExitTransition } from '../../../../../../../interfaces/modalTransitions';
import { transitionTypeToFunctionality } from '../transitionInitializers/transitionTypeToFunctionality';
import { BackdropProperties } from '../../../../../../../interfaces/workshopComponent';
import { ComponentOptions } from 'vue';

type EntranceTransitionCallback = (modalEntranceTransition: ModalEntranceTransition, transitionDuration: string, transitionDelay: string,
  backdropProperties: BackdropProperties, modalElement: HTMLElement, modalOverlayElement: HTMLElement, backdropElement: HTMLElement,
  toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement?: HTMLElement) => void;
  
type ExitTransitionCallback = (modalExitTransition: ModalExitTransition, transitionDuration: string, setOptionToDefaultCallback: () => void,
  backdropElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement, modalOverlayElement: HTMLElement,
  toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement?: HTMLElement) => void;

export default class InitiateToggledModalTransitions {

  // add type
  public static startEntranceTransition(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      transitionCallback: EntranceTransitionCallback, toolbarPositionToggleElement?: HTMLElement): void {
    transitionCallback(
      transitionTypeToFunctionality[componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.entrance.type],
      componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.entrance.duration,
      componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.entrance.delay,
      componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.backdrop,
      componentPreviewComponent.$refs.baseComponent.$refs.componentPreview,
      componentPreviewComponent.$refs.baseComponent.$refs.componentPreviewOverlay,
      componentPreviewComponent.$refs.componentPreviewContainer,
      toolbarContainerElement,
      toolbarElement,
      toolbarPositionToggleElement);
  }

  public static startExitTransition(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      transitionCallback: ExitTransitionCallback, exitTransitionCallback?: () => void, toolbarPositionToggleElement?: HTMLElement): void {
    transitionCallback(
      transitionTypeToFunctionality[componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.exit.type],
      componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.exit.duration,
      exitTransitionCallback,
      componentPreviewComponent.$refs.componentPreviewContainer,
      componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.backdrop,
      componentPreviewComponent.$refs.baseComponent.$refs.componentPreview,
      componentPreviewComponent.$refs.baseComponent.$refs.componentPreviewOverlay,
      toolbarContainerElement,
      toolbarElement,
      toolbarPositionToggleElement);
  }
}
