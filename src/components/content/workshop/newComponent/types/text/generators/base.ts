import { CustomCss, CustomFeatures, CustomStaticFeatures, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../../consts/horizontalAlignmentSections';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { inheritedTextCss } from '../inheritedCss/inheritedTextCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

class TextBase extends ComponentBuilder {

  private static createTextCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        width: 'max-content',
        fontWeight: '400',
        fontFamily: '"Poppins", sans-serif',
        fontSize: '16px',
        color: '#004085',
        textAlign: 'left',
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        height: '',
        borderWidth: '0',
        borderColor: '#1779ba',
        borderStyle: BORDER_STYLES.SOLID,
        borderRightWidth: '0px',
        borderLeftWidth: '0px',
        transition: CSS_PROPERTY_VALUES.UNSET,
        outline: 'none',
        left: '0px',
      },
    };
  }

  private static createDefaultTextCustomFeatures(): CustomFeatures {
    return {
      autoSize: ComponentBuilder.createAutoSize(true, false),
    };
  }

  private static createDefaultTextCustomStaticFeatures(): CustomStaticFeatures {
    return {
      subcomponentText: ComponentBuilder.createText(),
      alignment: ComponentBuilder.createHorizontalAlignmentSection(HORIZONTAL_ALIGNMENT_SECTIONS.LEFT),
    };
  }

  public static createBaseSubcomponent(name: string): Subcomponent {
    return {
      name,
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      customCss: TextBase.createTextCss(),
      defaultCss: TextBase.createTextCss(),
      inheritedCss: inheritedTextCss,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      customFeatures: TextBase.createDefaultTextCustomFeatures(),
      defaultCustomFeatures: TextBase.createDefaultTextCustomFeatures(),
      customStaticFeatures: TextBase.createDefaultTextCustomStaticFeatures(),
      defaultCustomStaticFeatures: TextBase.createDefaultTextCustomStaticFeatures(),
    };
  }
}

export const textBase: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    presetProperties.componentType = COMPONENT_TYPES.TEXT;
    return TextBase.createBaseComponent(presetProperties, TextBase.createBaseSubcomponent);
  },
}
