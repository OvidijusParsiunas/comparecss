import { expandedModalPreviewModeState } from '../../../componentPreview/utils/expandedModalPreviewMode/expandedModalPreviewModeState';
import { UseToolbarPositionToggle } from '../../../../../../interfaces/useToolbarPositionToggle';
import { TOOLBAR_POSITION_TOGGLE_HOVER_CLASS } from '../../../../../../consts/toolbarClasses';
import { ComponentOptions } from 'vue';

export default function useToolbarPositionToggle(): UseToolbarPositionToggle {

  const toolbarPositionToggleMouseEnter = (event: MouseEvent): void => {
    if (!expandedModalPreviewModeState.getIsToolbarFadeAnimationInProgressState()) {
      const toggleElement = event.target as HTMLElement;
      toggleElement.classList.add(TOOLBAR_POSITION_TOGGLE_HOVER_CLASS);
    }
  }
  
  const toolbarPositionToggleMouseLeave = (event: MouseEvent): void => {
    if (!expandedModalPreviewModeState.getIsToolbarFadeAnimationInProgressState()) {
      const toggleElement = event.target as HTMLElement;
      toggleElement.classList.remove(TOOLBAR_POSITION_TOGGLE_HOVER_CLASS);
    }
  }

  const toolbarPositionToggleMouseClick = (optionsComponent: ComponentOptions): void => {
    if (!expandedModalPreviewModeState.getIsToolbarFadeAnimationInProgressState()) {
      optionsComponent.$emit('toggle-toolbar-position');
    }
  }
  
  return {
    toolbarPositionToggleMouseEnter,
    toolbarPositionToggleMouseLeave,
    toolbarPositionToggleMouseClick,
  };
}
