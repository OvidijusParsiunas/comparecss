import { AlignedLayerSection, CustomCss, CustomFeatures, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddNewImportedComponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewImportedComponent';
import { AddNewLayerSubcomponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewLayerSubcomponent';
import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_STYLES } from '../../../../../../../consts/newComponentStyles.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import PreviewStructure from '../../../../utils/componentGenerator/previewStructure';
import { buttonSpecificSettings } from './buttonSpecificSettings';
import ReferenceSharingUtils from './referenceSharingUtils';
import { inheritedButtonCss } from './inheritedCss';

const defaultSubcomponentNames: CustomSubcomponentNames = {
  base: CORE_SUBCOMPONENTS_NAMES.BASE, layer: CORE_SUBCOMPONENTS_NAMES.LAYER_1, text: CORE_SUBCOMPONENTS_NAMES.TEXT,
};

function createDefaultBaseCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
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
    [CSS_PSEUDO_CLASSES.HOVER]: {
      backgroundColor: '#ff0000',
    },
    [CSS_PSEUDO_CLASSES.CLICK]: {
      backgroundColor: '#409441',
    },
  }
}

function createAlignedLayerSection(section: ALIGNED_SECTION_TYPES): AlignedLayerSection {
  return { section };
}

function createDefaultButtonBaseCustomFeatures(): CustomFeatures {
  return {
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT),
  }
}

function createSubcomponents(subcomponentNames: CustomSubcomponentNames, subcomponentText?: string): Subcomponents {
  return {
    [subcomponentNames.base]: {
      subcomponentType: SUBCOMPONENT_TYPES.BUTTON,
      customCss: createDefaultBaseCss(),
      defaultCss: createDefaultBaseCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      inheritedCss: inheritedButtonCss,
      subcomponentSpecificSettings: buttonSpecificSettings,
      customFeatures: createDefaultButtonBaseCustomFeatures(),
      defaultCustomFeatures: createDefaultButtonBaseCustomFeatures(),
      triggerableSubcomponentName: subcomponentNames.text,
    },
  }
}

export const defaultButton: ComponentGenerator = {
  // WORK1: check if subcomponentText needed
  createNewComponent(importedComponentBaseName: string, subcomponentText?: string): WorkshopComponent {
    // WORK1: ImportedComponentGenerator.generateImportedComponentNames will no longer be required if each subcomponent is going to be
    // added individually
    // should not generate new unique names if not imported (to reduce the number of unique ids being generated)
    const subcomponentNames = importedComponentBaseName ? { base: importedComponentBaseName } : defaultSubcomponentNames;
    const subcomponents = createSubcomponents(subcomponentNames, subcomponentText);
    const subcomponentDropdownStructure = { [subcomponentNames.base]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject() };
    const defaultButtonComponent: WorkshopComponent = {
      type: NEW_COMPONENT_TYPES.BUTTON,
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
    const layerSubcomponent = AddNewLayerSubcomponent.add(defaultButtonComponent, NEW_COMPONENT_STYLES.BUTTON_LAYER, false);
    const textSubcomponent = AddNewImportedComponent.add(defaultButtonComponent, NEW_COMPONENT_TYPES.TEXT, NEW_COMPONENT_STYLES.TEXT_BUTTON,
      layerSubcomponent.baseName);
    subcomponentNames.layer = layerSubcomponent.baseName;
    subcomponentNames.text = textSubcomponent.baseName;
    defaultButtonComponent.subcomponentNames = subcomponentNames;
    ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents(defaultButtonComponent.subcomponents, subcomponentNames);
    ReferenceSharingUtils.appendBaseSubcomponentRefToAllChildSubcomponents(defaultButtonComponent.subcomponents, subcomponentNames);
    return defaultButtonComponent;
  },
};
