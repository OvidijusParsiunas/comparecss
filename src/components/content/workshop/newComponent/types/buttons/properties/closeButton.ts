import { AlignedLayerSection, AutoSize, CustomCss, CustomFeatures, Subcomponents, WorkshopComponent, Text, CustomStaticFeatures } from '../../../../../../../interfaces/workshopComponent';
import { ImportedComponentGenerator } from '../../../../utils/workshopImportComponent/importedComponentGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import PreviewStructure from '../../../../utils/componentGenerator/previewStructure';
import getButtonSubcomponentDropdownStructure from './subcomponentDropdownStructure';
import { CLOSE_BUTTON_X_TEXT } from '../../../../../../../consts/closeButtonXText';
import { buttonSpecificSettings } from './buttonSpecificSettings';
import { inheritedCloseTextCss } from './inheritedCloseTextCss';
import ReferenceSharingUtils from './referenceSharingUtils';
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
      left: '0px',
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
      width: 'max-content',
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

function createAutoSize(): AutoSize {
  return {
    width: true,
  };
}

function createAlignedLayerSection(section: ALIGNED_SECTION_TYPES): AlignedLayerSection {
  return { section };
}

function createDefaultButtonBaseCustomFeatures(): CustomFeatures {
  return {
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT),
  }
}
function createDefaultTextCustomFeatures(): CustomFeatures {
  return {
    autoSize: createAutoSize(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER),
  }
}

function createText(text: string): Text {
  return { text };
}

function createDefaultTextCustomStaticFeatures(): CustomStaticFeatures {
  return {
    subcomponentText: createText(CLOSE_BUTTON_X_TEXT),
  }
}

function createSubcomponents(subcomponentNames: CustomSubcomponentNames): Subcomponents {
  return {
    [subcomponentNames.base]: {
      subcomponentType: SUBCOMPONENT_TYPES.CLOSE_BUTTON,
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
    },
    [subcomponentNames.text]: {
      subcomponentType: SUBCOMPONENT_TYPES.CLOSE_BUTTON_TEXT,
      componentTag: 'div',
      customCss: createTextCss(),
      defaultCss: createTextCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedCloseTextCss,
      customFeatures: createDefaultTextCustomFeatures(),
      defaultCustomFeatures: createDefaultTextCustomFeatures(),
      customStaticFeatures: createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultTextCustomStaticFeatures(),
    },
  }
}

export const closeButton: ComponentGenerator = {
  createNewComponent(importedComponentBaseName: string, importedComponentId: number): WorkshopComponent {
    const subcomponentNames = importedComponentBaseName
      ? ImportedComponentGenerator.generateImportedComponentNames(importedComponentBaseName, importedComponentId)
      : defaultSubcomponentNames;
    const subcomponents = createSubcomponents(subcomponentNames);
    ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents(subcomponents, subcomponentNames);
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
      referenceSharingExecutables: [ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents],
    };
  },
};
