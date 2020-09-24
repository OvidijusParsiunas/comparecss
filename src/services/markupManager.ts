import { ContentMarkupInterface } from '../interfaces/ContentMarkupInterface';
import Alerts from '../spec/alerts';
import Badges from '../spec/badges';
import Breadcrumbs from '../spec/breadCrumbs';
import Buttons from '../spec/buttons';
import ButtonGroups from '../spec/buttonGroups';
import Progress from '../spec/progress';
import { BUTTON_NAMES } from '../consts/buttonNames.enum';
import Cards from '../spec/cards';
import Accordions from '../spec/accordions';
import Dropdowns from '../spec/dropdowns';

export default class MarkupManager {
  static retrieveContentMarkup(clickedButtonName: BUTTON_NAMES): ContentMarkupInterface {
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
      case BUTTON_NAMES.PROGRESS:
        return Progress;        
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
