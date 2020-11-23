import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { NewComponent } from '../../../../../../../interfaces/newComponent';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';
// import { inheritedButtonCss } from './inheritedCss';

export const defaultAlert: NewComponent = {
  getNewComponent(): WorkshopComponent {
    return {
      type: NEW_COMPONENT_TYPES.ALERT,
      subcomponents: {
        [SUB_COMPONENTS.CONTAINER]: {
          frameworkClass: 'bootstrap',
          componentTag: 'div',
          innerHtmlText: 'Alert',
          transition: 'all 0.25s ease-out',
          customCss: {
            [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
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
            [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
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
          customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
          tempCustomCss: new Set(['transition']),
        },
        [SUB_COMPONENTS.CLOSE]: {
          frameworkClass: 'bootstrap',
          componentTag: 'div',
          innerHtmlText: 'Alert',
          transition: 'all 0.25s ease-out',
          customCss: {
            [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
              color: '#004085',
              backgroundColor: '#ff2727',
              borderColor: '#b8daff',
              borderWidth: '1px',
              borderStyle: 'solid',
              outline: 'none',
              boxSizing: 'border-box',
              borderRadius: '0px',
              marginLeft: '0px',
              marginTop: '0px',
              marginRight: '0px',
              marginBottom: '0px',
              float: 'right',
              fontSize: '24px',
              fontWeight: '700',
              lineHeight: '1.8',
              cursor: 'pointer',
              position: 'absolute',
              top: '0',
              right: '0',
              height: '48px'
            },
            [SUB_COMPONENT_CSS_MODES.HOVER]: {
              color: '#ff0000',
            },
          },
          initialCss: {
            [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
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
            [SUB_COMPONENT_CSS_MODES.HOVER]: {
              color: '#ff0000',
            },
          },
          jsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
          initialJsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
          customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
          tempCustomCss: new Set(['transition']),
        },
      },
      subcomponentsActiveMode: SUB_COMPONENTS.CONTAINER,
      customSettingsProperties: {
        width: [10, 80],
        height: [10, 80],
      },
      className: 'default-class-name',
    }
  },
};
