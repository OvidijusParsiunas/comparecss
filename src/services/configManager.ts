import ContentMarkupInterface from '../interfaces/ContentMarkupInterface';
import Buttons from '../spec/buttons';

export default new class {
    public retrieveContentMarkup(clickedButtonName: string): ContentMarkupInterface {
        switch(clickedButtonName) {
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