import { AlignedLayerSection, AutoSize, CustomCss, CustomFeatures, Subcomponents, WorkshopComponent, Text, CustomStaticFeatures } from '../../../../../../../interfaces/workshopComponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { modalTextSpecificSettings } from '../../modals/properties/modalTextSpecificSettings';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_STYLES } from '../../../../../../../consts/newComponentStyles.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import PreviewStructure from '../../../../utils/componentGenerator/previewStructure';
import ReferenceSharingUtils from '../../buttons/properties/referenceSharingUtils';
import getTextSubcomponentDropdownStructure from './subcomponentDropdownStructure';
import { inheritedTextCss } from '../../shared/text/inheritedCss';

const defaultSubcomponentNames: CustomSubcomponentNames = {
  base: CORE_SUBCOMPONENTS_NAMES.TEXT,
};

function createTextCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      top: '50%',
      width: 'max-content',
      fontWeight: '400',
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      color: '#004085',
      textAlign: 'left',
      backgroundColor: 'inherit',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      marginLeft: '0px',
      marginRight: '0px',
      height: '',
      borderWidth: '0',
      borderColor: '#1779ba',
      borderStyle: 'solid',
      borderRightWidth: '0px',
      borderLeftWidth: '0px',
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
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
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
      customCss: createTextCss(),
      defaultCss: createTextCss(),
      inheritedCss: inheritedTextCss,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentSpecificSettings: modalTextSpecificSettings,
      customFeatures: createDefaultTextCustomFeatures(),
      defaultCustomFeatures: createDefaultTextCustomFeatures(),
      customStaticFeatures: createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultTextCustomStaticFeatures(),
    },
  };
}

export const defaultText: ComponentGenerator = {
  createNewComponent(importedComponentBaseName: string): WorkshopComponent {
    const subcomponentNames = importedComponentBaseName ? { base: importedComponentBaseName } : defaultSubcomponentNames;
    const subcomponents = createSubcomponents(subcomponentNames);
    const subcomponentDropdownStructure = getTextSubcomponentDropdownStructure(subcomponentNames);
    return {
      type: NEW_COMPONENT_TYPES.TEXT,
      style: NEW_COMPONENT_STYLES.DEFAULT,
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
