import { subcomponentAndOverlayElementIdsState } from '../../subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { SUBCOMPONENT_OVERLAY_BACKGROUND_COLOR } from '../../../../../../../consts/subcomponentOverlayBackgroundColor';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../../consts/subcomponentOverlayClasses.enum';
import { subcomponentSelectModeState } from '../../subcomponentSelectMode/subcomponentSelectModeState';
import { DropdownCompositionAPI } from '../../../../../../../interfaces/dropdownCompositionAPI';
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
    const subcomponentOverlayElementId = subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentType(subcomponentName);
    const subcomponentOverlayElement = document.getElementById(subcomponentOverlayElementId);
    if (subcomponentOverlayElement) {
      if (subcomponentOverlayElement.classList.contains(SUBCOMPONENT_OVERLAY_CLASSES.SUB_CONTAINER)) {
        toggleSubOverlayContainerDisplay(subcomponentOverlayElement, displayValue);
      } else {
        subcomponentOverlayElement.style.display = displayValue;
      }
    }
  }

  function getOptionNameFromElement(highlightedOptionElement: HTMLElement): string {
    return (highlightedOptionElement.childNodes[0] as HTMLElement).innerHTML;
  }

  const mouseEnterButtonEventHandler = (): void => {
    if (!animationState.getIsModeToggleAnimationInProgressState()) {
      toggleSubcomponentOverlayDisplay(objectContainingActiveOption.value[activeOptionPropertyKeyName.value], 'block'); 
    }
  }

  const mouseLeaveButtonEventHandler = (): void => {
    toggleSubcomponentOverlayDisplay(objectContainingActiveOption.value[activeOptionPropertyKeyName.value], 'none');
  }

  const mouseEnterOptionEventHandler = (optionElementToBeHighlighted: HTMLElement): void => {
    toggleSubcomponentOverlayDisplay(getOptionNameFromElement(optionElementToBeHighlighted), 'block');
  }

  const mouseLeaveOptionEventHandler = (optionElementToBeHighlighted: HTMLElement): void => {
    toggleSubcomponentOverlayDisplay(getOptionNameFromElement(optionElementToBeHighlighted), 'none');
  }

  const hideDropdownMenuEventHandler = (optionElementToBeHighlighted: HTMLElement): void => {
    toggleSubcomponentOverlayDisplay(getOptionNameFromElement(optionElementToBeHighlighted), 'none');
  }

  const mouseEnterAuxiliaryPaddingEventHandler = (optionElementToBeHighlighted: HTMLElement): void => {
    toggleSubcomponentOverlayDisplay(getOptionNameFromElement(optionElementToBeHighlighted), 'block');
  }

  const mouseLeaveAuxiliaryPaddingEventHandler = (blurredOptionElement: HTMLElement): void => {
    toggleSubcomponentOverlayDisplay(getOptionNameFromElement(blurredOptionElement), 'none');
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
