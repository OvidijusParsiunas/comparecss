import { ContentMarkupInterface } from '../interfaces/ContentMarkupInterface';
import Badges from '../spec/badges';
import Buttons from '../spec/buttons';
import ButtonGroups from '../spec/buttonGroups';
import Progress from '../spec/progress';
import { BUTTON_NAMES } from '../consts/buttonNames.enum';

export default class MarkupManager {
  static retrieveContentMarkup(clickedButtonName: BUTTON_NAMES): ContentMarkupInterface {
    switch (clickedButtonName) {
      case BUTTON_NAMES.BADGES_BUTTON:
        return Badges;
      case BUTTON_NAMES.BUTTONS_BUTTON:
        return Buttons;
      case BUTTON_NAMES.BUTTON_GROUPS_BUTTON:
        return ButtonGroups;
      case BUTTON_NAMES.PROGRESS_BUTTON:
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
