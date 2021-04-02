import { MODAL_TRANSITION_ENTRANCE_TYPES, MODAL_TRANSITION_EXIT_TYPES } from '../../../../../../../consts/modalTransitionTypes.enum';
import PreviewStructure from '../../../../../../../services/workshop/newComponent/previewStructure';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import createModalSubcomponentDropdownStructure from './subcomponentDropdownStructure';
import { modalLayerBottomSpecificSettings } from './modalLayerBottomSpecificSettings';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';
import { modalLayerTopSpecificSettings } from './modalLayerTopSpecificSettings';
import { NewComponent } from '../../../../../../../interfaces/newComponent';
import { inheritedAlertCloseChildCss } from './inheritedAlertCloseChildCss';
import { inheritedAlertBaseChildCss } from './inheritedAlertBaseChildCss';
import { modalBaseSpecificSettings } from './modalBaseSpecificSettings';
import { inheritedAlertBaseCss } from './inheritedCss';
import {
  AutoWidth, BackdropProperties, ComponentCenteringInParent, ComponentTransitions,
  CustomCss, CustomFeatures, Subcomponents, WorkshopComponent,
} from '../../../../../../../interfaces/workshopComponent';

// WORK1: export these
enum SUBCOMPONENT_CATEGORIES {
  BASE, LAYER, NESTED,
}

enum NESTED_SECTIONS_TYPES {
  ALIGNED_SECTIONS = 'alignedSections', EQUAL_SPLIT_SECTIONS = 'equalSplitSections',
}

enum ALIGNED_SECTION_COLUMNS {
  LEFT = 'left', CENTER = 'center', RIGHT = 'right',
}

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
  };
}

function createDefaultBaseCustomFeatures(): CustomFeatures {
  return {
    componentCenteringInParent: createDefaultComponentCenteringInParent(),
    transitions: createDefaultTransitionsProperties(),
    backdrop: createDefaultBackdropProperties(),
  };
}

function createDefaultCloseButtonCustomFeatures(): CustomFeatures {
  return {
    jsClasses: createInitialCloseButtonJsClasses(),
  };
}

function createAutoWidth(): AutoWidth {
  return {
    auto: true,
  };
}

function createDefaultTextCustomFeatures(): CustomFeatures {
  return {
    autoWidth: createAutoWidth(),
  };
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
      boxShadow: 'unset',
      top: '0px',
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
      marginTop: '10px',
      marginRight: '10px',
      top: '50%',
    },
  };
}

function createInitialButton1Css(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      borderRadius: '0px',
      borderWidth: '0px',
      borderColor: '#1779ba',
      backgroundColor: '#1779ba',
      borderStyle: 'solid',
      boxShadow: 'unset',
      outline: 'none',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '12px',
      paddingRight: '12px',
      marginLeft: '30px',
      marginTop: '0px',
      marginRight: '0px',
      marginBottom: '0px',
      width: '40px',
      height: '38px',
      boxSizing: 'content-box',
      color: '#ffffff',
      fontSize: '14px',
      fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
      userSelect: 'none',
      top: '50%',
    },
    [SUB_COMPONENT_CSS_MODES.HOVER]: {
      backgroundColor: '#ff0000',
    },
    [SUB_COMPONENT_CSS_MODES.CLICK]: {
      backgroundColor: '#409441',
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
      boxShadow: 'unset',
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
      backgroundColor: 'inherit',
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
      paddingRight: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: '#e9ecef',
      backgroundColor: 'inherit',
      boxShadow: 'unset',
    },
  };
}

function createInitialText1Css(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      display: 'inline-table',
      top: '50%',
      width: 'auto',
      fontWeight: '500',
      fontSize: '20px',
      fontFamily: '"Poppins", sans-serif',
      color: '#004085',
      textAlign: 'center',
      backgroundColor: 'inherit',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      marginLeft: '0px',
      marginRight: '0px',
    },
  }
}

function createInitialText2Css(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      display: 'inline-table',
      top: '50%',
      width: 'auto',
      fontWeight: '400',
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      color: '#004085',
      textAlign: 'center',
      backgroundColor: 'inherit',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      marginLeft: '0px',
      marginRight: '0px',
    },
  }
}

function createInitialCloseButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
  return new Set([JAVASCRIPT_CLASSES.RIPPLES]);
}

