import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { NewComponent } from '../../../../../../../interfaces/newComponent';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { COMPONENT_MODES } from '../../../../../../../consts/componentModes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
// import { inheritedButtonCss } from './inheritedCss';

export const defaultAlert: NewComponent = {
  getNewComponent(): WorkshopComponent {
    return {
      type: NEW_COMPONENT_TYPES.ALERT,
      componentProperties: {
        frameworkClass: 'bootstrap',
        componentTag: 'div',
        innerHtmlText: 'Alert',
        transition: 'all 0.25s ease-out',
        customCss: {
          [COMPONENT_MODES.DEFAULT]: {
            color: '#004085',
            backgroundColor: '#cce5ff',
            borderColor: '#b8daff',
            paddingTop: '12px',
            paddingRight: '20px',
            paddingBottom: '12px',
            paddingLeft: '20px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '4px',
            width: '400px',
            height: '50px',
          },
        },
        initialCss: {
          [COMPONENT_MODES.DEFAULT]: {
            color: '#004085',
            backgroundColor: '#cce5ff',
            borderColor: '#b8daff',
            paddingTop: '12px',
            paddingRight: '20px',
            paddingBottom: '12px',
            paddingLeft: '20px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '4px',
            width: '400px',
            height: '50px',
          },
        },
        jsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
        initialJsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
        customCssActiveMode: COMPONENT_MODES.DEFAULT,
        tempCustomCss: new Set(['transition']),
      },
      customSettingsProperties: {
        width: [100, 800],
        height: [48, 100],
      },
      className: 'default-class-name',
    }
  },
};
