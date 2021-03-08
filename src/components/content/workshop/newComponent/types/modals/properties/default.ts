import { BackdropProperties, ComponentCenteringInParent, ComponentTransitions, CustomCss, CustomFeatures, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { MODAL_TRANSITION_ENTRANCE_TYPES, MODAL_TRANSITION_EXIT_TYPES } from '../../../../../../../consts/modalTransitionTypes.enum';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { alertCloseSpecificSettings } from '../../alerts/properties/alertCloseSpecificSettings';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { modalLayerBottomSpecificSettings } from './modalLayerBottomSpecificSettings';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';
import createModalComponentPreviewStructure from './modalComponentPreviewStructure';
import { modalLayerTopSpecificSettings } from './modalLayerTopSpecificSettings';
import { NewComponent } from '../../../../../../../interfaces/newComponent';
import { inheritedAlertCloseChildCss } from './inheritedAlertCloseChildCss';
import { inheritedAlertBaseChildCss } from './inheritedAlertBaseChildCss';
import { modalBaseSpecificSettings } from './modalBaseSpecificSettings';
import { inheritedAlertBaseCss } from './inheritedCss';

function createDefaultTransitionsProperties(): ComponentTransitions {
  return {
    entrance: {
      type: MODAL_TRANSITION_ENTRANCE_TYPES.FADE_IN,
      duration: '0.3s',
      delay: '0.15s',
    },
    exit: {
      type: MODAL_TRANSITION_EXIT_TYPES.FADE_OUT,
      duration: '0.25s',
    },
  };
}

function createDefaultComponentCenteringInParent(): ComponentCenteringInParent {
  return {
    vertical: true,
    horizontal: true,
  };
}

function createDefaultBackdropProperties(): BackdropProperties {
  return {
    color: '#6d6d6dcc',
    alpha: 0.8,
    visible: false,
  }
}

function createDefaultBaseCustomFeatures(): CustomFeatures {
  return {
    componentCenteringInParent: createDefaultComponentCenteringInParent(),
    transitions: createDefaultTransitionsProperties(),
    backdrop: createDefaultBackdropProperties(),
  }
}

function createDefaultCloseButtonCustomFeatures(): CustomFeatures {
  return {
    jsClasses: createInitialCloseButtonJsClasses(),
  }
}

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
      top: undefined,
    },
  };
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
  };
}

function createInitialLayer1Css(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      position: 'relative',
      height: '50px',
      textAlign: 'left',
      paddingLeft: '20px',
      paddingTop: '0px',
      paddingRight: '0px',
      paddingBottom: '0px',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: '#e9ecef',
      backgroundColor: 'inherit',
      fontWeight: '500',
      fontSize: '20px',
      boxShadow: 'unset',
      fontFamily: '"Poppins", sans-serif',
      color: '#004085',
      zIndex: 1,
    },
  };
}

function createInitialLayer2Css(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      position: 'relative',
      height: '50px',
      textAlign: 'left',
      paddingLeft: '20px',
      paddingTop: '0px',
      paddingRight: '0px',
      paddingBottom: '0px',
      fontWeight: '400',
      backgroundColor: 'inherit',
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      color: '#004085',
    },
  };
}

function createInitialLayer3Css(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      position: 'relative',
      height: '50px',
      textAlign: 'right',
      paddingLeft: '0px',
      paddingRight: '20px',
      paddingTop: '0px',
      paddingBottom: '0px',
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: '#e9ecef',
      backgroundColor: 'inherit',
      boxShadow: 'unset',
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      color: '#004085',
    },
  };
}

function createInitialCloseButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
  return new Set([JAVASCRIPT_CLASSES.RIPPLES])
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
      subcomponentSpecificSettings: modalBaseSpecificSettings,
      customFeatures: createDefaultBaseCustomFeatures(),
      defaultCustomFeatures: createDefaultBaseCustomFeatures(),
    },
    [SUB_COMPONENTS.LAYER_1]: {
      componentTag: 'div',
      customCss: createInitialLayer1Css(),
      initialCss: createInitialLayer1Css(),
      customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      subcomponentSpecificSettings: modalLayerTopSpecificSettings,
    },
    [SUB_COMPONENTS.LAYER_2]: {
      componentTag: 'div',
      customCss: createInitialLayer2Css(),
      initialCss: createInitialLayer2Css(),
      customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
    },
    [SUB_COMPONENTS.LAYER_3]: {
      componentTag: 'div',
      customCss: createInitialLayer3Css(),
      initialCss: createInitialLayer3Css(),
      customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      subcomponentSpecificSettings: modalLayerBottomSpecificSettings,
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
