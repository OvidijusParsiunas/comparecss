import { ContentMarkup } from '../interfaces/contentMarkupInterface';
import Alerts from '../cssFrameworks/componentMarkup/alerts';
import Badges from '../cssFrameworks/componentMarkup/badges';
import Breadcrumbs from '../cssFrameworks/componentMarkup/breadCrumbs';
import Buttons from '../cssFrameworks/componentMarkup/buttons';
import ButtonGroups from '../cssFrameworks/componentMarkup/buttonGroups';
import Progress from '../cssFrameworks/componentMarkup/progress';
import { BUTTON_NAMES } from '../consts/buttonNames.enum';
import Cards from '../cssFrameworks/componentMarkup/cards';
import Accordions from '../cssFrameworks/componentMarkup/accordions';
import Dropdowns from '../cssFrameworks/componentMarkup/dropdowns';
import Forms from '../cssFrameworks/componentMarkup/forms';
import Modals from '../cssFrameworks/componentMarkup/modals';
import Navbar from '../cssFrameworks/componentMarkup/navbars';
import Pagination from '../cssFrameworks/componentMarkup/pagination';
import Tooltips from '../cssFrameworks/componentMarkup/tooltips';

export default class MarkupManager {
  static getContentMarkup(clickedButtonName: BUTTON_NAMES): ContentMarkup {
    switch (clickedButtonName) {
      case BUTTON_NAMES.ACCORDIONS:
        return Accordions;
      case BUTTON_NAMES.ALERTS:
        return Alerts;
      case BUTTON_NAMES.BADGES:
        return Badges;
      case BUTTON_NAMES.BREAD_CRUMBS:
        return Breadcrumbs;
      case BUTTON_NAMES.BUTTONS:
        return Buttons;
      case BUTTON_NAMES.BUTTON_GROUPS:
        return ButtonGroups;
      case BUTTON_NAMES.CARDS:
        return Cards;
      case BUTTON_NAMES.DROPDOWNS:
        return Dropdowns;
      case BUTTON_NAMES.FORMS:
        return Forms;
      case BUTTON_NAMES.MODALS:
        return Modals;        
      case BUTTON_NAMES.NAVBARS:
        return Navbar;    
      case BUTTON_NAMES.PAGINATION:
        return Pagination;    
      case BUTTON_NAMES.PROGRESS:
        return Progress;
      case BUTTON_NAMES.TOOLTIPS:
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
