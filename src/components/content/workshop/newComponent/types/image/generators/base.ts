import { CustomCss, CustomFeatures, CustomStaticFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';

class ImageBase extends ComponentBuilder {

  private static createDefaultImageCss(): CustomCss {
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
        backgroundPosition: 'center',
      },
    };
  }

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      circleBorder: false,
      lastSelectedCssValues: ComponentBuilder.createLastSelectedCssLeftValue(),
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.CENTER),
      animations: ComponentBuilder.createStationaryAnimations({isBackgroundZoomPresent: true, isBackgroundZoomOn: false}),
    };
  }

  private static createDefaultCustomStaticFeatures(): CustomStaticFeatures {
    return {
      image: ComponentBuilder.createImage(),
    };
  }

  public static createBaseSubcomponent(): SubcomponentProperties {
    return {
      subcomponentType: SUBCOMPONENT_TYPES.IMAGE,
      customCss: ImageBase.createDefaultImageCss(),
      defaultCss: ImageBase.createDefaultImageCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      customFeatures: ImageBase.createDefaultCustomFeatures(),
      defaultCustomFeatures: ImageBase.createDefaultCustomFeatures(),
      customStaticFeatures: ImageBase.createDefaultCustomStaticFeatures(),
      defaultCustomStaticFeatures: ImageBase.createDefaultCustomStaticFeatures(),
    };
  }
}

export const imageBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    return ComponentBuilder.createBaseComponent({ componentType: COMPONENT_TYPES.IMAGE, baseName }, ImageBase.createBaseSubcomponent);
  },
}