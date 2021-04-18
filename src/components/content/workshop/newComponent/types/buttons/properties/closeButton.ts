import { AlignedLayerSection, AutoWidth, CustomCss, CustomFeatures, Subcomponents, WorkshopComponent, Text } from '../../../../../../../interfaces/workshopComponent';
import ImportedSubcomponentProperties from '../../../../utils/importSubcomponent/importedSubcomponentProperties';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import PreviewStructure from '../../../../utils/componentGenerator/previewStructure';
import getButtonSubcomponentDropdownStructure from './subcomponentDropdownStructure';
import { CLOSE_BUTTON_X_TEXT } from '../../../../../../../consts/closeButtonXText';
import { buttonSpecificSettings } from './buttonSpecificSettings';
import { inheritedCloseTextCss } from './inheritedCloseTextCss';
import { inheritedButtonCss } from './inheritedCss';

const defaultSubcomponentNames: CustomSubcomponentNames = {
  base: CORE_SUBCOMPONENTS_NAMES.BASE, layer: CORE_SUBCOMPONENTS_NAMES.LAYER_1, text: CORE_SUBCOMPONENTS_NAMES.TEXT_1,
};

function createDefaultBaseCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      height: '18px',
      width: '17px',
      borderRadius: '15px',
      cursor: 'pointer',
      boxSizing: 'unset',
      boxShadow: 'unset',
      borderWidth: '0px',
      borderStyle: 'solid',
      borderColor: '#000000',
      backgroundColor: 'inherit',
      outline: 'none',
      paddingTop: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingBottom: '0px',
      marginRight: '5px',
      transition: 'unset',
    }
  }
}

function createLayerCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      height: '100%',
    },
  }
}

function createTextCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      top: '50%',
      width: 'auto',
      color: '#ff0000',
      userSelect: 'none',
      overflow: 'unset',
      fontSize: '18px',
      fontFamily: '"Poppins", sans-serif',
      backgroundColor: 'inherit',
      fontWeight: '300',
      paddingTop: '1px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      marginLeft: '0px',
      marginRight: '0px',
    },
  }
}

function createDefaultButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
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

function createDefaultButtonBaseCustomFeatures(): CustomFeatures {
  return {
    jsClasses: createDefaultButtonJsClasses(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT),
  }
}

function createText(text: string): Text {
  return { text };
}

function createDefaultLayerCustomFeatures(): CustomFeatures {
  return {
    jsClasses: createDefaultButtonJsClasses(),
  }
}

function createDefaultTextCustomFeatures(): CustomFeatures {
  return {
    subcomponentText: createText(CLOSE_BUTTON_X_TEXT),
    jsClasses: createDefaultButtonJsClasses(),
    autoWidth: createAutoWidth(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER),
  }
}

function createSubcomponents(subcomponentNames: CustomSubcomponentNames): Subcomponents {
  return {
    [subcomponentNames.base]: {
      subcomponentType: SUBCOMPONENT_TYPES.BUTTON,
      customCss: createDefaultBaseCss(),
      defaultCss: createDefaultBaseCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      inheritedCss: inheritedButtonCss,
      subcomponentSpecificSettings: buttonSpecificSettings,
      customFeatures: createDefaultButtonBaseCustomFeatures(),
      defaultCustomFeatures: createDefaultButtonBaseCustomFeatures(),
    },
    [subcomponentNames.layer]: {
      customCss: createLayerCss(),
      defaultCss: createLayerCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
      customFeatures: createDefaultLayerCustomFeatures(),
      defaultCustomFeatures: createDefaultLayerCustomFeatures(),
    },
    [subcomponentNames.text]: {
      subcomponentType: SUBCOMPONENT_TYPES.BUTTON_TEXT,
      componentTag: 'div',
      customCss: createTextCss(),
      defaultCss: createTextCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedCloseTextCss,
      customFeatures: createDefaultTextCustomFeatures(),
      defaultCustomFeatures: createDefaultTextCustomFeatures(),
    },
  }
}

export const closeButton: ComponentGenerator = {
  createNewComponent(importedSubcomponentBaseName: string, importedSubcomponentId: number): WorkshopComponent {
    const subcomponentNames = importedSubcomponentBaseName
      ? ImportedSubcomponentProperties.generateImportedSubcomponentNames(importedSubcomponentBaseName, importedSubcomponentId)
      : defaultSubcomponentNames;
    const subcomponents = createSubcomponents(subcomponentNames);
    const subcomponentDropdownStructure = getButtonSubcomponentDropdownStructure(subcomponentNames);
    return {
      type: NEW_COMPONENT_TYPES.BUTTON,
      subcomponents,
      activeSubcomponentName: subcomponentNames.base,
      defaultSubcomponentName: subcomponentNames.base,
      componentPreviewStructure: PreviewStructure.createComponentPreviewStructure(subcomponentDropdownStructure, subcomponents, subcomponentNames),
      className: 'default-class-name',
      subcomponentNames,
      componentStatus: { isRemoved: false },
    };
  },
};
