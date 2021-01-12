import { CustomCss, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { alertCloseCustomSettings } from '../../alerts/properties/alertCloseCustomSettings';
import { alertBaseCustomSettings } from '../../alerts/properties/alertBaseCustomSettings';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';
import createModalComponentPreviewStructure from './modalComponentPreviewStructure';
import { modalLayerBottomCustomSettings } from './modalLayerBottomCustomSettings';
import { NewComponent } from '../../../../../../../interfaces/newComponent';
import { inheritedAlertCloseChildCss } from './inheritedAlertCloseChildCss';
import { modalLayerTopCustomSettings } from './modalLayerTopCustomSettings';
import { inheritedAlertBaseChildCss } from './inheritedAlertBaseChildCss';
import { inheritedAlertBaseCss } from './inheritedCss';

// all default css needs to be filled in as to be able to 'reset' correctly
function createInitialBaseCss(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      color: '#004085',
      backgroundColor: '#ffffff',
      borderColor: '#00000033',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '4px',
      width: '450px',
      boxSizing: 'unset',
      fontSize: '16px',
      boxShadow: 'unset',
      fontFamily: '"Poppins", sans-serif',
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
      marginRight: '10px',
    },
  }
}

function createSubcomponents(): Subcomponents {
  return {
    [SUB_COMPONENTS.BASE]: {
      componentTag: 'div',
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
    [SUB_COMPONENTS.LAYER_1]: {
      componentTag: 'div',
      customCss: {
        [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
          position: 'relative',
          height: '50px',
          textAlign: 'left',
          paddingLeft: '20px',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderBottomColor: '#e9ecef',
          fontWeight: '500',
          fontSize: '20px',
        },
      },
      initialCss: {
        [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
          position: 'relative',
          height: '50px',
          textAlign: 'left',
          paddingLeft: '20px',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderBottomColor: '#e9ecef',
          fontWeight: '500',
          fontSize: '20px',
        },
      },
      jsClasses: new Set(),
      initialJsClasses: new Set(),
      customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      customSettings: modalLayerTopCustomSettings,
    },
    [SUB_COMPONENTS.LAYER_2]: {
      componentTag: 'div',
      customCss: {
        [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
          position: 'relative',
          height: '50px',
          textAlign: 'left',
          paddingLeft: '20px',
          fontWeight: '400',
        },
      },
      initialCss: {
        [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
          position: 'relative',
          height: '50px',
          textAlign: 'left',
          paddingLeft: '20px',
          fontWeight: '400',
        },
      },
      jsClasses: new Set(),
      initialJsClasses: new Set(),
      customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
    },
    [SUB_COMPONENTS.LAYER_3]: {
      componentTag: 'div',
      customCss: {
        [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
          position: 'relative',
          height: '50px',
          textAlign: 'right',
          paddingRight: '20px',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          borderTopColor: '#e9ecef',
        },
      },
      initialCss: {
        [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
          position: 'relative',
          height: '50px',
          textAlign: 'right',
          paddingRight: '20px',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          borderTopColor: '#e9ecef',
        },
      },
      jsClasses: new Set(),
      initialJsClasses: new Set(),
      customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      customSettings: modalLayerBottomCustomSettings,
    },
    [SUB_COMPONENTS.CLOSE]: {
      componentTag: 'div',
      customCss: createInitialCloseButtonCss(),
      initialCss: createInitialCloseButtonCss(),
      jsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
      initialJsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
      customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      childCss: inheritedAlertCloseChildCss,
      optionalSubcomponent: { currentlyDisplaying: true },
      customSettings: alertCloseCustomSettings,
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
      componentPreviewStructure: createModalComponentPreviewStructure(
        subcomponents[SUB_COMPONENTS.BASE], subcomponents[SUB_COMPONENTS.CLOSE],
        subcomponents[SUB_COMPONENTS.LAYER_1], subcomponents[SUB_COMPONENTS.LAYER_2], subcomponents[SUB_COMPONENTS.LAYER_3]),
      className: 'default-class-name',
    }
  },
};
