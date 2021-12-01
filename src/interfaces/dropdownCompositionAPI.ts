import { MouseEnterItemEvent } from './dropdownMenuMouseEvents';

// WORK 2 - rename
export interface DropdownCompositionAPI {
  mouseEnterButtonEventHandler?: () => void;
  mouseLeaveButtonEventHandler?: () => void;
  mouseEnterItemEventHandler?: (mouseEnterItemEvent: MouseEnterItemEvent) => void;
  mouseLeaveItemEventHandler?: (highlightedItem: string) => void;
  hideDropdownMenuEventHandler?: (highlightedItem: string) => void;
  mouseEnterAuxiliaryPaddingEventHandler?: (highlightedItem: string) => void;
  mouseLeaveAuxiliaryPaddingEventHandler?: (highlightedItem: string) => void;
}
