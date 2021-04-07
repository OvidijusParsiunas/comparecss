import { AlignedLayerSection, AutoWidth, CustomCss, CustomFeatures, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import ImportedCompoment from '../../../../../../../services/workshop/componentGenerator/importedComponent';
import PreviewStructure from '../../../../../../../services/workshop/componentGenerator/previewStructure';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_STATES } from '../../../../../../../consts/subcomponentCssStates.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import getButtonSubcomponentDropdownStructure from './subcomponentDropdownStructure';
import { buttonSpecificSettings } from './buttonSpecificSettings';
import { inheritedButtonCss } from './inheritedCss';

const defaultSubcomponentNames: CustomSubcomponentNames = {
  base: CORE_SUBCOMPONENTS_NAMES.BASE, layer: CORE_SUBCOMPONENTS_NAMES.LAYER_1, text: CORE_SUBCOMPONENTS_NAMES.TEXT_1,
};

function createInitialBaseCss(): CustomCss {
  return {
    [CSS_STATES.DEFAULT]: {
      borderRadius: '0px',
      borderWidth: '0px',
      borderColor: '#1779ba',
      backgroundColor: '#1779ba',
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
      fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
      transition: 'unset',
    },
    [CSS_STATES.HOVER]: {
      backgroundColor: '#ff0000',
    },
    [CSS_STATES.CLICK]: {
      backgroundColor: '#409441',
    },
  }
}

function createLayerCss(): CustomCss {
  return {
    [CSS_STATES.DEFAULT]: {
      height: '100%',
    },
  }
}

function createTextCss(): CustomCss {
  return {
    [CSS_STATES.DEFAULT]: {
      top: '50%',
      width: 'auto',
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
    },
  }
}

function createInitialButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
  return new Set([JAVASCRIPT_CLASSES.RIPPLES])
}

function createAutoWidth(): AutoWidth {
  return {
    auto: true,
  };
}

function createAlignedLayerSection(section: ALIGNED_SECTION_TYPES): AlignedLayerSection {
  return { section };
}

function createDefaultButtonBaseCustomFeatures(): any {
  return {
    jsClasses: createInitialButtonJsClasses(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT),
  }
}

function createDefaultButtonCustomFeatures(): CustomFeatures {
  return {
    jsClasses: createInitialButtonJsClasses(),
    autoWidth: createAutoWidth(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER),
  }
}

function createSubcomponents(subcomponentNames: CustomSubcomponentNames): Subcomponents {
  return {
    [subcomponentNames.base]: {
      customCss: createInitialBaseCss(),
      initialCss: createInitialBaseCss(),
      activeCssState: CSS_STATES.DEFAULT,
      defaultCssState: CSS_STATES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      inheritedCss: inheritedButtonCss,
      subcomponentSpecificSettings: buttonSpecificSettings,
      customFeatures: createDefaultButtonBaseCustomFeatures(),
      defaultCustomFeatures: createDefaultButtonBaseCustomFeatures(),
    },
    [subcomponentNames.layer]: {
      customCss: createLayerCss(),
      initialCss: createLayerCss(),
      activeCssState: CSS_STATES.DEFAULT,
      defaultCssState: CSS_STATES.DEFAULT,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
    },
    [subcomponentNames.text]: {
      componentTag: 'div',
      componentText: 'button',
      customCss: createTextCss(),
      initialCss: createTextCss(),
      activeCssState: CSS_STATES.DEFAULT,
      defaultCssState: CSS_STATES.DEFAULT,
      customFeatures: createDefaultButtonCustomFeatures(),
      defaultCustomFeatures: createDefaultButtonCustomFeatures(),
    },
  }
}

export const defaultButton: ComponentGenerator = {
  createNewComponent(importedSubcomponentBaseName: string, importedSubcomponentId: number): WorkshopComponent {
    const subcomponentNames = importedSubcomponentBaseName
      ? ImportedCompoment.generateImportedSubcomponentNames(importedSubcomponentBaseName, importedSubcomponentId)
      : defaultSubcomponentNames;
    const subcomponents = createSubcomponents(subcomponentNames);
    const subcomponentDropdownStructure = getButtonSubcomponentDropdownStructure(subcomponentNames);
    return {
      type: NEW_COMPONENT_TYPES.BUTTON,
      subcomponents,
      activeSubcomponentName: subcomponentNames.base,
      defaultSubcomponentName: subcomponentNames.base,
      componentPreviewStructure: PreviewStructure.createComponentPreviewStructure(subcomponentDropdownStructure, subcomponents, subcomponentNames),
      className: 'default-class-name',
      subcomponentNames,
    };
  },
};
