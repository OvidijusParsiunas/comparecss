import { AlignedLayerSection, CustomCss, CustomFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddNewImportedComponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewImportedComponent';
import { AddNewLayerSubcomponent } from '../../../../utils/componentManipulation/addNewSubcomponentUtils/add/addNewLayerSubcomponent';
import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { NEW_COMPONENT_STYLES } from '../../../../../../../consts/newComponentStyles.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import PreviewStructure from '../../../../utils/componentGenerator/previewStructure';
import { buttonSpecificSettings } from './buttonSpecificSettings';
import ReferenceSharingUtils from './referenceSharingUtils';
import { inheritedButtonCss } from './inheritedCss';

function createDefaultBaseCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      height: '18px',
      width: '17px',
      borderRadius: '15px',
      cursor: 'pointer',
      boxSizing: 'unset',
      boxShadow: 'unset',
      borderWidth: '0px',
      borderStyle: 'solid',
      borderColor: '#000000',
      backgroundColor: 'inherit',
      outline: 'none',
      paddingTop: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingBottom: '0px',
      marginRight: '5px',
      transition: 'unset',
      left: '0px',
    }
  }
}

function createAlignedLayerSection(section: ALIGNED_SECTION_TYPES): AlignedLayerSection {
  return { section };
}

function createButtonBaseLastSelectedCssValues(): WorkshopComponentCss {
  return { left: '0px' };
}

function createDefaultButtonBaseCustomFeatures(): CustomFeatures {
  return {
    lastSelectedCssValues: createButtonBaseLastSelectedCssValues(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.RIGHT),
  };
}

function createBaseSubcomponent(): SubcomponentProperties {
  return {
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
  };
}

function createButtonBaseSubcomponent(importedComponentBaseName: string ): WorkshopComponent {
  const subcomponentNames: CustomSubcomponentNames = { base: importedComponentBaseName || CORE_SUBCOMPONENTS_NAMES.BASE };
  const subcomponents = {[subcomponentNames.base]: createBaseSubcomponent()};
  const subcomponentDropdownStructure = { [subcomponentNames.base]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject() };
  const componentPreviewStructure = PreviewStructure.createComponentPreviewStructure(subcomponentDropdownStructure, subcomponents, subcomponentNames);
  return {
    type: NEW_COMPONENT_TYPES.BUTTON,
    style: NEW_COMPONENT_STYLES.BUTTON_CLOSE,
    subcomponents,
    activeSubcomponentName: subcomponentNames.base,
    defaultSubcomponentName: subcomponentNames.base,
    componentPreviewStructure,
    className: 'default-class-name',
    subcomponentNames,
    componentStatus: { isRemoved: false },
    referenceSharingExecutables: [ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents],
  };
}

function addComponentsToBase(buttonComponent: WorkshopComponent): void {
  const layerSubcomponent = AddNewLayerSubcomponent.add(buttonComponent, NEW_COMPONENT_STYLES.BUTTON_LAYER, false);
  const textSubcomponent = AddNewImportedComponent.add(buttonComponent, NEW_COMPONENT_TYPES.TEXT, NEW_COMPONENT_STYLES.CLOSE_BUTTON_TEXT,
    layerSubcomponent.baseName);
  const { subcomponentNames } = buttonComponent;
  buttonComponent.subcomponents[subcomponentNames.base].triggerableSubcomponentName = textSubcomponent.baseName;
  subcomponentNames.layer = layerSubcomponent.baseName;
  subcomponentNames.text = textSubcomponent.baseName;
}

function addReferences(buttonComponent: WorkshopComponent): void {
  const { subcomponentNames } = buttonComponent;
  ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents(buttonComponent.subcomponents, subcomponentNames);
  ReferenceSharingUtils.appendBaseSubcomponentRefToAllChildSubcomponents(buttonComponent.subcomponents, subcomponentNames);
}

export const closeButton: ComponentGenerator = {
  createNewComponent(importedComponentBaseName: string): WorkshopComponent {
    const buttonComponent: WorkshopComponent = createButtonBaseSubcomponent(importedComponentBaseName);
    addComponentsToBase(buttonComponent);
    addReferences(buttonComponent);
    return buttonComponent;
  },
};
