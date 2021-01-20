import { NestedDropdownStructure } from './nestedDropdownStructure';

export interface DropdownCompositionAPI {
  buttonMouseEnterEventHandler: () => void,
  buttonMouseLeaveEventHandler: () => void,
  mouseEnterOptionEventHandler: (param1: NestedDropdownStructure[], param2: HTMLElement, param3: number, param4: HTMLElement, param5: number) => void,
  mouseLeaveOptionEventHandler: (param1: HTMLElement) => void,
  hideDropdownMenuEventHandler: (param1: HTMLElement) => void,
  mouseEnterAuxiliaryPaddingEventHandler: (param1: NestedDropdownStructure[], param2: HTMLElement, param3: number, param4: HTMLElement, param5: number) => void,
  mouseLeaveAuxiliaryPaddingEventHandler: (param1: HTMLElement) => void,
  displayHighligtedOptionAndParentMenusEventHandler: (param1: NestedDropdownStructure[], param2: HTMLElement, param3: number, param4: HTMLElement, param5: number) => void,
}
