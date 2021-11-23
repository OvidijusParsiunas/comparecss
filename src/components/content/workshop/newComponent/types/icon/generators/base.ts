import { CustomCss, CustomFeatures, CustomStaticFeatures, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../../consts/horizontalAlignmentSections';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { DROPDOWN_ARROW_ICON_TYPES } from '../../../../../../../consts/dropdownArrowIcons';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { IconSpecificSettings } from '../settings/iconSpecificSettings';
import { inheritedTextCss } from '../inheritedCss/inheritedTextCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

export class IconBase extends ComponentBuilder {

  private static createIconCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        width: '10px',
        fontWeight: '400',
        fontFamily: '"Poppins", sans-serif',
        fontSize: '16px',
        color: '#ffffff',
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
        height: '80px',
        borderWidth: '0px',
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

  private static createDefaultCustomStaticFeatures(): CustomStaticFeatures {
    return {
      icon: { name: DROPDOWN_ARROW_ICON_TYPES.CARET, isComponentDisplayed: true },
      alignment: ComponentBuilder.createHorizontalAlignmentSection(HORIZONTAL_ALIGNMENT_SECTIONS.CENTER),
    };
  }

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      autoSize: ComponentBuilder.createAutoSize(true, false),
      animations: ComponentBuilder.createStationaryAnimations({}),
    };
  }

  public static createBaseSubcomponent(name: string): Subcomponent {
    return {
      name,
      subcomponentType: SUBCOMPONENT_TYPES.ICON,
      customCss: IconBase.createIconCss(),
      defaultCss: IconBase.createIconCss(),
      inheritedCss: inheritedTextCss,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      userSelectedPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      customFeatures: IconBase.createDefaultCustomFeatures(),
      defaultCustomFeatures: IconBase.createDefaultCustomFeatures(),
      customStaticFeatures: IconBase.createDefaultCustomStaticFeatures(),
      defaultCustomStaticFeatures: IconBase.createDefaultCustomStaticFeatures(),
    };
  }
}

export const iconBase: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    presetProperties.componentType = COMPONENT_TYPES.ICON;
    const iconBaseComponent = IconBase.createBaseComponent(presetProperties, IconBase.createBaseSubcomponent);
    IconSpecificSettings.set(iconBaseComponent);
    return iconBaseComponent;
  },
}
