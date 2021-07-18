export interface DropdownCompositionAPI {
  mouseEnterButtonEventHandler?: () => void;
  mouseLeaveButtonEventHandler?: () => void;
  mouseEnterOptionEventHandler?: (highlightedOption: string) => void;
  mouseLeaveOptionEventHandler?: (highlightedOption: string) => void;
  hideDropdownMenuEventHandler?: (highlightedOption: string) => void;
  mouseEnterAuxiliaryPaddingEventHandler?: (highlightedOption: string) => void;
  mouseLeaveAuxiliaryPaddingEventHandler?: (highlightedOption: string) => void;
}
