export interface DropdownCompositionAPI {
  mouseEnterButtonEventHandler?: () => void;
  mouseLeaveButtonEventHandler?: () => void;
  mouseEnterOptionEventHandler?: (optionElementToBeHighlighted: HTMLElement) => void;
  mouseLeaveOptionEventHandler?: (optionElementToBeHighlighted: HTMLElement) => void;
  hideDropdownMenuEventHandler?: (optionElementToBeHighlighted: HTMLElement) => void;
  mouseEnterAuxiliaryPaddingEventHandler?: (optionElementToBeHighlighted: HTMLElement) => void;
  mouseLeaveAuxiliaryPaddingEventHandler?: (optionElementToBeHighlighted: HTMLElement) => void;
}
