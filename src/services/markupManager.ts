import Badges from '@/spec/badges';
import { ContentMarkupInterface } from '../interfaces/ContentMarkupInterface';
import Buttons from '../spec/buttons';

export default class MarkupManager {
   static retrieveContentMarkup(clickedButtonName: string): ContentMarkupInterface {
     switch (clickedButtonName) {
       case 'Badges':
         return Badges;
       case 'Buttons':
         return Buttons;
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
};
