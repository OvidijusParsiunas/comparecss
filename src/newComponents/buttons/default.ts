import { WorkshopComponent } from '../../interfaces/workshopComponent';
import { NewComponent } from '../../interfaces/newComponent';
import { BUTTON_COMPONENT_MODES } from '../../consts/buttonComponentModes.enum';
import { NEW_COMPONENT_TYPES } from '../../consts/newComponentTypes.enum';

export default {
  getNewComponent(): WorkshopComponent {
    return {
      type: NEW_COMPONENT_TYPES.BUTTON,
      componentProperties: {
        frameworkClass: 'foundation',
        componentClass: 'button',
        innerHtml: 'button',
        transition: 'all 0.25s ease-out',
        customCss: {
          [BUTTON_COMPONENT_MODES.DEFAULT]: {
            borderRadius: '0px',
            borderWidth: '0px',
            borderColor: '#1779ba',
            backgroundColor: '#1779ba',
            boxShadow: '0px 0px 0px 0px #000000',
            outline: 'none',
            lineHeight: '0',
            paddingTop: '0px',
            paddingBottom: '0px',
            marginLeft: '0px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            width: '40px',
            height: '38px',
            boxSizing: 'content-box',
            transition: 'unset',
            color: '#ffffff',
          },
          [BUTTON_COMPONENT_MODES.HOVER]: {
            backgroundColor: '#ff0000',
          },
          [BUTTON_COMPONENT_MODES.CLICK]: {
            backgroundColor: '#409441',
          },
        },
        initialCss: {
          [BUTTON_COMPONENT_MODES.DEFAULT]: {
            borderRadius: '0px',
            borderWidth: '0px',
            borderColor: '#1779ba',
            backgroundColor: '#1779ba',
            boxShadow: '0px 0px 0px 0px #000000',
            outline: 'none',
            lineHeight: '0',
            paddingTop: '0px',
            paddingBottom: '0px',
            marginLeft: '0px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            width: '40px',
            height: '38px',
            boxSizing: 'content-box',
            transition: 'none',
            color: '#ffffff',
          },
          [BUTTON_COMPONENT_MODES.HOVER]: {
            backgroundColor: '#ff0000',
          },
          [BUTTON_COMPONENT_MODES.CLICK]: {
            backgroundColor: '#409441',
          },
        },
        customJS: {},
        customCssActiveMode: BUTTON_COMPONENT_MODES.DEFAULT,
      },
      className: 'button'
    }
  },
} as NewComponent;
