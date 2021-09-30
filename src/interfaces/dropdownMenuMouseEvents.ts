import { DropdownItemAuxDetailsRef } from './dropdownItemDisplayStatus';

export type MouseEnterMenuContainerItemEvent = [DropdownItemAuxDetailsRef?, number?, number?, string?, boolean?];

export type MouseLeaveMenuContainerItemEvent = [HTMLElement, string?];

export type MouseEnterItemEvent = [string, boolean];

export type MouseClickItemEvent = [string, string, boolean];

export type MouseClickNewItemEvent = [string, boolean];
