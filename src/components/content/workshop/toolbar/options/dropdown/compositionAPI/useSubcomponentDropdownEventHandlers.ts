import { SubcomponentDropdownOverlay } from '../../../../componentPreview/utils/elements/overlays/subcomponentDropdownOverlay';
import { MouseEnterItemEvent } from '../../../../../../../interfaces/dropdownMenuMouseEvents';
import { UseDropdownComponent } from '../../../../../../../interfaces/useDropdownComponent';
import { animationState } from '../../../../componentPreview/utils/animations/state';
import { Ref } from 'vue';

export default function useSubcomponentDropdownEventHandlers(objectContainingActiveItem: Ref<unknown>,
    activeItemPropertyKeyName: Ref<string>): UseDropdownComponent {

  const mouseEnterButtonEventHandler = (): void => {
    if (!animationState.getIsModeToggleAnimationInProgressState()) {
      SubcomponentDropdownOverlay.toggle(objectContainingActiveItem.value[activeItemPropertyKeyName.value], 'block'); 
    }
  }

  const mouseLeaveButtonEventHandler = (): void => {
    SubcomponentDropdownOverlay.toggle(objectContainingActiveItem.value[activeItemPropertyKeyName.value], 'none');
  }

  const mouseEnterItemEventHandler = (mouseEnterItemEvent: MouseEnterItemEvent): void => {
    const [highlightedItem] = mouseEnterItemEvent;
    SubcomponentDropdownOverlay.toggle(highlightedItem, 'block');
  }

  const mouseLeaveItemEventHandler = (highlightedItem: string): void => {
    SubcomponentDropdownOverlay.toggle(highlightedItem, 'none');
  }

  const hideDropdownMenuEventHandler = (highlightedItem: string): void => {
    SubcomponentDropdownOverlay.toggle(highlightedItem, 'none');
  }

  const mouseEnterAuxiliaryPaddingEventHandler = (highlightedItem: string): void => {
    SubcomponentDropdownOverlay.toggle(highlightedItem, 'block');
  }

  const mouseLeaveAuxiliaryPaddingEventHandler = (highlightedItem: string): void => {
    SubcomponentDropdownOverlay.toggle(highlightedItem, 'none');
  }

  return {
    mouseEnterButtonEventHandler,
    mouseLeaveButtonEventHandler,
    mouseEnterItemEventHandler,
    mouseLeaveItemEventHandler,
    hideDropdownMenuEventHandler,
    mouseEnterAuxiliaryPaddingEventHandler,
    mouseLeaveAuxiliaryPaddingEventHandler,
  };
}
