import { AlignedLayerSection, AutoWidth, CustomCss, CustomFeatures, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections';
import PreviewStructure from '../../../../../../../services/workshop/newComponent/previewStructure';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import getButtonSubcomponentDropdownStructure from './subcomponentDropdownStructure';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/newComponent';
import { buttonSpecificSettings } from './buttonSpecificSettings';
import { inheritedButtonCss } from './inheritedCss';

// WORK2: add type
const defaultSubcomponentNames = { base: SUB_COMPONENTS.BUTTON_1, layer: SUB_COMPONENTS.LAYER_1, text: SUB_COMPONENTS.TEXT_1};

function createInitialBaseCss(): CustomCss {
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
      marginLeft: '0px',
      marginTop: '0px',
      marginRight: '0px',
      marginBottom: '0px',
      width: '40px',
      height: '38px',
      boxSizing: 'content-box',
      color: '#ffffff',
      fontSize: '14px',
      fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
      transition: 'unset',
    },
    [SUB_COMPONENT_CSS_MODES.HOVER]: {
      backgroundColor: '#ff0000',
    },
    [SUB_COMPONENT_CSS_MODES.CLICK]: {
      backgroundColor: '#409441',
    },
  }
}

function createLayerCss(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      height: '100%',
    },
  }
}

function createTextCss(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      top: '50%',
      width: 'auto',
      userSelect: 'none',
      overflow: 'unset',
      fontSize: '14px',
      fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
      backgroundColor: 'inherit',
      fontWeight: '400',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      marginLeft: '0px',
      marginRight: '0px',
    },
  }
}

function createInitialButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
  return new Set([JAVASCRIPT_CLASSES.RIPPLES])
}

function createAutoWidth(): AutoWidth {
  return {
    auto: true,
  };
}

function createAlignedLayerSection(section: ALIGNED_SECTION_TYPES): AlignedLayerSection {
  return { section };
}

function createDefaultButtonBaseCustomFeatures(): any {
  return {
    jsClasses: createInitialButtonJsClasses(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT),
  }
}

function createDefaultButtonCustomFeatures(): CustomFeatures {
  return {
    jsClasses: createInitialButtonJsClasses(),
    autoWidth: createAutoWidth(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER),
  }
}

// WORK2: types
function createSubcomponents(subcomponentNames: any): Subcomponents {
  return {
    [subcomponentNames.base]: {
      customCss: createInitialBaseCss(),
      initialCss: createInitialBaseCss(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      inheritedCss: inheritedButtonCss,
      subcomponentSpecificSettings: buttonSpecificSettings,
      customFeatures: createDefaultButtonBaseCustomFeatures(),
      defaultCustomFeatures: createDefaultButtonBaseCustomFeatures(),
    },
    [subcomponentNames.layer]: {
      customCss: createLayerCss(),
      initialCss: createLayerCss(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
    },
    [subcomponentNames.text]: {
      componentTag: 'div',
      componentText: 'button',
      customCss: createTextCss(),
      initialCss: createTextCss(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      customFeatures: createDefaultButtonCustomFeatures(),
      defaultCustomFeatures: createDefaultButtonCustomFeatures(),
    },
  }
}

// WORK2: Types
function generateImportedSubcomponentNames(importedSubcomponentBaseName: string, importedSubcomponentId: number): any {
  const spaces = new Array(importedSubcomponentId).join(' ');
  // WORK2: need a const prefix
  return { base: importedSubcomponentBaseName, layer: `Layer ${spaces}`, text: `Text  ${spaces}`};
}

export const defaultButton: ComponentGenerator = {
  createNewComponent(importedSubcomponentBaseName: string, importedSubcomponentId: number): any {
    // WORK2: need a type
    const subcomponentNames = importedSubcomponentBaseName
      ? generateImportedSubcomponentNames(importedSubcomponentBaseName, importedSubcomponentId)
      : defaultSubcomponentNames;
    const subcomponents = createSubcomponents(subcomponentNames);
    const subcomponentDropdownStructure = getButtonSubcomponentDropdownStructure(subcomponentNames);
    return {
      type: NEW_COMPONENT_TYPES.BUTTON,
      subcomponents,
      activeSubcomponentMode: SUB_COMPONENTS.BASE,
      defaultSubcomponentMode: SUB_COMPONENTS.BASE,
      componentPreviewStructure: PreviewStructure.createComponentPreviewStructure(subcomponentDropdownStructure, subcomponents, subcomponentNames),
      className: 'default-class-name',
      subcomponentNames,
    };
  },
};
