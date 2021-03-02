import { CustomCss, CustomFeatures, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';
import createAlertComponentPreviewStructure from './alertComponentPreviewStructure';
import { NewComponent } from '../../../../../../../interfaces/newComponent';
import { inheritedAlertCloseChildCss } from './inheritedAlertCloseChildCss';
import { inheritedAlertBaseChildCss } from './inheritedAlertBaseChildCss';
import { alertCloseSpecificSettings } from './alertCloseSpecificSettings';
import { alertBaseSpecificSettings } from './alertBaseSpecificSettings';
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

function createInitialLayerCss(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      height: '100%',
    },
  }
}

function createInitialCloseButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
  return new Set([JAVASCRIPT_CLASSES.RIPPLES])
}

function createDefaultCloseButtonCustomFeatures(): CustomFeatures {
  return {
    jsClasses: createInitialCloseButtonJsClasses(),
  }
}

function createSubcomponents(): Subcomponents {
  return {
    [SUB_COMPONENTS.BASE]: {
      componentTag: 'div',
      customCss: createInitialBaseCss(),
      initialCss: createInitialBaseCss(),
      customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      tempCustomCss: new Set(['transition']),
      inheritedCss: inheritedAlertBaseCss,
      childCss: inheritedAlertBaseChildCss,
      subcomponentSpecificSettings: alertBaseSpecificSettings,
    },
    [SUB_COMPONENTS.CLOSE]: {
      componentTag: 'div',
      customCss: createInitialCloseButtonCss(),
      initialCss: createInitialCloseButtonCss(),
      customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      childCss: inheritedAlertCloseChildCss,
      optionalSubcomponent: { currentlyDisplaying: true },
      subcomponentSpecificSettings: alertCloseSpecificSettings,
      customFeatures: createDefaultCloseButtonCustomFeatures(),
      defaultCustomFeatures: createDefaultCloseButtonCustomFeatures(),
    },
    [SUB_COMPONENTS.LAYER_1]: {
      componentTag: 'div',
      customCss: createInitialLayerCss(),
      initialCss: createInitialLayerCss(),
      customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      tempCustomCss: new Set(['transition']),
    },
  }
}

export const defaultAlert: NewComponent = {
  getNewComponent(): WorkshopComponent {
    const subcomponents = createSubcomponents();
    return {
      type: NEW_COMPONENT_TYPES.ALERT,
      subcomponents,
      subcomponentsActiveMode: SUB_COMPONENTS.BASE,
      componentPreviewStructure: createAlertComponentPreviewStructure(subcomponents[SUB_COMPONENTS.BASE],
        subcomponents[SUB_COMPONENTS.CLOSE], subcomponents[SUB_COMPONENTS.LAYER_1]),
      className: 'default-class-name',
    }
  },
};
