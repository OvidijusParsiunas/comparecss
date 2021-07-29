import { MouseEnterOptionEvent } from './dropdownMenuMouseEvents';

export interface DropdownCompositionAPI {
  mouseEnterButtonEventHandler?: () => void;
  mouseLeaveButtonEventHandler?: () => void;
  mouseEnterOptionEventHandler?: (mouseEnterOptionEvent: MouseEnterOptionEvent) => void;
  mouseLeaveOptionEventHandler?: (highlightedOption: string) => void;
  hideDropdownMenuEventHandler?: (highlightedOption: string) => void;
  mouseEnterAuxiliaryPaddingEventHandler?: (highlightedOption: string) => void;
  mouseLeaveAuxiliaryPaddingEventHandler?: (highlightedOption: string) => void;
}
