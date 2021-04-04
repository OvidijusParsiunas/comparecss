import { AlignedLayerSection, AutoWidth, CustomCss, CustomFeatures, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections';
import PreviewStructure from '../../../../../../../services/workshop/newComponent/previewStructure';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';
import getAlertSubcomponentDropdownStructure from './subcomponentDropdownStructure';
import { NewComponent } from '../../../../../../../interfaces/newComponent';
import { inheritedAlertCloseChildCss } from './inheritedAlertCloseChildCss';
import { inheritedAlertBaseChildCss } from './inheritedAlertBaseChildCss';
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
      top: '50%',
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

function createTextCss(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      display: 'inline-table',
      top: '50%',
      width: 'auto',
      backgroundColor: 'inherit',
    },
  }
}

function createAlignedLayerSection(section: ALIGNED_SECTION_TYPES): AlignedLayerSection {
  return { section };
}

function createInitialCloseButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
  return new Set([JAVASCRIPT_CLASSES.RIPPLES])
}

function createDefaultCloseButtonCustomFeatures(): CustomFeatures {
  return {
    jsClasses: createInitialCloseButtonJsClasses(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT),
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
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER),
  };
}

function createSubcomponents(): Subcomponents {
  return {
    [SUB_COMPONENTS.BASE]: {
      customCss: createInitialBaseCss(),
      initialCss: createInitialBaseCss(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      inheritedCss: inheritedAlertBaseCss,
      childCss: inheritedAlertBaseChildCss,
      subcomponentSpecificSettings: alertBaseSpecificSettings,
    },
    [SUB_COMPONENTS.LAYER_1]: {
      customCss: createInitialLayerCss(),
      initialCss: createInitialLayerCss(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
    },
    [SUB_COMPONENTS.CLOSE]: {
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
    [SUB_COMPONENTS.TEXT_1]: {
      componentTag: 'div',
      componentText: 'button',
      customCss: createTextCss(),
      initialCss: createTextCss(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      optionalSubcomponent: { currentlyDisplaying: true },
      customFeatures: createDefaultTextCustomFeatures(),
      defaultCustomFeatures: createDefaultTextCustomFeatures(),
    },
  }
}

export const defaultAlert: NewComponent = {
  getNewComponent(): WorkshopComponent {
    const subcomponents = createSubcomponents();
    const subcomponentDropdownStructure = getAlertSubcomponentDropdownStructure(
      subcomponents[SUB_COMPONENTS.CLOSE], subcomponents[SUB_COMPONENTS.TEXT_1]);
    return {
      type: NEW_COMPONENT_TYPES.ALERT,
      subcomponents,
      activeSubcomponentMode: SUB_COMPONENTS.BASE,
      defaultSubcomponentMode: SUB_COMPONENTS.BASE,
      componentPreviewStructure: PreviewStructure.createComponentPreviewStructure(subcomponentDropdownStructure, subcomponents),
      className: 'default-class-name',
    }
  },
};
