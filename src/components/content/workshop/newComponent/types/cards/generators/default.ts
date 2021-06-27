import { AddNewLayerSubcomponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewLayerSubcomponent';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewGenericComponent';
import { DEFAULT_STYLE, BUTTON_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { GENERAL_ANIMATION_CLOSE_TYPES } from '../../../../../../../consts/animationTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NewComponentProperties } from '../../../../../../../interfaces/addNewSubcomponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { inheritedLayerBaseChildCss } from '../../shared/layer/inheritedBaseChildCss';
import PreviewStructure from '../../../../utils/componentGenerator/previewStructure';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
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
  const layer1Component = AddNewLayerSubcomponent.add(cardComponent, DEFAULT_STYLE.DEFAULT, true, overwriteImportedTopLayerProperties);
  const layer2Component = AddNewLayerSubcomponent.add(cardComponent, LAYER_STYLES.CARD, true);
  const layer3Component = AddNewLayerSubcomponent.add(cardComponent, LAYER_STYLES.CARD, true);
  AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLE.DEFAULT,
    layer1Component.baseName, [overwriteImportedTitleProperties]);
  AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLE.DEFAULT,
    layer2Component.baseName, [overwriteImportedDescriptionProperties]);
  AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLE.DEFAULT,
    layer3Component.baseName, [overwriteImportedSubmitButtonProperties]);
  AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON, DEFAULT_STYLE.DEFAULT,
    layer3Component.baseName, [overwriteImportedCancelButtonProperties]);
  const closeButtonComponent = AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.BUTTON,
    BUTTON_STYLES.CLOSE, layer1Component.baseName);
  const avatarComponent = AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.AVATAR, DEFAULT_STYLE.DEFAULT,
    layer1Component.baseName);
  addSubcomponentSpecificSettings(cardComponent.subcomponents[CORE_SUBCOMPONENTS_NAMES.BASE], closeButtonComponent, avatarComponent);
}

function createCardBaseSubcomponent(): WorkshopComponent {
  const subcomponents = {[CORE_SUBCOMPONENTS_NAMES.BASE]: createBaseSubcomponent()};
  return {
    type: COMPONENT_TYPES.CARD,
    style: DEFAULT_STYLE.DEFAULT,
    subcomponents,
    activeSubcomponentName: CORE_SUBCOMPONENTS_NAMES.BASE,
    defaultSubcomponentName: CORE_SUBCOMPONENTS_NAMES.BASE,
    componentPreviewStructure: PreviewStructure.createEmptyComponentPreviewStructure(subcomponents, CORE_SUBCOMPONENTS_NAMES.BASE, false),
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
