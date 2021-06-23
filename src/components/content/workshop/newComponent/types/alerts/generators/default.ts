import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { ImportedComponentGenerator } from '../../../../utils/importComponent/importedComponentGenerator';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { GENERAL_ANIMATION_CLOSE_TYPES } from '../../../../../../../consts/animationTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_STYLES } from '../../../../../../../consts/newComponentStyles.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { inheritedLayerBaseChildCss } from '../../shared/layer/inheritedBaseChildCss';
import PreviewStructure from '../../../../utils/componentGenerator/previewStructure';
import getAlertSubcomponentDropdownStructure from './subcomponentDropdownStructure';
import { inheritedLayerBaseCss } from '../../shared/layer/inheritedCss';
import { alertBaseSpecificSettings } from './alertBaseSpecificSettings';
import { closeButton } from '../../buttons/generators/closeButton';
import {
  AlignedLayerSection, AutoSize, CustomCss, CustomFeatures, Animations,
  WorkshopComponent, Text, CustomStaticFeatures, Subcomponents,
} from '../../../../../../../interfaces/workshopComponent';

function createDefaultAlertAnimationsProperties(): Animations {
  return {
    close: {
      type: GENERAL_ANIMATION_CLOSE_TYPES.FADE_OUT,
      duration: '0.25s',
    },
  };
}

function createDefaultBaseCustomFeatures(): CustomFeatures {
  return {
    animations: createDefaultAlertAnimationsProperties(),
  };
}

// all default css needs to be filled in as to be able to 'reset' correctly
function createDefaultBaseCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
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
      textAlign: 'left',
    },
  }
}

function createDefaultLayerCss(): CustomCss {
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
      backgroundColor: 'inherit',
      fontWeight: '400',
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      color: '#004085',
      textAlign: 'left',
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

function createAutoSize(): AutoSize {
  return {
    width: true,
  };
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
    subcomponentText: createText('button'),
  }
}

function createSubcomponents(): Subcomponents {
  return {
    [CORE_SUBCOMPONENTS_NAMES.BASE]: {
      subcomponentType: SUBCOMPONENT_TYPES.BASE,
      customCss: createDefaultBaseCss(),
      defaultCss: createDefaultBaseCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedLayerBaseCss,
      childCss: inheritedLayerBaseChildCss,
      subcomponentSpecificSettings: alertBaseSpecificSettings,
      customFeatures: createDefaultBaseCustomFeatures(),
      defaultCustomFeatures: createDefaultBaseCustomFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.LAYER_1]: {
      customCss: createDefaultLayerCss(),
      defaultCss: createDefaultLayerCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
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

export const defaultAlert: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    uniqueSubcomponentIdState.resetUniqueId();
    const importedCloseButtonName = CORE_SUBCOMPONENTS_NAMES.CLOSE;
    const subcomponents = { ...createSubcomponents(),
      ...ImportedComponentGenerator.createImportedComponentSubcomponents(closeButton, importedCloseButtonName)};
    const subcomponentDropdownStructure = getAlertSubcomponentDropdownStructure(subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT],
      ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedCloseButtonName));
    return {
      type: NEW_COMPONENT_TYPES.ALERT,
      style: NEW_COMPONENT_STYLES.DEFAULT,
      subcomponents,
      activeSubcomponentName: CORE_SUBCOMPONENTS_NAMES.BASE,
      defaultSubcomponentName: CORE_SUBCOMPONENTS_NAMES.BASE,
      componentPreviewStructure: PreviewStructure.createComponentPreviewStructure(subcomponentDropdownStructure, subcomponents),
      className: 'default-class-name',
      componentStatus: { isRemoved: false },
    }
  },
};
