import { AddNewImportedComponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewImportedComponent';
import { AddNewLayerSubcomponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewLayerSubcomponent';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { ImportedComponentGenerator } from '../../../../utils/importComponent/importedComponentGenerator';
import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { GENERAL_ANIMATION_CLOSE_TYPES } from '../../../../../../../consts/animationTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
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
    const subcomponents = createSubcomponents();
    const subcomponentDropdownStructure = getCardSubcomponentDropdownStructure();
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
    // should probably be just an imported component
    const layer2Component = AddNewLayerSubcomponent.add(defaultCardComponent);
    const layer3Component = AddNewLayerSubcomponent.add(defaultCardComponent);
    AddNewImportedComponent.add(defaultCardComponent, SUBCOMPONENT_TYPES.TEXT, CORE_SUBCOMPONENTS_NAMES.LAYER_1, overwriteImportedTitleProperties);
    AddNewImportedComponent.add(defaultCardComponent, SUBCOMPONENT_TYPES.TEXT, layer2Component.baseName, overwriteImportedDescriptionProperties);
    AddNewImportedComponent.add(defaultCardComponent, SUBCOMPONENT_TYPES.BUTTON, layer3Component.baseName, overwriteImportedSubmitButtonProperties);
    AddNewImportedComponent.add(defaultCardComponent, SUBCOMPONENT_TYPES.BUTTON, layer3Component.baseName, overwriteImportedCancelButtonProperties);
    const closeButtonComponent = AddNewImportedComponent.add(defaultCardComponent, SUBCOMPONENT_TYPES.CLOSE_BUTTON, CORE_SUBCOMPONENTS_NAMES.LAYER_1);
    const avatarComponent = AddNewImportedComponent.add(defaultCardComponent, SUBCOMPONENT_TYPES.AVATAR, CORE_SUBCOMPONENTS_NAMES.LAYER_1);
    subcomponents[CORE_SUBCOMPONENTS_NAMES.BASE].subcomponentSpecificSettings = getCardBaseSpecificSettings(
      closeButtonComponent.subcomponents[closeButtonComponent.baseName], avatarComponent.subcomponents[avatarComponent.baseName]);
    return defaultCardComponent;
  },
  createNewSubcomponent: createNewSubcomponent,
}
