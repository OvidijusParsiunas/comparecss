import { CustomCss, CustomFeatures, CustomStaticFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { inheritedTextCss } from '../../shared/text/inheritedCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

export class TextBuilder extends ComponentBuilder {

  private static createTextCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        top: '50%',
        width: 'max-content',
        fontWeight: '400',
        fontFamily: '"Poppins", sans-serif',
        fontSize: '16px',
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
        borderWidth: '0',
        borderColor: '#1779ba',
        borderStyle: 'solid',
        borderRightWidth: '0px',
        borderLeftWidth: '0px',
        transition: 'unset',
        outline: 'none',
        left: '0px',
      },
    }
  }

  private static createDefaultTextCustomFeatures(): CustomFeatures {
    return {
      autoSize: ComponentBuilder.createAutoSize(),
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
    };
  }

  private static createDefaultTextCustomStaticFeatures(): CustomStaticFeatures {
    return {
      subcomponentText: ComponentBuilder.createText(),
    };
  }

  private static createBaseSubcomponent(componentStyle: NewComponentStyleProperties): SubcomponentProperties {
    return {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      customCss: (componentStyle.baseCustomCssFunc && componentStyle.baseCustomCssFunc()) || TextBuilder.createTextCss(),
      defaultCss: (componentStyle.baseCustomCssFunc && componentStyle.baseCustomCssFunc()) || TextBuilder.createTextCss(),
      inheritedCss: componentStyle.baseInheritedCss || inheritedTextCss,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      customFeatures: TextBuilder.createDefaultTextCustomFeatures(),
      defaultCustomFeatures: TextBuilder.createDefaultTextCustomFeatures(),
      customStaticFeatures: TextBuilder.createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: TextBuilder.createDefaultTextCustomStaticFeatures(),
    };
  }

  public static create(componentStyle: NewComponentStyleProperties): WorkshopComponent {
    return ComponentBuilder.createBaseComponent(componentStyle, NEW_COMPONENT_TYPES.TEXT, TextBuilder.createBaseSubcomponent);
  }
}
