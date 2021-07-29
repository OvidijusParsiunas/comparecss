import { DropdownOptionAuxDetailsRef } from './dropdownOptionDisplayStatus';

export type MouseEnterMenuContainerOptionEvent = [DropdownOptionAuxDetailsRef?, number?, number?, string?, boolean?];

export type MouseLeaveMenuContainerOptionEvent = [HTMLElement, string?];

export type MouseEnterOptionEvent = [string, boolean];

export type MouseClickOptionEvent = [string, string, boolean];

export type MouseClickNewOptionEvent = [string, boolean];
