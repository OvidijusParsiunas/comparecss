import { ImportedComponentGenerator } from '../../../../utils/workshopImportComponent/importedComponentGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { GENERAL_ANIMATION_CLOSE_TYPES } from '../../../../../../../consts/animationTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
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

function createDefaultNoSiblingTextCustomFeatures(): CustomFeatures {
  return {
    autoSize: createAutoSize(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
  };
}

function createText(text: string): Text {
  return { text };
}

function createDefaultNoSiblingTextCustomStaticFeatures(): CustomStaticFeatures {
  return {
    subcomponentText: createText('Modal title'),
  }
}

function createDefaultText1CustomFeatures(): CustomFeatures {
  return {
    autoSize: createAutoSize(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
  };
}

function createDefaultText2CustomFeatures(): CustomFeatures {
  return {
    autoSize: createAutoSize(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER),
  };
}

function createDefaultText3CustomFeatures(): CustomFeatures {
  return {
    autoSize: createAutoSize(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT),
  };
}

function createDefaultTextCustomStaticFeatures(): CustomStaticFeatures {
  return {
    subcomponentText: createText('text'),
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

function createDefaultNoSiblingTextCss(): CustomCss {
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
    [CORE_SUBCOMPONENTS_NAMES.LAYER_4]: {
      subcomponentType: SUBCOMPONENT_TYPES.LAYER_3,
      customCss: createDefaultBottomLayerCss(),
      defaultCss: createDefaultBottomLayerCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentSpecificSettings: modalLayerBottomSpecificSettings,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(false),
    },
    [CORE_SUBCOMPONENTS_NAMES.NO_SIBLING_TEXT_1]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      componentTag: 'div',
      customCss: createDefaultNoSiblingTextCss(),
      defaultCss: createDefaultNoSiblingTextCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedTextCss,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
      subcomponentSpecificSettings: modalTextSpecificSettings,
      customFeatures: createDefaultNoSiblingTextCustomFeatures(),
      defaultCustomFeatures: createDefaultNoSiblingTextCustomFeatures(),
      customStaticFeatures: createDefaultNoSiblingTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultNoSiblingTextCustomStaticFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT_1_LAYER_2]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      componentTag: 'div',
      customCss: createDefaultTextCss(),
      defaultCss: createDefaultTextCss(),
      inheritedCss: inheritedTextCss,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
      subcomponentSpecificSettings: modalTextSpecificSettings,
      customFeatures: createDefaultText1CustomFeatures(),
      defaultCustomFeatures: createDefaultText1CustomFeatures(),
      customStaticFeatures: createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultTextCustomStaticFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT_2_LAYER_2]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      componentTag: 'div',
      customCss: createDefaultTextCss(),
      defaultCss: createDefaultTextCss(),
      inheritedCss: inheritedTextCss,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(false),
      subcomponentSpecificSettings: modalTextSpecificSettings,
      customFeatures: createDefaultText2CustomFeatures(),
      defaultCustomFeatures: createDefaultText2CustomFeatures(),
      customStaticFeatures: createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultTextCustomStaticFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT_3_LAYER_2]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      componentTag: 'div',
      customCss: createDefaultTextCss(),
      defaultCss: createDefaultTextCss(),
      inheritedCss: inheritedTextCss,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(false),
      subcomponentSpecificSettings: modalTextSpecificSettings,
      customFeatures: createDefaultText3CustomFeatures(),
      defaultCustomFeatures: createDefaultText3CustomFeatures(),
      customStaticFeatures: createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultTextCustomStaticFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT_1_LAYER_3]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      componentTag: 'div',
      customCss: createDefaultTextCss(),
      defaultCss: createDefaultTextCss(),
      inheritedCss: inheritedTextCss,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(false),
      subcomponentSpecificSettings: modalTextSpecificSettings,
      customFeatures: createDefaultText1CustomFeatures(),
      defaultCustomFeatures: createDefaultText1CustomFeatures(),
      customStaticFeatures: createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultTextCustomStaticFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT_2_LAYER_3]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      componentTag: 'div',
      customCss: createDefaultTextCss(),
      defaultCss: createDefaultTextCss(),
      inheritedCss: inheritedTextCss,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(false),
      subcomponentSpecificSettings: modalTextSpecificSettings,
      customFeatures: createDefaultText2CustomFeatures(),
      defaultCustomFeatures: createDefaultText2CustomFeatures(),
      customStaticFeatures: createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultTextCustomStaticFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT_3_LAYER_3]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      componentTag: 'div',
      customCss: createDefaultTextCss(),
      defaultCss: createDefaultTextCss(),
      inheritedCss: inheritedTextCss,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(false),
      subcomponentSpecificSettings: modalTextSpecificSettings,
      customFeatures: createDefaultText3CustomFeatures(),
      defaultCustomFeatures: createDefaultText3CustomFeatures(),
      customStaticFeatures: createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultTextCustomStaticFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT_1_LAYER_4]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      componentTag: 'div',
      customCss: createDefaultTextCss(),
      defaultCss: createDefaultTextCss(),
      inheritedCss: inheritedTextCss,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(false),
      subcomponentSpecificSettings: modalTextSpecificSettings,
      customFeatures: createDefaultText1CustomFeatures(),
      defaultCustomFeatures: createDefaultText1CustomFeatures(),
      customStaticFeatures: createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultTextCustomStaticFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT_2_LAYER_4]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      componentTag: 'div',
      customCss: createDefaultTextCss(),
      defaultCss: createDefaultTextCss(),
      inheritedCss: inheritedTextCss,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(false),
      subcomponentSpecificSettings: modalTextSpecificSettings,
      customFeatures: createDefaultText2CustomFeatures(),
      defaultCustomFeatures: createDefaultText2CustomFeatures(),
      customStaticFeatures: createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultTextCustomStaticFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT_3_LAYER_4]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      componentTag: 'div',
      customCss: createDefaultTextCss(),
      defaultCss: createDefaultTextCss(),
      inheritedCss: inheritedTextCss,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(false),
      subcomponentSpecificSettings: modalTextSpecificSettings,
      customFeatures: createDefaultText3CustomFeatures(),
      defaultCustomFeatures: createDefaultText3CustomFeatures(),
      customStaticFeatures: createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultTextCustomStaticFeatures(),
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
    const importedButtonLayer1Name = CORE_SUBCOMPONENTS_NAMES.NO_SIBLING_BUTTON;
    const importedButton1Layer2Name = CORE_SUBCOMPONENTS_NAMES.BUTTON_1_LAYER_2;
    const importedButton2Layer2Name = CORE_SUBCOMPONENTS_NAMES.BUTTON_2_LAYER_2;
    const importedButton3Layer2Name = CORE_SUBCOMPONENTS_NAMES.BUTTON_3_LAYER_2;
    const importedButton1Layer3Name = CORE_SUBCOMPONENTS_NAMES.BUTTON_1_LAYER_3;
    const importedButton2Layer3Name = CORE_SUBCOMPONENTS_NAMES.BUTTON_2_LAYER_3;
    const importedButton3Layer3Name = CORE_SUBCOMPONENTS_NAMES.BUTTON_3_LAYER_3;
    const importedButton1Layer4Name = CORE_SUBCOMPONENTS_NAMES.BUTTON_1_LAYER_4;
    const importedButton2Layer4Name = CORE_SUBCOMPONENTS_NAMES.BUTTON_2_LAYER_4;
    const importedButton3Layer4Name = CORE_SUBCOMPONENTS_NAMES.BUTTON_3_LAYER_4;
    const subcomponents = { ...createSubcomponents(),
      ...ImportedComponentGenerator.createImportedComponents(closeButton, importedCloseButtonName, 1),
      ...ImportedComponentGenerator.createImportedComponents(defaultButton, importedButtonLayer1Name, 2),
      ...ImportedComponentGenerator.createImportedComponents(defaultButton, importedButton1Layer2Name, 3),
      ...ImportedComponentGenerator.createImportedComponents(defaultButton, importedButton2Layer2Name, 4),
      ...ImportedComponentGenerator.createImportedComponents(defaultButton, importedButton3Layer2Name, 5),
      ...ImportedComponentGenerator.createImportedComponents(defaultButton, importedButton1Layer3Name, 6),
      ...ImportedComponentGenerator.createImportedComponents(defaultButton, importedButton2Layer3Name, 7),
      ...ImportedComponentGenerator.createImportedComponents(defaultButton, importedButton3Layer3Name, 8),
      ...ImportedComponentGenerator.createImportedComponents(defaultButton, importedButton1Layer4Name, 9),
      ...ImportedComponentGenerator.createImportedComponents(defaultButton, importedButton2Layer4Name, 10),
      ...ImportedComponentGenerator.createImportedComponents(defaultButton, importedButton3Layer4Name, 11),
    };
    const subcomponentDropdownStructure = getCardSubcomponentDropdownStructure(subcomponents[CORE_SUBCOMPONENTS_NAMES.AVATAR],
      subcomponents[CORE_SUBCOMPONENTS_NAMES.LAYER_2], subcomponents[CORE_SUBCOMPONENTS_NAMES.LAYER_3],
      subcomponents[CORE_SUBCOMPONENTS_NAMES.LAYER_4], subcomponents[CORE_SUBCOMPONENTS_NAMES.NO_SIBLING_TEXT_1],
      subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT_1_LAYER_2], subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT_2_LAYER_2],
      subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT_3_LAYER_2], subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT_1_LAYER_3],
      subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT_2_LAYER_3], subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT_3_LAYER_3],
      subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT_1_LAYER_4], subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT_2_LAYER_4],
      subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT_3_LAYER_4],
      ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedCloseButtonName),
      ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedButtonLayer1Name, ALIGNED_SECTION_TYPES.RIGHT, false),
      ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedButton1Layer2Name, ALIGNED_SECTION_TYPES.LEFT, false),
      ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedButton2Layer2Name, ALIGNED_SECTION_TYPES.CENTER, false),
      ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedButton3Layer2Name, ALIGNED_SECTION_TYPES.RIGHT, false),
      ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedButton1Layer3Name, ALIGNED_SECTION_TYPES.LEFT, false),
      ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedButton2Layer3Name, ALIGNED_SECTION_TYPES.RIGHT),
      ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedButton3Layer3Name, ALIGNED_SECTION_TYPES.RIGHT),
      ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedButton1Layer4Name, ALIGNED_SECTION_TYPES.LEFT, false),
      ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedButton2Layer4Name, ALIGNED_SECTION_TYPES.CENTER, false),
      ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedButton3Layer4Name, ALIGNED_SECTION_TYPES.RIGHT, false),
    );
    subcomponents[CORE_SUBCOMPONENTS_NAMES.BASE].subcomponentSpecificSettings = getCardBaseSpecificSettings(
      subcomponents[importedCloseButtonName], subcomponents[CORE_SUBCOMPONENTS_NAMES.AVATAR]);
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
