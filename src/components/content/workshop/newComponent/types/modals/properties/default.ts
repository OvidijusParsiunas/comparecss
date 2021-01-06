import { CustomCss, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import JSONManipulation from '../../../../../../../services/workshop/jsonManipulation';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';
import { NewComponent } from '../../../../../../../interfaces/newComponent';
import { inheritedAlertCloseChildCss } from './inheritedAlertCloseChildCss';
import { inheritedAlertBaseChildCss } from './inheritedAlertBaseChildCss';
import { alertBaseCustomSettings } from './alertBaseCustomSettings';
import { inheritedAlertBaseCss } from './inheritedCss';

// all default css needs to be filled in as to be able to 'reset' correctly
const initialBaseCss: CustomCss = {
  [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
    color: '#004085',
    backgroundColor: '#cce5ff',
    borderColor: '#b8daff',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '4px',
    width: '400px',
    height: '50px',
    boxSizing: 'unset',
    fontSize: '16px',
    boxShadow: 'unset',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '0px',
    paddingBottom: '0px',
    fontFamily: '"Poppins", sans-serif',
    textAlign: 'center',
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
    boxShadow: 'unset',
    borderWidth: '0px',
    borderStyle: 'solid',
    borderColor: '#000000',
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

const subcomponents = {
  [SUB_COMPONENTS.BASE]: {
    frameworkClass: 'bootstrap',
    componentTag: 'div',
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
    childCss: inheritedAlertBaseChildCss,
    customSettings: alertBaseCustomSettings,
  },
  [SUB_COMPONENTS.CLOSE]: {
    frameworkClass: 'bootstrap',
    componentTag: 'div',
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
    childCss: inheritedAlertCloseChildCss,
    optionalSubcomponent: { currentlyDisplaying: true },
  },
}

const componentPreviewStructure = {
  baseCss: subcomponents[SUB_COMPONENTS.BASE],
  layeringType: 'vertical',
  layers: [
    {
      'text': 'Alert',
      [SUB_COMPONENTS.CLOSE]: subcomponents[SUB_COMPONENTS.CLOSE],
    },
  ],
}

export const defaultModal: NewComponent = {
  getNewComponent(): any {
    return {
      type: NEW_COMPONENT_TYPES.ALERT,
      subcomponents,
      componentPreviewStructure,
      subcomponentsActiveMode: SUB_COMPONENTS.BASE,
      className: 'default-class-name',
    }
  },
};
