import { AlignedLayerSection, CustomCss, CustomFeatures, Subcomponents, WorkshopComponent, Image, CustomStaticFeatures } from '../../../../../../../interfaces/workshopComponent';
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
import getAvatarSubcomponentDropdownStructure from './subcomponentDropdownStructure';
import { defaultImage } from '../../shared/images/default';

const defaultSubcomponentNames: CustomSubcomponentNames = {
  base: CORE_SUBCOMPONENTS_NAMES.AVATAR,
};

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

function createButtonBaseLastSelectedCssValues(): WorkshopComponentCss {
  return { left: '0px' };
}

function createAlignedLayerSection(section: ALIGNED_SECTION_TYPES): AlignedLayerSection {
  return { section };
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

function createSubcomponents(subcomponentNames: CustomSubcomponentNames): Subcomponents {
  return {
    [subcomponentNames.base]: {
      subcomponentType: SUBCOMPONENT_TYPES.AVATAR,
      customCss: createDefaultAvatarCss(),
      defaultCss: createDefaultAvatarCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      customFeatures: createDefaultAvatarCustomFeatures(),
      defaultCustomFeatures: createDefaultAvatarCustomFeatures(),
      customStaticFeatures: createDefaultAvatarCustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultAvatarCustomStaticFeatures(),
    },
  };
}

export const avatar: ComponentGenerator = {
  createNewComponent(importedComponentBaseName: string): WorkshopComponent {
    const subcomponentNames = importedComponentBaseName ? { base: importedComponentBaseName } : defaultSubcomponentNames;
    const subcomponents = createSubcomponents(subcomponentNames);
    const subcomponentDropdownStructure = getAvatarSubcomponentDropdownStructure(subcomponentNames);
    return {
      type: NEW_COMPONENT_TYPES.AVATAR,
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