function createSubcomponents(): Subcomponents {
  return {
    [SUB_COMPONENTS.BASE]: {
      category: SUBCOMPONENT_CATEGORIES.BASE,
      customCss: createInitialBaseCss(),
      initialCss: createInitialBaseCss(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      inheritedCss: inheritedAlertBaseCss,
      childCss: inheritedAlertBaseChildCss,
      subcomponentSpecificSettings: modalBaseSpecificSettings,
      customFeatures: createDefaultBaseCustomFeatures(),
      defaultCustomFeatures: createDefaultBaseCustomFeatures(),
    },
    [SUB_COMPONENTS.LAYER_1]: {
      category: SUBCOMPONENT_CATEGORIES.LAYER,
      layerSectionsType: NESTED_SECTIONS_TYPES.ALIGNED_SECTIONS,
      customCss: createInitialLayer1Css(),
      initialCss: createInitialLayer1Css(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentSpecificSettings: modalLayerTopSpecificSettings,
    },
    [SUB_COMPONENTS.LAYER_2]: {
      category: SUBCOMPONENT_CATEGORIES.LAYER,
      layerSectionsType: NESTED_SECTIONS_TYPES.ALIGNED_SECTIONS,
      customCss: createInitialLayer2Css(),
      initialCss: createInitialLayer2Css(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
    },
    [SUB_COMPONENTS.LAYER_3]: {
      category: SUBCOMPONENT_CATEGORIES.LAYER,
      layerSectionsType: NESTED_SECTIONS_TYPES.ALIGNED_SECTIONS,
      customCss: createInitialLayer3Css(),
      initialCss: createInitialLayer3Css(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentSpecificSettings: modalLayerBottomSpecificSettings,
    },
    [SUB_COMPONENTS.CLOSE]: {
      category: SUBCOMPONENT_CATEGORIES.NESTED,
      alignedLayerSection: ALIGNED_SECTION_COLUMNS.RIGHT,
      componentTag: 'button',
      componentText: '×',
      customCss: createInitialCloseButtonCss(),
      initialCss: createInitialCloseButtonCss(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      childCss: inheritedAlertCloseChildCss,
      optionalSubcomponent: { currentlyDisplaying: true },
      customFeatures: createDefaultCloseButtonCustomFeatures(),
      defaultCustomFeatures: createDefaultCloseButtonCustomFeatures(),
    },
    [SUB_COMPONENTS.BUTTON_1]: {
      category: SUBCOMPONENT_CATEGORIES.NESTED,
      alignedLayerSection: ALIGNED_SECTION_COLUMNS.RIGHT,
      componentTag: 'button',
      componentText: 'button',
      customCss: createInitialButton1Css(),
      initialCss: createInitialButton1Css(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      childCss: inheritedAlertCloseChildCss,
      optionalSubcomponent: { currentlyDisplaying: true },
      customFeatures: createDefaultCloseButtonCustomFeatures(),
      defaultCustomFeatures: createDefaultCloseButtonCustomFeatures(),
    },
    [SUB_COMPONENTS.BUTTON_2]: {
      category: SUBCOMPONENT_CATEGORIES.NESTED,
      alignedLayerSection: ALIGNED_SECTION_COLUMNS.RIGHT,
      componentTag: 'button',
      componentText: 'Cancel',
      customCss: createInitialButton1Css(),
      initialCss: createInitialButton1Css(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      childCss: inheritedAlertCloseChildCss,
      optionalSubcomponent: { currentlyDisplaying: true },
      customFeatures: createDefaultCloseButtonCustomFeatures(),
      defaultCustomFeatures: createDefaultCloseButtonCustomFeatures(),
    },
    [SUB_COMPONENTS.TEXT_1]: {
      category: SUBCOMPONENT_CATEGORIES.NESTED,
      alignedLayerSection: ALIGNED_SECTION_COLUMNS.LEFT,
      componentTag: 'div',
      componentText: 'Modal title',
      customCss: createInitialText1Css(),
      initialCss: createInitialText1Css(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      optionalSubcomponent: { currentlyDisplaying: true },
      customFeatures: createDefaultTextCustomFeatures(),
      defaultCustomFeatures: createDefaultTextCustomFeatures(),
    },
    [SUB_COMPONENTS.TEXT_2]: {
      category: SUBCOMPONENT_CATEGORIES.NESTED,
      alignedLayerSection: ALIGNED_SECTION_COLUMNS.LEFT,
      componentTag: 'div',
      componentText: 'Modal body text',
      customCss: createInitialText2Css(),
      initialCss: createInitialText2Css(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      optionalSubcomponent: { currentlyDisplaying: true },
      customFeatures: createDefaultTextCustomFeatures(),
      defaultCustomFeatures: createDefaultTextCustomFeatures(),
    },
  };
}

export const defaultModal: NewComponent = {
  getNewComponent(): WorkshopComponent {
    const subcomponents = createSubcomponents();
    const subcomponentDropdownStructure = createModalSubcomponentDropdownStructure(
      subcomponents[SUB_COMPONENTS.BUTTON_1], subcomponents[SUB_COMPONENTS.BUTTON_2], subcomponents[SUB_COMPONENTS.CLOSE],
      subcomponents[SUB_COMPONENTS.TEXT_1], subcomponents[SUB_COMPONENTS.TEXT_2]
    )
    const componentPreviewStructure = PreviewStructure.createSubcomponentDropdownDructure(subcomponentDropdownStructure, subcomponents);
    return {
      type: NEW_COMPONENT_TYPES.MODAL,
      subcomponents,
      activeSubcomponentMode: SUB_COMPONENTS.BASE,
      defaultSubcomponentMode: SUB_COMPONENTS.BASE,
      componentPreviewStructure,
      className: 'default-class-name',
    };
  },
};
