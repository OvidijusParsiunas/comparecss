import { expandedModalPreviewModeState } from '../../../../../../services/workshop/expandedModalPreviewMode/expandedModalPreviewModeState';
import { UseToolbarPositionToggle } from '../../../../../../interfaces/useToolbarPositionToggle';
import { TOOLBAR_POSITION_TOGGLE_HOVER_CLASS } from '../../../../../../consts/toolbarClasses';
import { ComponentOptions } from 'vue';

export default function useToolbarPositionToggle(): UseToolbarPositionToggle {

  const toolbarPositionToggleMouseEnter = (event: MouseEvent): void => {
    if (!expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) {
      const toggleElement = event.target as HTMLElement;
      toggleElement.classList.add(TOOLBAR_POSITION_TOGGLE_HOVER_CLASS);
    }
  }
  
  const toolbarPositionToggleMouseLeave = (event: MouseEvent): void => {
    if (!expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) {
      const toggleElement = event.target as HTMLElement;
      toggleElement.classList.remove(TOOLBAR_POSITION_TOGGLE_HOVER_CLASS);
    }
  }

  const toolbarPositionToggleMouseClick = (optionsComponent: ComponentOptions): void => {
    if (!expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) {
      optionsComponent.$emit('toggle-toolbar-position');
    }
  }
  
  return {
    toolbarPositionToggleMouseEnter,
    toolbarPositionToggleMouseLeave,
    toolbarPositionToggleMouseClick,
  };
}
