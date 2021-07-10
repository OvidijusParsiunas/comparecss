import { CustomCss, CustomFeatures, CustomStaticFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';

class AvatarBase extends ComponentBuilder {

  private static createDefaultAvatarCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        borderRadius: '0px',
        borderWidth: '0px',
        borderColor: '#1779ba',
        borderStyle: 'solid',
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
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
        transition: CSS_PROPERTY_VALUES.UNSET,
        top: '50%',
        left: '0px',
        backgroundSize: '100% 100%',
      },
    };
  }

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      circleBorder: false,
      lastSelectedCssValues: ComponentBuilder.createLastSelectedCssLeftValue(),
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER),
    };
  }

  private static createDefaultCustomStaticFeatures(): CustomStaticFeatures {
    return {
      image: ComponentBuilder.createImage(),
    };
  }

  public static createBaseSubcomponent(): SubcomponentProperties {
    return {
      subcomponentType: SUBCOMPONENT_TYPES.AVATAR,
      customCss: AvatarBase.createDefaultAvatarCss(),
      defaultCss: AvatarBase.createDefaultAvatarCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      customFeatures: AvatarBase.createDefaultCustomFeatures(),
      defaultCustomFeatures: AvatarBase.createDefaultCustomFeatures(),
      customStaticFeatures: AvatarBase.createDefaultCustomStaticFeatures(),
      defaultCustomStaticFeatures: AvatarBase.createDefaultCustomStaticFeatures(),
    };
  }
}

export const avatarBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    return ComponentBuilder.createBaseComponent({ componentType: COMPONENT_TYPES.AVATAR, baseName }, AvatarBase.createBaseSubcomponent);
  },
}
