import { NAVBAR_SUB_MENU_BUTTONS } from '../consts/navbarSubMenuButtons.enum';
import { NAVBAR_MENU_BUTTONS } from '../consts/navbarMenuButtons.enum';

export interface NavbarButton {
  navbarMenuButton: NAVBAR_MENU_BUTTONS;
  navbarSubMenuButton?: NAVBAR_SUB_MENU_BUTTONS;
}
