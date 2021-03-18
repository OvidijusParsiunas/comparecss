import { expandedModalPreviewModeState } from '../../../../../../../services/workshop/expandedModalPreviewMode/expandedModalPreviewModeState';
import { subcomponentAndOverlayElementIdsState } from '../../subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { DropdownCompositionAPI } from '../../../../../../../interfaces/dropdownCompositionAPI';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';
import { Ref } from 'vue';

export default function useSubcomponentDropdownEventHandlers(objectContainingActiveOption: Ref<unknown>, activeOptionPropertyKeyName: Ref<string>, highlightSubcomponents: Ref<boolean>): DropdownCompositionAPI {

  function toggleSubcomponentOverlayDisplay(subcomponentType: string, displayValue: 'block'|'none'): void {
    if (!highlightSubcomponents.value) return;
    const subcomponentOverlayElementId = subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentType(subcomponentType as SUB_COMPONENTS);
    const subcomponentOverlayElement = document.getElementById(subcomponentOverlayElementId);
    if (subcomponentOverlayElement) subcomponentOverlayElement.style.display = displayValue;
  }

  function getOptionNameFromElement(highlightedOptionElement: HTMLElement): string {
    return (highlightedOptionElement.childNodes[0] as HTMLElement).innerHTML;
  }

  const mouseEnterButtonEventHandler = (): void => {
    if (!expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) {
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
