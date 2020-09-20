import { ContentMarkupInterface } from '../interfaces/ContentMarkupInterface';
import Badges from '@/spec/badges';
import Buttons from '../spec/buttons';
import ButtonGroups from '../spec/buttonGroups';
import BUTTON_CONSTS from '../consts/consts';

export default class MarkupManager {
  static retrieveContentMarkup(clickedButtonName: string): ContentMarkupInterface {
    switch (clickedButtonName) {
      case 'Badges':
        return Badges;
      case BUTTON_CONSTS.BUTTONS_BUTTON:
        return Buttons;
      case BUTTON_CONSTS.BUTTON_GROUPS_BUTTON:
        return ButtonGroups;
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
