import ExpandedModalPreviewModeToggleEntranceTransition from '../../utils/expandedModalPreviewMode/modeToggleTransitions/entrance';
import { transitionTypeToFunctionality } from '../expandedModalPreviewMode/transitionInitializers/transitionTypeToFunctionality';
import { fullModalPreviewModeState } from './fullModalPreviewModeState';
import { ComponentOptions } from 'vue';

export default class ToggleDisplays {

  // WORK1: needs refactoring
  public static actionsPreviewModeClickEvent(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement): void {
    if (!fullModalPreviewModeState.getIsTransitionInProgress()) {
      ExpandedModalPreviewModeToggleEntranceTransition.startFullMode(
        transitionTypeToFunctionality[componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.entrance.type],
        componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.entrance.duration,
        componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.entrance.delay,
        componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.backdrop,
        componentPreviewComponent.$refs.baseComponent.$refs.componentPreview,
        componentPreviewComponent.$refs.baseComponent.$refs.componentPreviewOverlay,
        componentPreviewComponent.$refs.componentPreviewContainer,
        toolbarContainerElement, toolbarElement); 
      componentPreviewComponent.temporaryComponent.modalDisplayed = true;
    }
    toolbarElement.classList.add('toolbar-position-during-expanded-full-modal-preview');
    fullModalPreviewModeState.setIsExpandedModalPreviewModeActivated(true);
    fullModalPreviewModeState.setIsTransitionInProgress(true);
  }
}
