import { AddNewImportedComponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewImportedComponent';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { ImportedComponentGenerator } from '../../../../utils/importComponent/importedComponentGenerator';
import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { GENERAL_ANIMATION_CLOSE_TYPES } from '../../../../../../../consts/animationTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { NEW_COMPONENT_STYLES } from '../../../../../../../consts/newComponentStyles.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { inheritedLayerBaseChildCss } from '../../shared/layer/inheritedBaseChildCss';
import { modalLayerBottomSpecificSettings } from './modalLayerBottomSpecificSettings';
import PreviewStructure from '../../../../utils/componentGenerator/previewStructure';
import getCardSubcomponentDropdownStructure from './subcomponentDropdownStructure';
import { modalLayerTopSpecificSettings } from './modalLayerTopSpecificSettings';
import { getCardBaseSpecificSettings } from './cardBaseSpecificSettings';
import { modalTextSpecificSettings } from './modalTextSpecificSettings';
import { inheritedLayerBaseCss } from '../../shared/layer/inheritedCss';
import { closeButton } from '../../buttons/properties/closeButton';
import { inheritedTextCss } from '../../shared/text/inheritedCss';
import { defaultImage } from '../../shared/images/default';
import {
  AlignedLayerSection, AutoSize, Text, CustomStaticFeatures, Image, SubcomponentProperties,
  CustomCss, CustomFeatures, Subcomponents, WorkshopComponent, Animations,
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

function createLayer1Image(): Image {
  return {
    name: null,
    data: null,
    size: true,
  }
}

function createDefaultLayer1CustomStaticFeatures(): CustomStaticFeatures {
  return {
    image: createLayer1Image(),
  };
}

function createAlignedLayerSection(section: ALIGNED_SECTION_TYPES): AlignedLayerSection {
  return { section };
}

function createAutoSize(): AutoSize {
  return {
    width: true,
    height: true,
  };
}

function createText(text: string): Text {
  return { text };
}

function createDefaultTextCustomFeatures(): CustomFeatures {
  return {
    autoSize: createAutoSize(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
  };
}

function createDefaultTextCustomStaticFeatures(text?: string): CustomStaticFeatures {
  return {
    subcomponentText: createText(text || 'text'),
  }
}

function createButtonBaseLastSelectedCssValues(): WorkshopComponentCss {
  return { left: '0px' };
}

function createDefaultAvatarCustomFeatures(): CustomFeatures {
  return {
    circleBorder: false,
    lastSelectedCssValues: createButtonBaseLastSelectedCssValues(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER),
  };
}

function createAvatarImage(): Image {
  return {
    name: 'default',
    data: defaultImage,
    size: true,
  }
}

function createDefaultAvatarCustomStaticFeatures(): CustomStaticFeatures {
  return {
    image: createAvatarImage(),
  }
}

function createDefaultBaseCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
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

function createDefaultLayer1Css(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
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
      backgroundSize: '100% 100%',
    },
  };
}

function createDefaultLayer2Css(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
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

function createDefaultBottomLayerCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
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

function createDefaultAvatarCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      borderRadius: '0px',
      borderWidth: '0px',
      borderColor: '#1779ba',
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
      transition: 'unset',
      top: '50%',
      left: '0px',
      backgroundSize: '100% 100%',
    },
  };
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
      customFeatures: createDefaultBaseCustomFeatures(),
      defaultCustomFeatures: createDefaultBaseCustomFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.LAYER_1]: {
      subcomponentType: SUBCOMPONENT_TYPES.LAYER_1,
      customCss: createDefaultLayer1Css(),
      defaultCss: createDefaultLayer1Css(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentSpecificSettings: modalLayerTopSpecificSettings,
      customStaticFeatures: createDefaultLayer1CustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultLayer1CustomStaticFeatures(),
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
    },
    [CORE_SUBCOMPONENTS_NAMES.LAYER_2]: {
      subcomponentType: SUBCOMPONENT_TYPES.LAYER_2,
      customCss: createDefaultLayer2Css(),
      defaultCss: createDefaultLayer2Css(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
    },
    [CORE_SUBCOMPONENTS_NAMES.LAYER_3]: {
      subcomponentType: SUBCOMPONENT_TYPES.LAYER_3,
      customCss: createDefaultBottomLayerCss(),
      defaultCss: createDefaultBottomLayerCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentSpecificSettings: modalLayerBottomSpecificSettings,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
    },
    [CORE_SUBCOMPONENTS_NAMES.AVATAR]: {
      subcomponentType: SUBCOMPONENT_TYPES.AVATAR,
      customCss: createDefaultAvatarCss(),
      defaultCss: createDefaultAvatarCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
      customFeatures: createDefaultAvatarCustomFeatures(),
      defaultCustomFeatures: createDefaultAvatarCustomFeatures(),
      customStaticFeatures: createDefaultAvatarCustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultAvatarCustomStaticFeatures(),
    },
  };
}

function createDefaultModalTitleCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      top: '50%',
      width: 'max-content',
      fontWeight: '500',
      fontSize: '20px',
      fontFamily: '"Poppins", sans-serif',
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
    },
  };
}

function overwriteImportedTitleProperties(subcomponents: Subcomponents, subcomponentNames: CustomSubcomponentNames): void {
  subcomponents[subcomponentNames.base].customCss = createDefaultModalTitleCss();
  subcomponents[subcomponentNames.base].defaultCss = createDefaultModalTitleCss();
  subcomponents[subcomponentNames.base].customFeatures = createDefaultTextCustomFeatures();
  subcomponents[subcomponentNames.base].defaultCustomFeatures = createDefaultTextCustomFeatures();
  subcomponents[subcomponentNames.base].customStaticFeatures = createDefaultTextCustomStaticFeatures('Modal title');
  subcomponents[subcomponentNames.base].defaultCustomStaticFeatures = createDefaultTextCustomStaticFeatures('Modal title');
}

