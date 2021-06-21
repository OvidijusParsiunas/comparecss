import { CustomCss, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { modalLayerBottomSpecificSettings } from '../../modals/properties/modalLayerBottomSpecificSettings';
import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_STYLES } from '../../../../../../../consts/newComponentStyles.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import PreviewStructure from '../../../../utils/componentGenerator/previewStructure';
import getLayerSubcomponentDropdownStructure from './subcomponentDropdownStructure';

const defaultSubcomponentNames: CustomSubcomponentNames = {
  base: CORE_SUBCOMPONENTS_NAMES.LAYER,
};

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

function createSubcomponents(subcomponentNames: CustomSubcomponentNames): Subcomponents {
  return {
    [subcomponentNames.base]: {
      subcomponentType: SUBCOMPONENT_TYPES.LAYER,
      customCss: createDefaultBottomLayerCss(),
      defaultCss: createDefaultBottomLayerCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentSpecificSettings: modalLayerBottomSpecificSettings,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
    },
  };
}

export const defaultLayer: ComponentGenerator = {
  createNewComponent(importedComponentBaseName: string): WorkshopComponent {
    const subcomponentNames = importedComponentBaseName ? { base: importedComponentBaseName } : defaultSubcomponentNames;
    const subcomponents = createSubcomponents(subcomponentNames);
    const subcomponentDropdownStructure = getLayerSubcomponentDropdownStructure(subcomponentNames);
    return {
      type: NEW_COMPONENT_TYPES.LAYER,
      style: NEW_COMPONENT_STYLES.DEFAULT,
      subcomponents,
      activeSubcomponentName: subcomponentNames.base,
      defaultSubcomponentName: subcomponentNames.base,
      componentPreviewStructure: PreviewStructure.createComponentPreviewStructure(subcomponentDropdownStructure, subcomponents, subcomponentNames),
      className: 'default-class-name',
      subcomponentNames,
      componentStatus: { isRemoved: false },
    };
  },
};
