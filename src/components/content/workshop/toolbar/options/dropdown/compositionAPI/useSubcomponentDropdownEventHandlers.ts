import { SubcomponentDropdownOverlaysToggling } from './utils/subcomponentDropdownOverlaysToggling';
import { DropdownCompositionAPI } from '../../../../../../../interfaces/dropdownCompositionAPI';
import { MouseEnterOptionEvent } from '../../../../../../../interfaces/dropdownMenuMouseEvents';
import { animationState } from '../../../../componentPreview/utils/animations/state';
import { Ref } from 'vue';

export default function useSubcomponentDropdownEventHandlers(objectContainingActiveOption: Ref<unknown>,
    activeOptionPropertyKeyName: Ref<string>, highlightSubcomponents: Ref<boolean>): DropdownCompositionAPI {


  function toggleSubcomponentOverlayDisplay(subcomponentName: string, displayValue: 'block'|'none'): void {
    // is highlighting subcomponents allowed
    // WORK 2 - refactor - may potentially not need this anymore
    if (!highlightSubcomponents.value) return;
    SubcomponentDropdownOverlaysToggling.toggle(subcomponentName, displayValue);
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
