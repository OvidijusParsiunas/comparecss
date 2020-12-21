import { ChildCss, CustomCss, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { NewComponent } from '../../../../../../../interfaces/newComponent';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';
import JSONManipulation from '../../../../../../../services/workshop/jsonManipulation';
import { inheritedAlertBaseCss } from './inheritedCss';

// need to fill in properly so that the 'reset' option would work
const initialBaseCss: CustomCss = {
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

const childCss: ChildCss[] = [
  {
    elementTag: 'div',
    childNumber: 1,
    inheritedCss: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      width: '200px',
      textAlign: 'center',
    },
  },
  {
    elementTag: 'div',
    childNumber: 2,
    inheritedCss: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      cursor: 'default !important',
    },
    nestedChildCss: [{
      elementTag: 'button',
      childNumber: 1,
      hasCustomCss: true,
      inheritedCss: {
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.25s ease-out',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      },
      nestedChildCss: [{
        elementTag: 'div',
        childNumber: 1,
        inheritedCss: {
          display: 'table',
          pointerEvents: 'none',
          marginLeft: 'auto',
          marginRight: 'auto',
        }
      }]
    }]
  } 
]

export const defaultAlert: NewComponent = {
  getNewComponent(): WorkshopComponent {
    return {
      type: NEW_COMPONENT_TYPES.ALERT,
      subcomponents: {
        [SUB_COMPONENTS.BASE]: {
          frameworkClass: 'bootstrap',
          componentTag: 'div',
          innerHtmlText: 'Alert',
          customSettingsProperties: {
            width: [100, 700],
            height: [30, 200],
          },
          customCss: JSONManipulation.deepCopy(initialBaseCss),
          initialCss: JSONManipulation.deepCopy(initialBaseCss),
          jsClasses: new Set(),
          initialJsClasses: new Set(),
          customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
          tempCustomCss: new Set(['transition']),
          inheritedCss: inheritedAlertBaseCss,
        },
        [SUB_COMPONENTS.CLOSE]: {
          frameworkClass: 'bootstrap',
          componentTag: 'div',
          innerHtmlText: 'Alert',
          customSettingsProperties: {
            width: [14, 80],
            height: [10, 80],
          },
          customCss: JSONManipulation.deepCopy(initialCloseButtonCss),
          initialCss: JSONManipulation.deepCopy(initialCloseButtonCss),
          jsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
          initialJsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
          customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
          subcomponentPreviewTransition: 'all 0.25s ease-out',
          tempCustomCss: new Set(['transition']),
          childCss,
          optionalSubcomponent: { currentlyDisplaying: true },
        },
      },
      subcomponentsActiveMode: SUB_COMPONENTS.BASE,
      className: 'default-class-name',
    }
  },
};
