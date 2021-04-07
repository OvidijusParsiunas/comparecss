import { AlignedLayerSection, AutoWidth, CustomCss, CustomFeatures, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import PreviewStructure from '../../../../../../../services/workshop/componentGenerator/previewStructure';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CSS_STATES } from '../../../../../../../consts/subcomponentCssStates.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import getAlertSubcomponentDropdownStructure from './subcomponentDropdownStructure';
import { inheritedAlertCloseChildCss } from './inheritedAlertCloseChildCss';
import { inheritedAlertBaseChildCss } from './inheritedAlertBaseChildCss';
import { alertBaseSpecificSettings } from './alertBaseSpecificSettings';
import { inheritedAlertBaseCss } from './inheritedCss';

// all default css needs to be filled in as to be able to 'reset' correctly
function createInitialBaseCss(): CustomCss {
  return {
    [CSS_STATES.DEFAULT]: {
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
    [CSS_STATES.DEFAULT]: {
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
    [CSS_STATES.DEFAULT]: {
      height: '100%',
    },
  }
}

function createTextCss(): CustomCss {
  return {
    [CSS_STATES.DEFAULT]: {
      top: '50%',
      width: 'auto',
      backgroundColor: 'inherit',
      fontWeight: '400',
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      color: '#004085',
      textAlign: 'center',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      marginLeft: '0px',
      marginRight: '0px',
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
    [CORE_SUBCOMPONENTS_NAMES.BASE]: {
      customCss: createInitialBaseCss(),
      initialCss: createInitialBaseCss(),
      activeCssState: CSS_STATES.DEFAULT,
      defaultCssState: CSS_STATES.DEFAULT,
      inheritedCss: inheritedAlertBaseCss,
      childCss: inheritedAlertBaseChildCss,
      subcomponentSpecificSettings: alertBaseSpecificSettings,
    },
    [CORE_SUBCOMPONENTS_NAMES.LAYER_1]: {
      customCss: createInitialLayerCss(),
      initialCss: createInitialLayerCss(),
      activeCssState: CSS_STATES.DEFAULT,
      defaultCssState: CSS_STATES.DEFAULT,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
    },
    [CORE_SUBCOMPONENTS_NAMES.CLOSE]: {
      componentTag: 'button',
      componentText: '×',
      customCss: createInitialCloseButtonCss(),
      initialCss: createInitialCloseButtonCss(),
      activeCssState: CSS_STATES.DEFAULT,
      defaultCssState: CSS_STATES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      childCss: inheritedAlertCloseChildCss,
      optionalSubcomponent: { currentlyDisplaying: true },
      customFeatures: createDefaultCloseButtonCustomFeatures(),
      defaultCustomFeatures: createDefaultCloseButtonCustomFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT_1]: {
      componentTag: 'div',
      componentText: 'button',
      customCss: createTextCss(),
      initialCss: createTextCss(),
      activeCssState: CSS_STATES.DEFAULT,
      defaultCssState: CSS_STATES.DEFAULT,
      optionalSubcomponent: { currentlyDisplaying: true },
      customFeatures: createDefaultTextCustomFeatures(),
      defaultCustomFeatures: createDefaultTextCustomFeatures(),
    },
  }
}

export const defaultAlert: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    const subcomponents = createSubcomponents();
    const subcomponentDropdownStructure = getAlertSubcomponentDropdownStructure(
      subcomponents[CORE_SUBCOMPONENTS_NAMES.CLOSE], subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT_1]);
    return {
      type: NEW_COMPONENT_TYPES.ALERT,
      subcomponents,
      activeSubcomponentName: CORE_SUBCOMPONENTS_NAMES.BASE,
      defaultSubcomponentName: CORE_SUBCOMPONENTS_NAMES.BASE,
      componentPreviewStructure: PreviewStructure.createComponentPreviewStructure(subcomponentDropdownStructure, subcomponents),
      className: 'default-class-name',
    }
  },
};
