import { CustomCss, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';
import createAlertComponentPreviewStructure from './modalComponentPreviewStructure';
import { NewComponent } from '../../../../../../../interfaces/newComponent';
import { inheritedAlertCloseChildCss } from './inheritedAlertCloseChildCss';
import { inheritedAlertBaseChildCss } from './inheritedAlertBaseChildCss';
import { alertBaseCustomSettings } from './alertBaseCustomSettings';
import { inheritedAlertBaseCss } from './inheritedCss';

// all default css needs to be filled in as to be able to 'reset' correctly
function createInitialBaseCss(): CustomCss {
  return {
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
}

function createInitialCloseButtonCss(): CustomCss {
  return {
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
}

function createSubcomponents(): Subcomponents {
  return {
    [SUB_COMPONENTS.BASE]: {
      frameworkClass: 'bootstrap',
      componentTag: 'div',
      customSettingsProperties: {
        width: [100, 700],
        height: [30, 200],
      },
      customCss: createInitialBaseCss(),
      initialCss: createInitialBaseCss(),
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
      customCss: createInitialCloseButtonCss(),
      initialCss: createInitialCloseButtonCss(),
      jsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
      initialJsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
      customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      childCss: inheritedAlertCloseChildCss,
      optionalSubcomponent: { currentlyDisplaying: true },
    },
  }
}

export const defaultModal: NewComponent = {
  getNewComponent(): WorkshopComponent {
    const subcomponents = createSubcomponents();
    return {
      type: NEW_COMPONENT_TYPES.MODAL,
      subcomponents,
      subcomponentsActiveMode: SUB_COMPONENTS.BASE,
      componentPreviewStructure: createAlertComponentPreviewStructure(subcomponents[SUB_COMPONENTS.BASE], subcomponents[SUB_COMPONENTS.CLOSE]),
      className: 'default-class-name',
    }
  },
};
