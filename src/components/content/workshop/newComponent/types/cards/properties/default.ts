import { AddNewImportedComponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewImportedComponent';
import { AddNewLayerSubcomponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewLayerSubcomponent';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { GENERAL_ANIMATION_CLOSE_TYPES } from '../../../../../../../consts/animationTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NewComponentProperties } from '../../../../../../../interfaces/addNewSubcomponent';
import { NEW_COMPONENT_STYLES } from '../../../../../../../consts/newComponentStyles.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { inheritedLayerBaseChildCss } from '../../shared/layer/inheritedBaseChildCss';
import PreviewStructure from '../../../../utils/componentGenerator/previewStructure';
import { getCardBaseSpecificSettings } from './cardBaseSpecificSettings';
import { inheritedLayerBaseCss } from '../../shared/layer/inheritedCss';
import {
  CustomCss, CustomFeatures, Subcomponents, WorkshopComponent, SubcomponentProperties,
  AlignedLayerSection, AutoSize, Text, CustomStaticFeatures, Image, Animations,
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

function createLayerImage(): Image {
  return {
    name: null,
    data: null,
    size: true,
  }
}

function createDefaultTopLayerCustomStaticFeatures(): CustomStaticFeatures {
  return {
    image: createLayerImage(),
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

function createDefaultTopLayerCss(): CustomCss {
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

function createBaseSubcomponent(): SubcomponentProperties {
  return {
    subcomponentType: SUBCOMPONENT_TYPES.BASE,
    customCss: createDefaultBaseCss(),
    defaultCss: createDefaultBaseCss(),
    activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
    defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
    inheritedCss: inheritedLayerBaseCss,
    childCss: inheritedLayerBaseChildCss,
    customFeatures: createDefaultBaseCustomFeatures(),
    defaultCustomFeatures: createDefaultBaseCustomFeatures(),
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

function overwriteImportedTopLayerProperties(subcomponents: Subcomponents, subcomponentNames: CustomSubcomponentNames): void {
  subcomponents[subcomponentNames.base].customCss = createDefaultTopLayerCss();
  subcomponents[subcomponentNames.base].defaultCss = createDefaultTopLayerCss();
  subcomponents[subcomponentNames.base].customStaticFeatures = createDefaultTopLayerCustomStaticFeatures();
  subcomponents[subcomponentNames.base].defaultCustomStaticFeatures = createDefaultTopLayerCustomStaticFeatures();
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

function addSubcomponentSpecificSettings(baseSubcomponent: SubcomponentProperties, closeComponent: NewComponentProperties,
    avatarComponent: NewComponentProperties): void {
  baseSubcomponent.subcomponentSpecificSettings = getCardBaseSpecificSettings(
    closeComponent.subcomponents[closeComponent.baseName], avatarComponent.subcomponents[avatarComponent.baseName]);
}

function addComponentsToBase(cardComponent: WorkshopComponent): void {
  const layer1Component = AddNewLayerSubcomponent.add(cardComponent, NEW_COMPONENT_STYLES.DEFAULT, true, overwriteImportedTopLayerProperties);
  const layer2Component = AddNewLayerSubcomponent.add(cardComponent, NEW_COMPONENT_STYLES.DEFAULT, true);
  const layer3Component = AddNewLayerSubcomponent.add(cardComponent, NEW_COMPONENT_STYLES.DEFAULT, true);
  AddNewImportedComponent.add(cardComponent, NEW_COMPONENT_TYPES.TEXT, NEW_COMPONENT_STYLES.DEFAULT,
    layer1Component.baseName, overwriteImportedTitleProperties);
  AddNewImportedComponent.add(cardComponent, NEW_COMPONENT_TYPES.TEXT, NEW_COMPONENT_STYLES.DEFAULT,
    layer2Component.baseName, overwriteImportedDescriptionProperties);
  AddNewImportedComponent.add(cardComponent, NEW_COMPONENT_TYPES.BUTTON, NEW_COMPONENT_STYLES.DEFAULT,
    layer3Component.baseName, overwriteImportedSubmitButtonProperties);
  AddNewImportedComponent.add(cardComponent, NEW_COMPONENT_TYPES.BUTTON, NEW_COMPONENT_STYLES.DEFAULT,
    layer3Component.baseName, overwriteImportedCancelButtonProperties);
  const closeButtonComponent = AddNewImportedComponent.add(cardComponent, NEW_COMPONENT_TYPES.BUTTON,
    NEW_COMPONENT_STYLES.BUTTON_CLOSE, layer1Component.baseName);
  const avatarComponent = AddNewImportedComponent.add(cardComponent, NEW_COMPONENT_TYPES.AVATAR, NEW_COMPONENT_STYLES.DEFAULT,
    layer1Component.baseName);
  addSubcomponentSpecificSettings(cardComponent.subcomponents[CORE_SUBCOMPONENTS_NAMES.BASE], closeButtonComponent, avatarComponent);
}

function createCardBaseSubcomponent(): WorkshopComponent {
  const subcomponents = {[CORE_SUBCOMPONENTS_NAMES.BASE]: createBaseSubcomponent()};
  return {
    type: NEW_COMPONENT_TYPES.CARD,
    style: NEW_COMPONENT_STYLES.DEFAULT,
    subcomponents,
    activeSubcomponentName: CORE_SUBCOMPONENTS_NAMES.BASE,
    defaultSubcomponentName: CORE_SUBCOMPONENTS_NAMES.BASE,
    // WORK1: this should no longer be creating a component preview structure, but an empty object
    componentPreviewStructure: PreviewStructure.createComponentPreviewStructure({[CORE_SUBCOMPONENTS_NAMES.BASE]: {}}, subcomponents),
    className: 'default-class-name',
    componentStatus: { isRemoved: false },
  };
}

export const defaultCard: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    uniqueSubcomponentIdState.resetUniqueId();
    const cardComponent = createCardBaseSubcomponent();
    addComponentsToBase(cardComponent);
    return cardComponent;
  },
}
