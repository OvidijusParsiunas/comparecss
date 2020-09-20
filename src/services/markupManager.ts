import { ContentMarkupInterface } from '../interfaces/ContentMarkupInterface';
import Badges from '@/spec/badges';
import Buttons from '../spec/buttons';
import ButtonGroups from '../spec/buttonGroups';

export default class MarkupManager {
  static retrieveContentMarkup(clickedButtonName: string): ContentMarkupInterface {
    switch (clickedButtonName) {
      case 'Badges':
        return Badges;
      case 'Buttons':
        return Buttons;
      case 'Button groups':
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
