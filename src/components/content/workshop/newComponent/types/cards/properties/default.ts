import { ImportedComponentGenerator } from '../../../../utils/workshopImportComponent/importedComponentGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { GENERAL_ANIMATION_CLOSE_TYPES } from '../../../../../../../consts/animationTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { inheritedLayerBaseChildCss } from '../../shared/layer/inheritedBaseChildCss';
import { modalLayerBottomSpecificSettings } from './modalLayerBottomSpecificSettings';
import PreviewStructure from '../../../../utils/componentGenerator/previewStructure';
import getCardSubcomponentDropdownStructure from './subcomponentDropdownStructure';
import { modalLayerTopSpecificSettings } from './modalLayerTopSpecificSettings';
import { modalTextSpecificSettings } from './modalTextSpecificSettings';
import { modalBaseSpecificSettings } from './modalBaseSpecificSettings';
import { inheritedLayerBaseCss } from '../../shared/layer/inheritedCss';
import { closeButton } from '../../buttons/properties/closeButton';
import { inheritedTextCss } from '../../shared/text/inheritedCss';
import { defaultButton } from '../../buttons/properties/default';
import { defaultImage } from '../../shared/images/default';
import {
  CustomCss, CustomFeatures, Subcomponents, WorkshopComponent, Animations,
  AlignedLayerSection, AutoSize, Text, CustomStaticFeatures, Image,
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

function createDefaultText1CustomFeatures(): CustomFeatures {
  return {
    autoSize: createAutoSize(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
  };
}

function createText(text: string): Text {
  return { text };
}

function createDefaultText1CustomStaticFeatures(): CustomStaticFeatures {
  return {
    subcomponentText: createText('Modal title'),
  }
}

function createDefaultText2CustomFeatures(): CustomFeatures {
  return {
    autoSize: createAutoSize(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
  };
}

function createDefaultText2CustomStaticFeatures(): CustomStaticFeatures {
  return {
    subcomponentText: createText('Modal body text'),
  }
}

function createDefaultAvatarCustomFeatures(): CustomFeatures {
  return {
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

function createDefaultLayer3Css(): CustomCss {
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

function createDefaultText1Css(): CustomCss {
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

function createDefaultText2Css(): CustomCss {
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
      subcomponentSpecificSettings: modalBaseSpecificSettings,
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
      customCss: createDefaultLayer3Css(),
      defaultCss: createDefaultLayer3Css(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentSpecificSettings: modalLayerBottomSpecificSettings,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT_1]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      componentTag: 'div',
      customCss: createDefaultText1Css(),
      defaultCss: createDefaultText1Css(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedTextCss,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
      subcomponentSpecificSettings: modalTextSpecificSettings,
      customFeatures: createDefaultText1CustomFeatures(),
      defaultCustomFeatures: createDefaultText1CustomFeatures(),
      customStaticFeatures: createDefaultText1CustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultText1CustomStaticFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT_2]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      componentTag: 'div',
      customCss: createDefaultText2Css(),
      defaultCss: createDefaultText2Css(),
      inheritedCss: inheritedTextCss,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
      subcomponentSpecificSettings: modalTextSpecificSettings,
      customFeatures: createDefaultText2CustomFeatures(),
      defaultCustomFeatures: createDefaultText2CustomFeatures(),
      customStaticFeatures: createDefaultText2CustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultText2CustomStaticFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.AVATAR]: {
      subcomponentType: SUBCOMPONENT_TYPES.AVATAR,
      componentTag: 'div',
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

export const defaultCard: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    const importedCloseButtonName = CORE_SUBCOMPONENTS_NAMES.CLOSE;
    const importedButton1Name = CORE_SUBCOMPONENTS_NAMES.BUTTON_1;
    const importedButton2Name = CORE_SUBCOMPONENTS_NAMES.BUTTON_2;
    const subcomponents = { ...createSubcomponents(),
      ...ImportedComponentGenerator.createImportedComponents(closeButton, importedCloseButtonName, 1),
      ...ImportedComponentGenerator.createImportedComponents(defaultButton, importedButton1Name, 2, 'Submit'),
      ...ImportedComponentGenerator.createImportedComponents(defaultButton, importedButton2Name, 3, 'Cancel') };
    const subcomponentDropdownStructure = getCardSubcomponentDropdownStructure(subcomponents[CORE_SUBCOMPONENTS_NAMES.AVATAR],
      subcomponents[CORE_SUBCOMPONENTS_NAMES.LAYER_2], subcomponents[CORE_SUBCOMPONENTS_NAMES.LAYER_3],
      subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT_1], subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT_2],
      ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedCloseButtonName),
      ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedButton1Name),
      ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedButton2Name),
    );
    return {
      type: NEW_COMPONENT_TYPES.CARD,
      subcomponents,
      activeSubcomponentName: CORE_SUBCOMPONENTS_NAMES.BASE,
      defaultSubcomponentName: CORE_SUBCOMPONENTS_NAMES.BASE,
      componentPreviewStructure: PreviewStructure.createComponentPreviewStructure(subcomponentDropdownStructure, subcomponents),
      className: 'default-class-name',
      componentStatus: { isRemoved: false },
    };
  },
}
