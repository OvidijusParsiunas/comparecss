import { subcomponentAndOverlayElementIdsState } from '../../subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { SUBCOMPONENT_OVERLAY_BACKGROUND_COLOR } from '../../../../../../../consts/subcomponentOverlayBackgroundColor';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../../consts/subcomponentOverlayClasses.enum';
import { subcomponentSelectModeState } from '../../subcomponentSelectMode/subcomponentSelectModeState';
import { DropdownCompositionAPI } from '../../../../../../../interfaces/dropdownCompositionAPI';
import { MouseEnterOptionEvent } from '../../../../../../../interfaces/dropdownMenuMouseEvents';
import { animationState } from '../../../../componentPreview/utils/animations/state';
import { Ref } from 'vue';

export default function useSubcomponentDropdownEventHandlers(objectContainingActiveOption: Ref<unknown>,
    activeOptionPropertyKeyName: Ref<string>, highlightSubcomponents: Ref<boolean>): DropdownCompositionAPI {

  function toggleSubOverlayContainerDisplay(subcomponentOverlayElement: HTMLElement, displayValue: 'block'|'none'): void {
    if (!subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState() || displayValue === 'block') {
      subcomponentOverlayElement.style.backgroundColor = SUBCOMPONENT_OVERLAY_BACKGROUND_COLOR;
      subcomponentOverlayElement.style.display = displayValue;
    } else {
      subcomponentOverlayElement.style.backgroundColor = '';
    }
  }

  function toggleSubcomponentOverlayDisplay(subcomponentName: string, displayValue: 'block'|'none'): void {
    if (!highlightSubcomponents.value) return;
    const subcomponentOverlayElementId = subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentName(subcomponentName);
    const subcomponentOverlayElement = document.getElementById(subcomponentOverlayElementId);
    const subcomponentElementId = subcomponentAndOverlayElementIdsState.getSubcomponentIdViaSubcomponentName(subcomponentName);
    const subcomponentElement = document.getElementById(subcomponentElementId);
    if (subcomponentOverlayElement && subcomponentElement) {
      if (subcomponentOverlayElement.classList.contains(SUBCOMPONENT_OVERLAY_CLASSES.SUB_CONTAINER)) {
        toggleSubOverlayContainerDisplay(subcomponentOverlayElement, displayValue);
      } else {
        subcomponentOverlayElement.style.display = displayValue;
      }
    }
  }

  const mouseEnterButtonEventHandler = (): void => {
    if (!animationState.getIsModeToggleAnimationInProgressState()) {
      toggleSubcomponentOverlayDisplay(objectContainingActiveOption.value[activeOptionPropertyKeyName.value], 'block'); 
    }
  }

  const mouseLeaveButtonEventHandler = (): void => {
    toggleSubcomponentOverlayDisplay(objectContainingActiveOption.value[activeOptionPropertyKeyName.value], 'none');
  }

  const mouseEnterOptionEventHandler = (mouseEnterOptionEvent: MouseEnterOptionEvent): void => {
    const [highlightedOption] = mouseEnterOptionEvent;
    toggleSubcomponentOverlayDisplay(highlightedOption, 'block');
  }

  const mouseLeaveOptionEventHandler = (highlightedOption: string): void => {
    toggleSubcomponentOverlayDisplay(highlightedOption, 'none');
  }

  const hideDropdownMenuEventHandler = (highlightedOption: string): void => {
    toggleSubcomponentOverlayDisplay(highlightedOption, 'none');
  }

  const mouseEnterAuxiliaryPaddingEventHandler = (highlightedOption: string): void => {
    toggleSubcomponentOverlayDisplay(highlightedOption, 'block');
  }

  const mouseLeaveAuxiliaryPaddingEventHandler = (highlightedOption: string): void => {
    toggleSubcomponentOverlayDisplay(highlightedOption, 'none');
  }

  return {
    mouseEnterButtonEventHandler,
    mouseLeaveButtonEventHandler,
    mouseEnterOptionEventHandler,
    mouseLeaveOptionEventHandler,
    hideDropdownMenuEventHandler,
    mouseEnterAuxiliaryPaddingEventHandler,
    mouseLeaveAuxiliaryPaddingEventHandler,
  };
}
