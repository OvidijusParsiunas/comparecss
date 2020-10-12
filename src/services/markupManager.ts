import { ContentMarkup } from '../interfaces/contentMarkupInterface';
import Alerts from '../cssFrameworks/componentMarkup/alerts';
import Badges from '../cssFrameworks/componentMarkup/badges';
import Breadcrumbs from '../cssFrameworks/componentMarkup/breadCrumbs';
import Buttons from '../cssFrameworks/componentMarkup/buttons';
import ButtonGroups from '../cssFrameworks/componentMarkup/buttonGroups';
import Progress from '../cssFrameworks/componentMarkup/progress';
import Cards from '../cssFrameworks/componentMarkup/cards';
import Accordions from '../cssFrameworks/componentMarkup/accordions';
import Dropdowns from '../cssFrameworks/componentMarkup/dropdowns';
import Forms from '../cssFrameworks/componentMarkup/forms';
import Modals from '../cssFrameworks/componentMarkup/modals';
import Navbar from '../cssFrameworks/componentMarkup/navbars';
import Pagination from '../cssFrameworks/componentMarkup/pagination';
import Tooltips from '../cssFrameworks/componentMarkup/tooltips';
import { NAVBAR_SUB_MENU_BUTTONS } from '../consts/navbarSubMenuButtons.enum';

export default class MarkupManager {
  static getContentMarkup(clickedButtonName: NAVBAR_SUB_MENU_BUTTONS): ContentMarkup {
    switch (clickedButtonName) {
      case NAVBAR_SUB_MENU_BUTTONS.ACCORDIONS:
        return Accordions;
      case NAVBAR_SUB_MENU_BUTTONS.ALERTS:
        return Alerts;
      case NAVBAR_SUB_MENU_BUTTONS.BADGES:
        return Badges;
      case NAVBAR_SUB_MENU_BUTTONS.BREAD_CRUMBS:
        return Breadcrumbs;
      case NAVBAR_SUB_MENU_BUTTONS.BUTTONS:
        return Buttons;
      case NAVBAR_SUB_MENU_BUTTONS.BUTTON_GROUPS:
        return ButtonGroups;
      case NAVBAR_SUB_MENU_BUTTONS.CARDS:
        return Cards;
      case NAVBAR_SUB_MENU_BUTTONS.DROPDOWNS:
        return Dropdowns;
      case NAVBAR_SUB_MENU_BUTTONS.FORMS:
        return Forms;
      case NAVBAR_SUB_MENU_BUTTONS.MODALS:
        return Modals;        
      case NAVBAR_SUB_MENU_BUTTONS.NAVBARS:
        return Navbar;    
      case NAVBAR_SUB_MENU_BUTTONS.PAGINATION:
        return Pagination;    
      case NAVBAR_SUB_MENU_BUTTONS.PROGRESS:
        return Progress;
      case NAVBAR_SUB_MENU_BUTTONS.TOOLTIPS:
        return Tooltips;
      default: {
        return {
          bootstrap: '',
          materialize: '',
          uikit: '',
          foundation: '',
          bulma: '',
        };
      }
    }
  }
}
