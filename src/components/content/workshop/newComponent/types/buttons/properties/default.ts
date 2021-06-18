import { AlignedLayerSection, AutoSize, CustomCss, CustomFeatures, Subcomponents, WorkshopComponent, Text, CustomStaticFeatures } from '../../../../../../../interfaces/workshopComponent';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { ImportedComponentGenerator } from '../../../../utils/importComponent/importedComponentGenerator';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import PreviewStructure from '../../../../utils/componentGenerator/previewStructure';
import getButtonSubcomponentDropdownStructure from './subcomponentDropdownStructure';
import { buttonSpecificSettings } from './buttonSpecificSettings';
import ReferenceSharingUtils from './referenceSharingUtils';
import { inheritedButtonCss } from './inheritedCss';

const defaultSubcomponentNames: CustomSubcomponentNames = {
  base: CORE_SUBCOMPONENTS_NAMES.BASE, layer: CORE_SUBCOMPONENTS_NAMES.LAYER_1, text: CORE_SUBCOMPONENTS_NAMES.TEXT,
};

function createDefaultBaseCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
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
    [CSS_PSEUDO_CLASSES.HOVER]: {
      backgroundColor: '#ff0000',
    },
    [CSS_PSEUDO_CLASSES.CLICK]: {
      backgroundColor: '#409441',
    },
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

function createDefaultTextCustomStaticFeatures(subcomponentText?: string): CustomStaticFeatures {
  return {
    subcomponentText: createText(subcomponentText || 'button'),
  }
}

function createSubcomponents(subcomponentNames: CustomSubcomponentNames, subcomponentText?: string): Subcomponents {
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
      triggerableSubcomponentName: subcomponentNames.text,
    },
    [subcomponentNames.layer]: {
      customCss: createLayerCss(),
      defaultCss: createLayerCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
    },
    [subcomponentNames.text]: {
      subcomponentType: SUBCOMPONENT_TYPES.BUTTON_TEXT,
      customCss: createTextCss(),
      defaultCss: createTextCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      customFeatures: createDefaultTextCustomFeatures(),
      defaultCustomFeatures: createDefaultTextCustomFeatures(),
      customStaticFeatures: createDefaultTextCustomStaticFeatures(subcomponentText),
      defaultCustomStaticFeatures: createDefaultTextCustomStaticFeatures(subcomponentText),
    },
  }
}

function createSubcomponents2(subcomponentproperties: any): Subcomponents {
  return {
    [subcomponentproperties.base.name]: {
      subcomponentType: SUBCOMPONENT_TYPES.BUTTON,
      customCss: subcomponentproperties.base.customCss || createDefaultBaseCss(),
      defaultCss: subcomponentproperties.base.customCss || createDefaultBaseCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      inheritedCss: inheritedButtonCss,
      subcomponentSpecificSettings: buttonSpecificSettings,
      customFeatures: subcomponentproperties.base.customFeatures || createDefaultButtonBaseCustomFeatures(),
      defaultCustomFeatures: subcomponentproperties.base.customFeatures || createDefaultButtonBaseCustomFeatures(),
      triggerableSubcomponentName: subcomponentproperties.text.name,
    },
    [subcomponentproperties.layer.name]: {
      customCss: subcomponentproperties.layer.customCss || createLayerCss(),
      defaultCss: subcomponentproperties.layer.customCss || createLayerCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
    },
    [subcomponentproperties.text.name]: {
      subcomponentType: SUBCOMPONENT_TYPES.BUTTON_TEXT,
      customCss: subcomponentproperties.text.customCss || createTextCss(),
      defaultCss: subcomponentproperties.text.customCss || createTextCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      customFeatures: subcomponentproperties.text.customFeatures || createDefaultTextCustomFeatures(),
      defaultCustomFeatures: subcomponentproperties.text.customFeatures || createDefaultTextCustomFeatures(),
      customStaticFeatures: subcomponentproperties.text.customStaticFeatures || createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: subcomponentproperties.text.customStaticFeatures || createDefaultTextCustomStaticFeatures(),
    },
  }
}

// the complecity is within the setup itself
function createSubcomponents3(subcomponentNames: CustomSubcomponentNames, overwrittenProperties: any): Subcomponents {
  return {
    [subcomponentNames.base]: {
      subcomponentType: SUBCOMPONENT_TYPES.BUTTON,
      customCss: overwrittenProperties[subcomponentNames.base].customCss || createDefaultBaseCss(),
      defaultCss: overwrittenProperties[subcomponentNames.base].customCss || createDefaultBaseCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      inheritedCss: inheritedButtonCss,
      subcomponentSpecificSettings: buttonSpecificSettings,
      customFeatures: createDefaultButtonBaseCustomFeatures(),
      defaultCustomFeatures: createDefaultButtonBaseCustomFeatures(),
      triggerableSubcomponentName: subcomponentNames.text,
    },
    [subcomponentNames.layer]: {
      customCss: createLayerCss(),
      defaultCss: createLayerCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
    },
    [subcomponentNames.text]: {
      subcomponentType: SUBCOMPONENT_TYPES.BUTTON_TEXT,
      customCss: createTextCss(),
      defaultCss: createTextCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      customFeatures: createDefaultTextCustomFeatures(),
      defaultCustomFeatures: createDefaultTextCustomFeatures(),
      customStaticFeatures: createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultTextCustomStaticFeatures(),
    },
  }
}

export const defaultButton: ComponentGenerator = {
  createNewComponent(importedComponentBaseName: string, subcomponentText?: string): WorkshopComponent {
    const subcomponentNames = importedComponentBaseName
      ? ImportedComponentGenerator.generateImportedComponentNames(importedComponentBaseName)
      : defaultSubcomponentNames;
    const subcomponents = createSubcomponents(subcomponentNames, subcomponentText);
    ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents(subcomponents, subcomponentNames);
    ReferenceSharingUtils.appendBaseSubcomponentRefToAllChildSubcomponents(subcomponents, subcomponentNames);
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
