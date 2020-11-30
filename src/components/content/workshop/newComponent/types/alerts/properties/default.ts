import { CustomCss, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { NewComponent } from '../../../../../../../interfaces/newComponent';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';

// need to fill in properly so that the 'reset' option would work
const initialContainerButtonCss: CustomCss = {
  [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
    color: '#004085',
    backgroundColor: '#cce5ff',
    borderColor: '#b8daff',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '4px',
    width: '440px',
    height: '50px',
    boxSizing: 'unset',
    fontSize: '16px',
    fontFamily: '"Poppins", sans-serif',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    transition: 'unset',
  },
}

const initialCloseButtonCss: CustomCss = {
  [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
    height: '12px',
    width: '14px',
    borderRadius: '15px',
    lineHeight: '1px',
    cursor: 'pointer',
    boxSizing: 'unset',
    fontSize: '16px',
    color: '#ff0000',
    boxShadow: '0px 0px 0px 0px #000000',
    borderWidth: '0px',
    backgroundColor: 'inherit',
    outline: 'none',
    paddingTop: '1px',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingBottom: '0px',
    marginTop: '18px',
    marginRight: '5px',
  },
}

export const defaultAlert: NewComponent = {
  getNewComponent(): WorkshopComponent {
    return {
      type: NEW_COMPONENT_TYPES.ALERT,
      subcomponents: {
        [SUB_COMPONENTS.BASE]: {
          frameworkClass: 'bootstrap',
          componentTag: 'div',
          innerHtmlText: 'Alert',
          transition: 'all 0.25s ease-out',
          customSettingsProperties: {
            width: [100, 700],
            height: [30, 200],
          },
          customCss: { ...initialContainerButtonCss },
          initialCss: { ...initialContainerButtonCss },
          jsClasses: new Set(),
          initialJsClasses: new Set(),
          customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
          tempCustomCss: new Set(['transition']),
        },
        [SUB_COMPONENTS.CLOSE]: {
          frameworkClass: 'bootstrap',
          componentTag: 'div',
          innerHtmlText: 'Alert',
          transition: 'all 0.25s ease-out',
          customSettingsProperties: {
            width: [14, 80],
            height: [10, 80],
          },
          customCss: { ...initialCloseButtonCss },
          initialCss: { ...initialCloseButtonCss },
          jsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
          initialJsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
          customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
          tempCustomCss: new Set(['transition']),
          optionalSubcomponent: { currentlyDisplaying: true }
        },
      },
      subcomponentsActiveMode: SUB_COMPONENTS.BASE,
      className: 'default-class-name',
    }
  },
};
