import { AlignedLayerSection, AutoSize, CustomCss, CustomFeatures, Subcomponents, WorkshopComponent, Text, CustomStaticFeatures } from '../../../../../../../interfaces/workshopComponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_STYLES } from '../../../../../../../consts/newComponentStyles.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import PreviewStructure from '../../../../utils/componentGenerator/previewStructure';
import getTextSubcomponentDropdownStructure from './subcomponentDropdownStructure';

const defaultSubcomponentNames: CustomSubcomponentNames = {
  base: CORE_SUBCOMPONENTS_NAMES.TEXT,
};

function createDefaultTextCss(): CustomCss {
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
      transition: 'unset',
      outline: 'none',
      left: '0px',
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

function createDefaultTextCustomFeatures(): CustomFeatures {
  return {
    autoSize: createAutoSize(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER),
  };
}

function createText(text: string): Text {
  return { text };
}

function createDefaultTextCustomStaticFeatures(): CustomStaticFeatures {
  return {
    subcomponentText: createText('Text'),
  };
}

function createSubcomponents(subcomponentNames: CustomSubcomponentNames): Subcomponents {
  return {
    [subcomponentNames.base]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      customCss: createDefaultTextCss(),
      defaultCss: createDefaultTextCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      customFeatures: createDefaultTextCustomFeatures(),
      defaultCustomFeatures: createDefaultTextCustomFeatures(),
      customStaticFeatures: createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultTextCustomStaticFeatures(),
    },
  };
}

export const buttonText: ComponentGenerator = {
  createNewComponent(importedComponentBaseName: string): WorkshopComponent {
    const subcomponentNames = importedComponentBaseName ? { base: importedComponentBaseName } : defaultSubcomponentNames;
    const subcomponents = createSubcomponents(subcomponentNames);
    const subcomponentDropdownStructure = getTextSubcomponentDropdownStructure(subcomponentNames);
    return {
      type: NEW_COMPONENT_TYPES.TEXT,
      style: NEW_COMPONENT_STYLES.TEXT_BUTTON,
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