function overwriteImportedDescriptionProperties(subcomponents: Subcomponents, subcomponentNames: CustomSubcomponentNames): void {
  subcomponents[subcomponentNames.base].customStaticFeatures = createDefaultTextCustomStaticFeatures('Description');
  subcomponents[subcomponentNames.base].defaultCustomStaticFeatures = createDefaultTextCustomStaticFeatures('Description');
}

function overwriteImportedSubmitButtonProperties(subcomponents: Subcomponents, subcomponentNames: CustomSubcomponentNames): void {
  subcomponents[subcomponentNames.base].customFeatures.alignedLayerSection = createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
  subcomponents[subcomponentNames.base].defaultCustomFeatures.alignedLayerSection = createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
  subcomponents[subcomponentNames.text].customStaticFeatures = createDefaultTextCustomStaticFeatures('Submit');
  subcomponents[subcomponentNames.text].customStaticFeatures = createDefaultTextCustomStaticFeatures('Submit');
}

function overwriteImportedCancelButtonProperties(subcomponents: Subcomponents, subcomponentNames: CustomSubcomponentNames): void {
  subcomponents[subcomponentNames.base].customFeatures.alignedLayerSection = createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
  subcomponents[subcomponentNames.base].defaultCustomFeatures.alignedLayerSection = createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT);
  subcomponents[subcomponentNames.text].customStaticFeatures = createDefaultTextCustomStaticFeatures('Cancel');
  subcomponents[subcomponentNames.text].customStaticFeatures = createDefaultTextCustomStaticFeatures('Cancel');
}

function createDefaultTextCss(): CustomCss {
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
    },
  };
}

// WORK1: allow this to be reusable for all componennts
const createNewSubcomponent = (subcomponentType: SUBCOMPONENT_TYPES): SubcomponentProperties => {
  switch (subcomponentType) {
    case (SUBCOMPONENT_TYPES.SECTION_TEXT):
      return {
        subcomponentType: SUBCOMPONENT_TYPES.SECTION_TEXT,
        customCss: createDefaultTextCss(),
        defaultCss: createDefaultTextCss(),
        inheritedCss: inheritedTextCss,
        activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
        defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
        subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
        subcomponentSpecificSettings: modalTextSpecificSettings,
        customFeatures: createDefaultTextCustomFeatures(),
        defaultCustomFeatures: createDefaultTextCustomFeatures(),
        customStaticFeatures: createDefaultTextCustomStaticFeatures(),
        defaultCustomStaticFeatures: createDefaultTextCustomStaticFeatures(),
      }
    case (SUBCOMPONENT_TYPES.LAYER_3):
      return {
        subcomponentType: SUBCOMPONENT_TYPES.LAYER_3,
        customCss: createDefaultBottomLayerCss(),
        defaultCss: createDefaultBottomLayerCss(),
        activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
        defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
        subcomponentSpecificSettings: modalLayerBottomSpecificSettings,
        layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
        subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
      }
    default:
      return undefined;
  }
}

export const defaultCard: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    uniqueSubcomponentIdState.resetUniqueId();
    const importedCloseButtonName = CORE_SUBCOMPONENTS_NAMES.CLOSE;
    const subcomponents = { ...createSubcomponents(),
      ...ImportedComponentGenerator.createImportedComponentSubcomponents(closeButton, importedCloseButtonName),
    };
    const subcomponentDropdownStructure = getCardSubcomponentDropdownStructure(subcomponents[CORE_SUBCOMPONENTS_NAMES.AVATAR],
      subcomponents[CORE_SUBCOMPONENTS_NAMES.LAYER_2], subcomponents[CORE_SUBCOMPONENTS_NAMES.LAYER_3],
      ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedCloseButtonName),
    );
    subcomponents[CORE_SUBCOMPONENTS_NAMES.BASE].subcomponentSpecificSettings = getCardBaseSpecificSettings(
      subcomponents[importedCloseButtonName], subcomponents[CORE_SUBCOMPONENTS_NAMES.AVATAR]);
    const defaultCardComponent = {
      type: NEW_COMPONENT_TYPES.CARD,
      style: NEW_COMPONENT_STYLES.DEFAULT,
      subcomponents,
      activeSubcomponentName: CORE_SUBCOMPONENTS_NAMES.BASE,
      defaultSubcomponentName: CORE_SUBCOMPONENTS_NAMES.BASE,
      componentPreviewStructure: PreviewStructure.createComponentPreviewStructure(subcomponentDropdownStructure, subcomponents),
      className: 'default-class-name',
      componentStatus: { isRemoved: false },
    };
    AddNewImportedComponent.add(defaultCardComponent, SUBCOMPONENT_TYPES.TEXT, CORE_SUBCOMPONENTS_NAMES.LAYER_1, overwriteImportedTitleProperties);
    AddNewImportedComponent.add(defaultCardComponent, SUBCOMPONENT_TYPES.TEXT, CORE_SUBCOMPONENTS_NAMES.LAYER_2, overwriteImportedDescriptionProperties);
    AddNewImportedComponent.add(defaultCardComponent, SUBCOMPONENT_TYPES.BUTTON, CORE_SUBCOMPONENTS_NAMES.LAYER_3, overwriteImportedSubmitButtonProperties);
    AddNewImportedComponent.add(defaultCardComponent, SUBCOMPONENT_TYPES.BUTTON, CORE_SUBCOMPONENTS_NAMES.LAYER_3, overwriteImportedCancelButtonProperties);
    return defaultCardComponent;
  },
  createNewSubcomponent: createNewSubcomponent,
}
