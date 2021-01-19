import { subcomponentTypeToPreviewId } from '../../componentOptions/subcomponentTypeToPreviewId';
import { DropdownCompositionAPI } from '../../../../../../../interfaces/dropdownCompositionAPI';
import { Ref } from 'vue';

export default function useSubcomponentDropdownEventHandlers(objectContainingActiveOption: Ref<unknown>, activeModePropertyKeyName: Ref<string>, highlightSubcomponents: Ref<boolean>): DropdownCompositionAPI {

  function toggleSubcomponentPreviewDisplay(subcomponentType: string, displayValue: 'block'|'none'): void {
    if (!highlightSubcomponents.value) return;
    const subcomponentPreviewElementId = subcomponentTypeToPreviewId[subcomponentType];
    const subcomponentPreviewElement = document.getElementById(subcomponentPreviewElementId);
    if (subcomponentPreviewElement) subcomponentPreviewElement.style.display = displayValue;
  }

  function getOptionNameFromElement(highlightedOptionElement: HTMLElement): string {
    return (highlightedOptionElement.childNodes[0] as HTMLElement).innerHTML;
  }

  const buttonMouseEnterEventHandler = (): void => {
    toggleSubcomponentPreviewDisplay(objectContainingActiveOption.value[activeModePropertyKeyName.value], 'block');
  }
  
  const buttonMouseLeaveEventHandler = (): void => {
    toggleSubcomponentPreviewDisplay(objectContainingActiveOption.value[activeModePropertyKeyName.value], 'none');
  }

  const mouseEnterOptionEventHandler = (optionElementToBeHighlighted: HTMLElement): void => {
    toggleSubcomponentPreviewDisplay(getOptionNameFromElement(optionElementToBeHighlighted), 'block');
  }

  const mouseLeaveOptionEventHandler = (optionElementToBeHighlighted: HTMLElement): void => {
    toggleSubcomponentPreviewDisplay(getOptionNameFromElement(optionElementToBeHighlighted), 'none');
  }

  const hideDropdownMenuEventHandler = (optionElementToBeHighlighted: HTMLElement): void => {
    toggleSubcomponentPreviewDisplay(getOptionNameFromElement(optionElementToBeHighlighted), 'none');
  }

  const mouseEnterAuxiliaryPaddingEventHandler = (optionElementToBeHighlighted: HTMLElement): void => {
    toggleSubcomponentPreviewDisplay(getOptionNameFromElement(optionElementToBeHighlighted), 'block');
  }

  const mouseLeaveAuxiliaryPaddingEventHandler = (blurredOptionElement: HTMLElement): void => {
    toggleSubcomponentPreviewDisplay(getOptionNameFromElement(blurredOptionElement), 'none');
  }
  
  return {
    buttonMouseEnterEventHandler,
    buttonMouseLeaveEventHandler,
    mouseEnterOptionEventHandler,
    mouseLeaveOptionEventHandler,
    hideDropdownMenuEventHandler,
    mouseEnterAuxiliaryPaddingEventHandler,
    mouseLeaveAuxiliaryPaddingEventHandler,
  };
}
