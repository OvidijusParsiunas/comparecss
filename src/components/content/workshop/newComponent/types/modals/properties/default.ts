import { MODAL_TRANSITION_ENTRANCE_TYPES, MODAL_TRANSITION_EXIT_TYPES } from '../../../../../../../consts/modalTransitionTypes.enum';
import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import ImportedCompoment from '../../../../utils/componentGenerator/importedComponent';
import { modalLayerBottomSpecificSettings } from './modalLayerBottomSpecificSettings';
import PreviewStructure from '../../../../utils/componentGenerator/previewStructure';
import getModalSubcomponentDropdownStructure from './subcomponentDropdownStructure';
import { modalLayerTopSpecificSettings } from './modalLayerTopSpecificSettings';
import { inheritedAlertCloseChildCss } from './inheritedAlertCloseChildCss';
import { inheritedAlertBaseChildCss } from './inheritedAlertBaseChildCss';
import { modalBaseSpecificSettings } from './modalBaseSpecificSettings';
import { defaultButton } from '../../buttons/properties/default';
import { inheritedAlertBaseCss } from './inheritedCss';
import {
  AutoWidth, BackdropProperties, ComponentCenteringInParent, ComponentTransitions,
  CustomCss, CustomFeatures, Subcomponents, WorkshopComponent, AlignedLayerSection,
} from '../../../../../../../interfaces/workshopComponent';

function createDefaultTransitionsProperties(): ComponentTransitions {
  return {
    entrance: {
      type: MODAL_TRANSITION_ENTRANCE_TYPES.FADE_IN,
      duration: '0.3s',
      delay: '0.15s',
    },
    exit: {
      type: MODAL_TRANSITION_EXIT_TYPES.FADE_OUT,
      duration: '0.25s',
    },
  };
}

function createDefaultComponentCenteringInParent(): ComponentCenteringInParent {
  return {
    vertical: true,
    horizontal: true,
  };
}

function createDefaultBackdropProperties(): BackdropProperties {
  return {
    color: '#6d6d6dcc',
    alpha: 0.8,
    visible: false,
  };
}

function createDefaultBaseCustomFeatures(): CustomFeatures {
  return {
    componentCenteringInParent: createDefaultComponentCenteringInParent(),
    transitions: createDefaultTransitionsProperties(),
    backdrop: createDefaultBackdropProperties(),
  };
}

function createAlignedLayerSection(section: ALIGNED_SECTION_TYPES): AlignedLayerSection {
  return { section };
}

function createDefaultCloseButtonCustomFeatures(): CustomFeatures {
  return {
    text: '×',
    jsClasses: createInitialCloseButtonJsClasses(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT),
  };
}

function createAutoWidth(): AutoWidth {
  return {
    auto: true,
  };
}

function createDefaultText1CustomFeatures(): CustomFeatures {
  return {
    text: 'Modal title',
    autoWidth: createAutoWidth(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
  };
}

function createDefaultText2CustomFeatures(): CustomFeatures {
  return {
    text: 'Modal body text',
    autoWidth: createAutoWidth(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
  };
}

function createInitialBaseCss(): CustomCss {
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

function createInitialCloseButtonCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      height: '12px',
      width: '14px',
      borderRadius: '15px',
      lineHeight: '1px',
      cursor: 'pointer',
      boxSizing: 'unset',
      fontSize: '16px',
      color: '#ff0000',
      boxShadow: 'unset',
      borderWidth: '0px',
      borderStyle: 'solid',
      borderColor: '#000000',
      backgroundColor: 'inherit',
      outline: 'none',
      paddingTop: '1px',
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingBottom: '0px',
      marginTop: '10px',
      marginRight: '10px',
      top: '50%',
    },
  };
}

function createInitialLayer1Css(): CustomCss {
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
      zIndex: 1,
    },
  };
}

function createInitialLayer2Css(): CustomCss {
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

function createInitialLayer3Css(): CustomCss {
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

function createInitialText1Css(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      top: '50%',
      width: 'auto',
      fontWeight: '500',
      fontSize: '20px',
      fontFamily: '"Poppins", sans-serif',
      color: '#004085',
      textAlign: 'center',
      backgroundColor: 'inherit',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      marginLeft: '0px',
      marginRight: '0px',
    },
  }
}

