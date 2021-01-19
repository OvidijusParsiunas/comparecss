export interface DropdownCompositionAPI {
  buttonMouseEnterEventHandler: () => void,
  buttonMouseLeaveEventHandler: () => void,
  mouseEnterOptionEventHandler: (param1: HTMLElement) => void,
  mouseLeaveOptionEventHandler: (param1: HTMLElement) => void,
  hideDropdownMenuEventHandler: (param1: HTMLElement) => void,
  mouseEnterAuxiliaryPaddingEventHandler: (param1: HTMLElement) => void,
  mouseLeaveAuxiliaryPaddingEventHandler: (param1: HTMLElement) => void,
}