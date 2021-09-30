import { MouseEnterItemEvent } from './dropdownMenuMouseEvents';

export interface DropdownCompositionAPI {
  mouseEnterButtonEventHandler?: () => void;
  mouseLeaveButtonEventHandler?: () => void;
  mouseEnterItemEventHandler?: (mouseEnterItemEvent: MouseEnterItemEvent) => void;
  mouseLeaveItemEventHandler?: (highlightedItem: string) => void;
  hideDropdownMenuEventHandler?: (highlightedItem: string) => void;
  mouseEnterAuxiliaryPaddingEventHandler?: (highlightedItem: string) => void;
  mouseLeaveAuxiliaryPaddingEventHandler?: (highlightedItem: string) => void;
}