function createInitialText2Css(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      top: '50%',
      width: 'auto',
      fontWeight: '400',
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      color: '#004085',
      textAlign: 'center',
      backgroundColor: 'inherit',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      marginLeft: '0px',
      marginRight: '0px',
    },
  };
}

function createInitialCloseButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
  return new Set([JAVASCRIPT_CLASSES.RIPPLES]);
}

function createSubcomponents(): Subcomponents {
  return {
    [CORE_SUBCOMPONENTS_NAMES.BASE]: {
      subcomponentType: SUBCOMPONENT_TYPES.BASE,
      customCss: createInitialBaseCss(),
      initialCss: createInitialBaseCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedAlertBaseCss,
      childCss: inheritedAlertBaseChildCss,
      subcomponentSpecificSettings: modalBaseSpecificSettings,
      customFeatures: createDefaultBaseCustomFeatures(),
      defaultCustomFeatures: createDefaultBaseCustomFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.LAYER_1]: {
      subcomponentType: SUBCOMPONENT_TYPES.LAYER_1,
      customCss: createInitialLayer1Css(),
      initialCss: createInitialLayer1Css(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentSpecificSettings: modalLayerTopSpecificSettings,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
    },
    [CORE_SUBCOMPONENTS_NAMES.LAYER_2]: {
      subcomponentType: SUBCOMPONENT_TYPES.LAYER_2,
      customCss: createInitialLayer2Css(),
      initialCss: createInitialLayer2Css(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
    },
    [CORE_SUBCOMPONENTS_NAMES.LAYER_3]: {
      subcomponentType: SUBCOMPONENT_TYPES.LAYER_3,
      customCss: createInitialLayer3Css(),
      initialCss: createInitialLayer3Css(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentSpecificSettings: modalLayerBottomSpecificSettings,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
    },
    [CORE_SUBCOMPONENTS_NAMES.CLOSE]: {
      subcomponentType: SUBCOMPONENT_TYPES.CLOSE,
      componentTag: 'button',
      customCss: createInitialCloseButtonCss(),
      initialCss: createInitialCloseButtonCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      childCss: inheritedAlertCloseChildCss,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
      customFeatures: createDefaultCloseButtonCustomFeatures(),
      defaultCustomFeatures: createDefaultCloseButtonCustomFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT_1]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      componentTag: 'div',
      customCss: createInitialText1Css(),
      initialCss: createInitialText1Css(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
      customFeatures: createDefaultText1CustomFeatures(),
      defaultCustomFeatures: createDefaultText1CustomFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT_2]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      componentTag: 'div',
      customCss: createInitialText2Css(),
      initialCss: createInitialText2Css(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
      customFeatures: createDefaultText2CustomFeatures(),
      defaultCustomFeatures: createDefaultText2CustomFeatures(),
    },
  };
}

export const defaultModal: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    // solution for settings is to have types within subcomponent for the type to option mapping
    const importedButton1Name = CORE_SUBCOMPONENTS_NAMES.BUTTON_1;
    const importedButton2Name = CORE_SUBCOMPONENTS_NAMES.BUTTON_2;
    const subcomponents = { ...createSubcomponents(),
      ...ImportedCompoment.createImportedSubcomponents(defaultButton, importedButton1Name, 1),
      ...ImportedCompoment.createImportedSubcomponents(defaultButton, importedButton2Name, 2) };
    const subcomponentDropdownStructure = getModalSubcomponentDropdownStructure(
      subcomponents[CORE_SUBCOMPONENTS_NAMES.LAYER_2], subcomponents[CORE_SUBCOMPONENTS_NAMES.LAYER_3],
      subcomponents[CORE_SUBCOMPONENTS_NAMES.CLOSE], subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT_1], subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT_2],
      ImportedCompoment.createImportedComponentStructure(subcomponents, importedButton1Name),
      ImportedCompoment.createImportedComponentStructure(subcomponents, importedButton2Name),
    );
    return {
      type: NEW_COMPONENT_TYPES.MODAL,
      subcomponents,
      activeSubcomponentName: CORE_SUBCOMPONENTS_NAMES.BASE,
      defaultSubcomponentName: CORE_SUBCOMPONENTS_NAMES.BASE,
      componentPreviewStructure: PreviewStructure.createComponentPreviewStructure(subcomponentDropdownStructure, subcomponents),
      className: 'default-class-name',
    };
  },
}
