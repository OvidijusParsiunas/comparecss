import { ComponentMarkup } from '../interfaces/componentMarkup';
import { alerts } from '../cssFrameworks/componentMarkup/alerts';
import { badges } from '../cssFrameworks/componentMarkup/badges';
import { breadCrumbs } from '../cssFrameworks/componentMarkup/breadCrumbs';
import { buttons } from '../cssFrameworks/componentMarkup/buttons';
import { buttonGroups } from '../cssFrameworks/componentMarkup/buttonGroups';
import { progress } from '../cssFrameworks/componentMarkup/progress';
import { cards } from '../cssFrameworks/componentMarkup/cards';
import { accordions } from '../cssFrameworks/componentMarkup/accordions';
import { dropdowns } from '../cssFrameworks/componentMarkup/dropdowns';
import { forms } from '../cssFrameworks/componentMarkup/forms';
import { modals } from '../cssFrameworks/componentMarkup/modals';
import { navbars } from '../cssFrameworks/componentMarkup/navbars';
import { pagination } from '../cssFrameworks/componentMarkup/pagination';
import { tooltips } from '../cssFrameworks/componentMarkup/tooltips';
import { NAVBAR_SUB_MENU_BUTTONS } from '../consts/navbarSubMenuButtons.enum';

export default class ComponentMarkupManager {
  static getComponentMarkup(clickedButtonName: NAVBAR_SUB_MENU_BUTTONS): ComponentMarkup {
    switch (clickedButtonName) {
      case NAVBAR_SUB_MENU_BUTTONS.ACCORDIONS:
        return accordions;
      case NAVBAR_SUB_MENU_BUTTONS.ALERTS:
        return alerts;
      case NAVBAR_SUB_MENU_BUTTONS.BADGES:
        return badges;
      case NAVBAR_SUB_MENU_BUTTONS.BREAD_CRUMBS:
        return breadCrumbs;
      case NAVBAR_SUB_MENU_BUTTONS.BUTTONS:
        return buttons;
      case NAVBAR_SUB_MENU_BUTTONS.BUTTON_GROUPS:
        return buttonGroups;
      case NAVBAR_SUB_MENU_BUTTONS.CARDS:
        return cards;
      case NAVBAR_SUB_MENU_BUTTONS.DROPDOWNS:
        return dropdowns;
      case NAVBAR_SUB_MENU_BUTTONS.FORMS:
        return forms;
      case NAVBAR_SUB_MENU_BUTTONS.MODALS:
        return modals;        
      case NAVBAR_SUB_MENU_BUTTONS.NAVBARS:
        return navbars;    
      case NAVBAR_SUB_MENU_BUTTONS.PAGINATION:
        return pagination;    
      case NAVBAR_SUB_MENU_BUTTONS.PROGRESS:
        return progress;
      case NAVBAR_SUB_MENU_BUTTONS.TOOLTIPS:
        return tooltips;
      default: {
        return {};
      }
    }
  }
}
