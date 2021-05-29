import { UseToolbarPositionToggle } from '../../../../../../interfaces/useToolbarPositionToggle';
import { TOOLBAR_POSITION_TOGGLE_HOVER_CLASS } from '../../../../../../consts/toolbarClasses';
import { animationState } from '../../../componentPreview/utils/animations/state';

export default function useToolbarPositionToggle(): UseToolbarPositionToggle {

  const toolbarPositionToggleMouseEnter = (event: MouseEvent): void => {
    if (!animationState.getIsToolbarFadeAnimationInProgressState()) {
      const toggleElement = event.target as HTMLElement;
      toggleElement.classList.add(TOOLBAR_POSITION_TOGGLE_HOVER_CLASS);
    }
  }
  
  const toolbarPositionToggleMouseLeave = (event: MouseEvent): void => {
    if (!animationState.getIsToolbarFadeAnimationInProgressState()) {
      const toggleElement = event.target as HTMLElement;
      toggleElement.classList.remove(TOOLBAR_POSITION_TOGGLE_HOVER_CLASS);
    }
  }

  const toolbarPositionToggleMouseClick = function() {
    if (!animationState.getIsToolbarFadeAnimationInProgressState()) {
      this.$emit('toggle-toolbar-position');
    }
  }
  
  return {
    toolbarPositionToggleMouseEnter,
    toolbarPositionToggleMouseLeave,
    toolbarPositionToggleMouseClick,
  };
}
