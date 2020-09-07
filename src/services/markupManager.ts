import ContentMarkupInterface from '../interfaces/ContentMarkupInterface';
import Buttons from '../spec/buttons';
import Badges from '@/spec/badges';

export default new class {
  public retrieveContentMarkup(clickedButtonName: string): ContentMarkupInterface {
    switch(clickedButtonName) {
      case 'Badges':
        return Badges;
      case 'Buttons':
        return Buttons;
      default: {
        return {
          bootstrap: '',
          material: '',
          uikit: '',
          foundation: '',
          bulma: '',
        };
      }
    }
  }
}