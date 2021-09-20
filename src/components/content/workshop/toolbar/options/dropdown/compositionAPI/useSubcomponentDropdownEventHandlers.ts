import { SubcomponentDropdownOverlay } from '../../../../componentPreview/utils/elements/overlays/subcomponentDropdownOverlay';
import { DropdownCompositionAPI } from '../../../../../../../interfaces/dropdownCompositionAPI';
import { MouseEnterOptionEvent } from '../../../../../../../interfaces/dropdownMenuMouseEvents';
import { animationState } from '../../../../componentPreview/utils/animations/state';
import { Ref } from 'vue';

export default function useSubcomponentDropdownEventHandlers(objectContainingActiveOption: Ref<unknown>,
    activeOptionPropertyKeyName: Ref<string>): DropdownCompositionAPI {

  const mouseEnterButtonEventHandler = (): void => {
    if (!animationState.getIsModeToggleAnimationInProgressState()) {
      SubcomponentDropdownOverlay.toggle(objectContainingActiveOption.value[activeOptionPropertyKeyName.value], 'block'); 
    }
  }

  const mouseLeaveButtonEventHandler = (): void => {
    SubcomponentDropdownOverlay.toggle(objectContainingActiveOption.value[activeOptionPropertyKeyName.value], 'none');
  }

  const mouseEnterOptionEventHandler = (mouseEnterOptionEvent: MouseEnterOptionEvent): void => {
    const [highlightedOption] = mouseEnterOptionEvent;
    SubcomponentDropdownOverlay.toggle(highlightedOption, 'block');
  }

  const mouseLeaveOptionEventHandler = (highlightedOption: string): void => {
    SubcomponentDropdownOverlay.toggle(highlightedOption, 'none');
  }

  const hideDropdownMenuEventHandler = (highlightedOption: string): void => {
    SubcomponentDropdownOverlay.toggle(highlightedOption, 'none');
  }

  const mouseEnterAuxiliaryPaddingEventHandler = (highlightedOption: string): void => {
    SubcomponentDropdownOverlay.toggle(highlightedOption, 'block');
  }

  const mouseLeaveAuxiliaryPaddingEventHandler = (highlightedOption: string): void => {
    SubcomponentDropdownOverlay.toggle(highlightedOption, 'none');
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
